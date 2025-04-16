from flask import Flask, render_template, session, redirect, request, url_for, jsonify, flash
from functools import wraps
import pymongo
from stripe_logic import create_checkout_session, stripe_public_key
from stripe_logic import handle_checkout
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask_dance.contrib.google import make_google_blueprint, google
import os
from user.routes import user_bp

# Allow OAuth over HTTP (development only!)
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

app = Flask(__name__, template_folder='templates')
app.secret_key = 'super_secret_123'

print("Templates directory contents:", os.listdir('templates'))

# Google OAuth Setup
google_bp = make_google_blueprint(
    client_id="817789434442-1uk5cvscqfh5fegenfukrkcbohmihat9.apps.googleusercontent.com",
    client_secret="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",
    redirect_to="google_login"
)
app.register_blueprint(google_bp, url_prefix="/login")

# MongoDB Setup
uri = "mongodb+srv://himeshpathai:8G8Gr8VUUztn1CIo@cluster0.cln1l2s.mongodb.net/foodrestro?retryWrites=true&w=majority"
client = MongoClient(uri, server_api=ServerApi('1'))

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client.foodrestro
# expose `db` on the app so other modules can grab it via current_app
app.db = db

collection = db.food_items

# Login Required Decorator
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            flash("You are not logged in!", 'error')
            return redirect('/signin')
    return wrap

# Google Login Route
@app.route("/google-login")
def google_login():
    if not google.authorized:
        return redirect(url_for("google.login"))

    resp = google.get("/oauth2/v2/userinfo")
    if not resp.ok:
        flash("Failed to fetch user info from Google.", "error")
        return redirect(url_for("signin"))

    user_info = resp.json()

    # Debugging: Print out the user_info to see its structure
    print(user_info)

    # Safely extract information
    email = user_info.get('email', 'No Email Provided')
    name = user_info.get('name', 'Unknown User')

    # Store user data in session
    session['logged_in'] = True
    session['user'] = {
        'email': email,
        'name': name
    }

    flash("Logged in successfully with Google!", "success")
    return redirect(url_for("index"))

@app.route("/profile")
def profile():
    if not session.get('user'):
        flash("You need to be logged in to view your profile.", "warning")
        return redirect(url_for("signin"))
    
    # Get the user's name and email from the session
    user_name = session['user']['name']
    user_email = session['user']['email']

    # Render the profile template, passing user details
    return render_template("profile.html", name=user_name, email=user_email)
  
# Routes
@app.route('/')
@app.route('/home')
def index():
    return render_template('index.html')

@app.route('/blog')
def blog():
    return render_template('blog.html')

@app.route('/menu')
def menu():
    food_items = collection.find()
    return render_template('menu.html', food_items=food_items)

@app.route('/add_food_item', methods=['GET', 'POST'])
@login_required
def add_food_item():
    if request.method == 'POST':
        name = request.form.get('name')
        price = request.form.get('price')
        description = request.form.get('description')
        image_url = request.form.get('image_url')
        stripe_url = request.form.get('stripe_url')

        food_item = {
            'name': name,
            'price': price,
            'description': description,
            'image_url': image_url,
            'stripe_url': stripe_url
        }
        collection.insert_one(food_item)

        flash('Food item added successfully!', 'success')
        return redirect('/menu')
    else:
        return render_template('dashboard.html')

@app.route('/checkout', methods=['POST'])
@login_required
def checkout():
    data = request.json
    cart_items = data.get('cartItems')
    print("Received cart items from JavaScript:", cart_items)

    handle_checkout(cart_items)
    stripe_session = create_checkout_session()

    return jsonify({"message": "Checkout successful"}), 200

@app.route('/stripe_pay')
def stripe_pay():
    stripe_session = create_checkout_session()
    return {
        'checkout_session_id': stripe_session['id'],
        'checkout_public_key': stripe_public_key
    }

@app.route('/thanks')
def thanks():
    return render_template('thanks.html')

@app.route('/cart')
@login_required
def cart():
    return render_template('cart.html')

@app.route('/signin')
def signin():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/dashboard/')
@login_required
def dashboard():
    return render_template('dashboard.html')

# Optional logout
@app.route('/logout')
def logout():
    session.clear()
    flash("You have been logged out.", "success")
    return redirect(url_for("index"))
app.register_blueprint(user_bp)