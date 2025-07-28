# devjobs_filtrele.py
from flask import Blueprint, request, jsonify
from models import Job
from db import db

filtre_bp = Blueprint('filtre', __name__)

@filtre_bp.route('/filter-jobs', methods=['POST'])
def filter_jobs():
    data = request.get_json()
    title = data.get('title')
    location = data.get('location')
    job_type = data.get('type')
    level = data.get('level')

    query = Job.query

    if title:
        query = query.filter(Job.title.ilike(f"%{title}%"))
    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))
    if job_type:
        query = query.filter(Job.type == job_type)
    if level:
        query = query.filter(Job.level == level)

    jobs = query.all()
    results = [
        {
            "title": job.title,
            "company": job.company,
            "location": job.location,
            "type": job.type,
            "level": job.level,
            "jobSlug": job.jobSlug,
            "posted": job.posted
        }
        for job in jobs
    ]

    return jsonify(results)
