from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from flask import current_app
import uuid

def get_user_collection():
    return current_app.db.users
class User:
  
  def start_session(self, user):
        # Remove the password field
        del user['password']
        
        # Convert ObjectId fields to string
        user['_id'] = str(user['_id'])  # Convert ObjectId to string
        
        # Store the session information
        session['logged_in'] = True
        session['user'] = user
        
        # Return the user data as a JSON response
        return jsonify(user), 200

  def signup(self):
    print(request.form)

    # Create the user object
    user = {
      "_id": uuid.uuid4().hex,
      "name": request.form.get('name'),
      "email": request.form.get('email'),
      "password": request.form.get('password')
    }

    # Encrypt the password
    user['password'] = pbkdf2_sha256.encrypt(user['password'])

    # Check for existing email address
    if users.find_one({ "email": user['email'] }):
      return jsonify({ "error": "Email address already in use" }), 400

    if users.insert_one(user):
      return self.start_session(user)

    return jsonify({ "error": "Signup failed" }), 400
  
  def signout(self):
    session.clear()
    return redirect('/')
  
  def login(self):
    # Ensure you get the 'users' collection from your database
    users = get_user_collection()  # Fetch the user collection first

    # Now you can safely use 'users' to find the user by email
    user = users.find_one({
        "email": request.form.get('email')
    })

    if user and pbkdf2_sha256.verify(request.form.get('password'), user['password']):
        return self.start_session(user)

    return jsonify({"error": "Invalid login credentials"}), 401