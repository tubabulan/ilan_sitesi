# models.py
from db import db

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Candidate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)


    def __repr__(self):
        return f'<Candidate {self.email}>'

# Kullanıcı modelinizi buraya ekleyin:
class User(db.Model): # <-- Bu satırın models.py içinde olduğundan emin olun
    __tablename__ = 'users'
     # Opsiyonel, tablo adını belirtir
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    # Diğer User sütunlarınızı buraya ekleyebilirsiniz

    def __repr__(self):
        return f'<User {self.email}>'
# models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    jobSlug = db.Column(db.String(255), unique=True)
    company = db.Column(db.String(255))
    location = db.Column(db.String(255))
    type = db.Column(db.String(100))         # Çalışma Türü: Hibrit, Uzaktan, Ofis
    level = db.Column(db.String(100))        # Deneyim Seviyesi: Junior, Mid, Senior
    posted = db.Column(db.String(100))
    techTags = db.Column(db.PickleType)      # ['Python', 'React']
    description = db.Column(db.Text)
