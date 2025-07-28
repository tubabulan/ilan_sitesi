# add_jobs.py
from app import app
from db import db
from models import Job

jobListings = [
    {
        "title": "Yapay Zeka Mühendisi",
        "company": "AI Vision Tech",
        "location": "İstanbul, Türkiye",
        "type": "Tam Zamanlı",
        "level": "Senior",
        "description": "Görüntü işleme ve makine öğrenmesi projelerinde görev alacak, deneyimli yapay zeka mühendisi arıyoruz.",
        "salary": "₺80.000 - ₺100.000"
    },
    {
        "title": "Veri Bilimci",
        "company": "DataSense",
        "location": "Ankara, Türkiye",
        "type": "Hibrit",
        "level": "Mid-Level",
        "description": "Büyük veri setleriyle çalışacak, analiz ve modelleme yapabilecek veri bilimci arıyoruz.",
        "salary": "₺55.000 - ₺75.000"
    },
    {
        "title": "Makine Öğrenmesi Mühendisi",
        "company": "SmartML",
        "location": "Remote",
        "type": "Uzaktan",
        "level": "Senior",
        "description": "Ürünlerimizde makine öğrenmesi algoritmalarının geliştirilmesi ve devreye alınmasında görev alacak mühendis arıyoruz.",
        "salary": "₺90.000 - ₺110.000"
    },
     {
      "title": 'Yapay Zeka Mühendisi',
      "jobSlug": 'yapay-zeka-muhendisi',
      "company": 'AI Vision Tech',
      "location": 'İstanbul, Türkiye',
      "type": 'Tam Zamanlı',
      "level": 'Senior',
      "posted": '2 gün önce',
      "techTags": ['Python', 'TensorFlow', 'PyTorch', 'Docker', 'AWS'],
      "description": 'Görüntü işleme ve makine öğrenmesi projelerinde görev alacak, deneyimli yapay zeka mühendisi arıyoruz.',
      "salary": '₺80.000 - ₺100.000'
    },
    
  {
    "title": "Veri Bilimci",
    "jobSlug": "veri-bilimci",
    "company": "DataSense",
    "location": "Ankara, Türkiye",
    "type": "Hibrit",
    "level": "Mid-Level",
    "posted": "1 gün önce",
    "techTags": ["Python", "Pandas", "Scikit-learn", "SQL", "PowerBI"],
    "description": "Büyük veri setleriyle çalışacak, analiz ve modelleme yapabilecek veri bilimci arıyoruz.",
    "salary": "₺55.000 - ₺75.000"
  },
  {
    "title": "Makine Öğrenmesi Mühendisi",
    "jobSlug": "makine-ogrenmesi-muhendisi",
    "company": "SmartML",
    "location": "Remote",
    "type": "Uzaktan",
    "level": "Senior",
    "posted": "3 saat önce",
    "techTags": ["Python", "Keras", "MLflow", "Azure ML", "NumPy"],
    "description": "Ürünlerimizde makine öğrenmesi algoritmalarının geliştirilmesi ve devreye alınmasında görev alacak mühendis arıyoruz.",
    "salary": "₺90.000 - ₺110.000"
  },
  {
    "title": "Veri Mühendisi",
    "jobSlug": "veri-muhendisi",
    "company": "BigData Solutions",
    "location": "İzmir, Türkiye",
    "type": "Tam Zamanlı",
    "level": "Mid-Level",
    "posted": "4 gün önce",
    "techTags": ["SQL", "ETL", "Apache Spark", "Kafka", "AWS Glue"],
    "description": "Veri boru hatlarının kurulumu ve yönetimi konusunda deneyimli veri mühendisi arıyoruz.",
    "salary": "₺60.000 - ₺80.000"
  },
  {
    "title": "NLP Uzmanı",
    "jobSlug": "nlp-uzmani",
    "company": "LangAI",
    "location": "Bursa, Türkiye",
    "type": "Tam Zamanlı",
    "level": "Junior",
    "posted": "Bugün",
    "techTags": ["Python", "NLTK", "spaCy", "HuggingFace", "FastAPI"],
    "description": "Doğal dil işleme projelerinde çalışacak, yeni mezun veya 1-2 yıl deneyimli NLP uzmanı arıyoruz.",
    "salary": "₺40.000 - ₺55.000"
  },
  {
    "title": "Veri Analisti",
    "jobSlug": "veri-analisti",
    "company": "Insight Analytics",
    "location": "Antalya, Türkiye",
    "type": "Hibrit",
    "level": "Mid-Level",
    "posted": "2 gün önce",
    "techTags": ["SQL", "Tableau", "Excel", "Python", "Looker"],
    "description": "İş zekası ve raporlama projelerinde görev alacak veri analisti arıyoruz.",
    "salary": "₺45.000 - ₺60.000"
  },
  {
    "title": "MLOps Mühendisi",
    "jobSlug": "mlops-muhendisi",
    "company": "OpsAI",
    "location": "Remote",
    "type": "Uzaktan",
    "level": "Senior",
    "posted": "5 saat önce",
    "techTags": ["Docker", "Kubernetes", "CI/CD", "Python", "AWS SageMaker"],
    "description": "Makine öğrenmesi modellerinin üretime alınması ve otomasyonu için MLOps mühendisi arıyoruz.",
    "salary": "₺85.000 - ₺105.000"
  },
  {
    "title": "Veri Tabanı Yöneticisi",
    "jobSlug": "veri-tabani-yoneticisi",
    "company": "DataGuard",
    "location": "İstanbul, Türkiye",
    "type": "Tam Zamanlı",
    "level": "Senior",
    "posted": "1 gün önce",
    "techTags": ["PostgreSQL", "MongoDB", "Backup", "Replication", "Linux"],
    "description": "Veri tabanı yönetimi ve güvenliği konusunda deneyimli, büyük veri tabanlarıyla çalışmış yönetici arıyoruz.",
    "salary": "₺70.000 - ₺90.000"
  },
  {
    "title": "Yapay Zeka Destekli Ürün Yöneticisi",
    "jobSlug": "ai-urun-yoneticisi",
    "company": "NextGenAI",
    "location": "İzmir, Türkiye",
    "type": "Hibrit",
    "level": "Mid-Level",
    "posted": "3 gün önce",
    "techTags": ["Product Management", "AI", "Agile", "Jira", "User Research"],
    "description": "Yapay zeka tabanlı ürünlerin yönetiminde görev alacak, teknik bilgiye sahip ürün yöneticisi arıyoruz.",
    "salary": "₺60.000 - ₺80.000"
  },
  {
    "title": "Veri Görselleştirme Uzmanı",
    "jobSlug": "veri-gorsellestirme-uzmani",
    "company": "Vizualize",
    "location": "Ankara, Türkiye",
    "type": "Tam Zamanlı",
    "level": "Junior",
    "posted": "2 gün önce",
    "techTags": ["D3.js", "Tableau", "PowerBI", "JavaScript", "Python"],
    "description": "Veri görselleştirme araçlarıyla çalışacak, rapor ve dashboard hazırlayacak uzman arıyoruz.",
    "salary": "₺35.000 - ₺50.000"
  },
  {
    "title": "Yapay Zeka Destekli Otomasyon Uzmanı",
    "jobSlug": "ai-otomasyon-uzmani",
    "company": "AutoAI",
    "location": "Bursa, Türkiye",
    "type": "Tam Zamanlı",
    "level": "Mid-Level",
    "posted": "Bugün",
    "techTags": ["Python", "RPA", "UiPath", "Automation Anywhere", "Machine Learning"],
    "description": "İş süreçlerinde yapay zeka destekli otomasyon projelerinde görev alacak uzman arıyoruz.",
    "salary": "₺50.000 - ₺65.000"
  },
  {
    "title": "Veri Güvenliği Uzmanı",
    "jobSlug": "veri-guvenligi-uzmani",
    "company": "SecureData",
    "location": "Remote",
    "type": "Uzaktan",
    "level": "Senior",
    "posted": "4 saat önce",
    "techTags": ["Data Security", "GDPR", "Python", "Encryption", "SIEM"],
    "description": "Veri güvenliği, şifreleme ve mevzuat uyumluluğu konularında deneyimli uzman arıyoruz.",
    "salary": "₺75.000 - ₺95.000"
  },

  ]
    # Diğer ilanları buraya aynı formatla ekle...


with app.app_context():
    for job_data in jobListings:
        job = Job(**job_data)
        db.session.add(job)
    db.session.commit()
    print("İş ilanları başarıyla eklendi.")
