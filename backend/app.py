from flask import Flask, request, jsonify
from flask_cors import CORS
from extensions import db
from models import Job
from auth_routes import auth_bp  # Blueprint burada zaten import ediliyor

def create_app():
    app = Flask(__name__)

    # Config
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1234@localhost:5432/ilan_sistemi'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # 🔥 Veritabanı bağlantısını başlat
    db.init_app(app)

    # CORS ayarı
    CORS(app, origins=["http://localhost:3001"], supports_credentials=True)

    # Blueprint kayıt
    app.register_blueprint(auth_bp, url_prefix='/auth')

    @app.route('/')
    def home():
        return "Merhaba! Ana sayfadasınız."

    @app.route('/jobs', methods=['POST'])
    def get_jobs():
        keyword = request.args.get('keyword', '').lower()
        city = request.args.get('city', '').lower()
        experience = request.args.get('experience', '').lower()
        work_type = request.args.get('workType', '').lower()

        query = Job.query

        if keyword:
            query = query.filter((Job.title.ilike(f"%{keyword}%")) | (Job.description.ilike(f"%{keyword}%")))
        if city:
            query = query.filter(Job.location.ilike(f"%{city}%"))
        if experience:
            query = query.filter(Job.level.ilike(f"%{experience}%"))
        if work_type:
            query = query.filter(Job.type.ilike(f"%{work_type}%"))

        jobs = query.all()

        return jsonify([{
            "id": job.id,
            "title": job.title,
            "company": job.company,
            "location": job.location,
            "level": job.level,
            "type": job.type,
            "description": job.description,
            "salary": job.salary
        } for job in jobs])

    return app

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True)
