# user/routes.py
from flask import Blueprint, render_template, request, redirect, url_for
from .models import User

user_bp = Blueprint('user', __name__, url_prefix='/user')

@user_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return User().login()
    return render_template('login.html')

@user_bp.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        return User().signup()
    return render_template('register.html')

@user_bp.route('/signout')
def signout():
    return User().signout()
