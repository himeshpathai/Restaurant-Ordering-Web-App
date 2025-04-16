# Run this in Python to generate a new hash
from passlib.hash import pbkdf2_sha256
print(pbkdf2_sha256.hash("admin123"))
