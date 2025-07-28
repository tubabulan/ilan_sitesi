// src/pages/ProjectDetail.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // useParams ve Link import edildi
import DOMPurify from 'dompurify'; // HTML içeriğini temizlemek için DOMPurify import edildi
import '../ProjectDetail.css'; // Detay sayfası için CSS dosyasını import edin

function ProjectDetail() {
  // URL'den dinamik parametreyi (iş ilanının slug'ını) almak için useParams kullanırız.
  const { jobId } = useParams(); // 'jobId' burada aslında 'jobSlug' değerini alacak

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Örnek iş ilanlarının detay verileri.
  // Not: jobSlug değerleri, buradaki anahtarlarla (keys) EŞLEŞMELİDİR.
  // Gerçek bir uygulamada bu veriler genellikle bir API'den çekilir.
  const allJobDetails = {
    'arka-uc-gelistirici': {
      title: 'Arka Uç Geliştirici (Detay)',
      company: 'StartupX',
      location: 'Ankara, Türkiye',
      type: 'Tam Zamanlı',
      level: 'Mid-Level',
      posted: '1 gün önce',
      techTags: ['Node.js', 'PostgreSQL', 'MongoDB', 'Linux İşletim'],
      description: `Bu pozisyon, ölçeklenebilir arka uç sistemleri geliştirmek isteyen, API tasarımı konusunda derinlemesine deneyime sahip yetenekli bir Arka Uç Geliştirici içindir. Adaylardan Node.js, PostgreSQL ve MongoDB gibi teknolojilere hakim olmaları beklenmektedir. Linux işletim sistemleri bilgisi avantajdır. Dinamik ve hızlı büyüyen ekibimize katılacak, yenilikçi çözümler üretebilecek bir takım arkadaşı arıyoruz.`,
      requirements: [
        'Node.js ve Express.js ile kapsamlı deneyim',
        'PostgreSQL ve MongoDB veritabanı bilgisi',
        'RESTful API tasarımı ve geliştirme tecrübesi',
        'Versiyon kontrol sistemleri (Git) kullanımı',
        'Mikroservis mimarileri hakkında bilgi',
        'Tercihen bulut platformları (AWS, Azure) deneyimi'
      ],
      benefits: [
        'Esnek çalışma saatleri',
        'Uzaktan çalışma imkanı (hibrit model)',
        'Özel sağlık sigortası',
        'Eğitim ve gelişim bütçesi',
        'Teknolojik ekipman desteği'
      ],
      salary: '₺38.000 - ₺48.000',
      applyLink: 'https://example.com/apply/arka-uc-gelistirici'
    },

    'senior-software-engineer-linkedin-example': {
      title: 'Senior Software Engineer at Example Corp',
      company: 'Example Corp',
      location: 'Remote',
      type: 'Full-time', // Eklenen alan
      level: 'Senior', // Eklenen alan
      posted: '1 saat önce', // Eklenen alan
      description: `
        <p>Bu, LinkedIn ilanının tam ve detaylı açıklamasıdır. Şirketimiz, en son teknolojileri kullanarak yenilikçi çözümler geliştiren dinamik bir yazılım ekibi aramaktadır. Rolünüz, yazılım geliştirme yaşam döngüsünün her aşamasında aktif olarak yer almayı içerecektir.</p>
        <h3>Ana Sorumluluklar:</h3>
        <ul>
          <li>Ölçeklenebilir, yüksek performanslı ve güvenli yazılım çözümleri tasarlama ve geliştirme.</li>
          <li>Çapraz fonksiyonel ekiplerle işbirliği yaparak ürün gereksinimlerini anlama ve teknik çözümlere dönüştürme.</li>
          <li>Kod incelemeleri yapma, en iyi uygulamaları takip etme ve teknik standartları uygulama.</li>
          <li>Yeni teknolojileri araştırma ve projelere entegre etme.</li>
          <li>Hata ayıklama, sorun giderme ve mevcut sistemleri optimize etme.</li>
        </ul>
        <h3>Gereken Nitelikler:</h3>
        <ul>
          <li>Bilgisayar Bilimleri veya ilgili bir alanda lisans derecesi.</li>
          <li>En az 5 yıl profesyonel yazılım geliştirme deneyimi.</li>
          <li>React, Node.js ve TypeScript konularında güçlü yetkinlik.</li>
          <li>AWS veya Azure gibi bulut platformlarında deneyim.</li>
          <li>Mikroservis mimarileri ve RESTful API tasarımı hakkında derin bilgi.</li>
          <li>İyi iletişim becerileri ve takım çalışmasına yatkınlık.</li>
        </ul>
        <h3>Ek Bilgiler:</h3>
        <p>Esnek çalışma saatleri ve rekabetçi bir maaş paketi sunuyoruz. Sürekli öğrenmeyi teşvik eden ve çalışan gelişimine yatırım yapan bir şirket kültürümüz var.</p>
      `,
      requirements: [ // Eklenen alan
        'Bilgisayar Bilimleri veya ilgili bir alanda lisans derecesi',
        'En az 5 yıl profesyonel yazılım geliştirme deneyimi',
        'React, Node.js ve TypeScript konularında güçlü yetkinlik',
        'AWS veya Azure gibi bulut platformlarında deneyim',
        'Mikroservis mimarileri ve RESTful API tasarımı hakkında derin bilgi'
      ],
      benefits: [ // Eklenen alan
        'Esnek çalışma saatleri',
        'Rekabetçi maaş paketi',
        'Sürekli öğrenme ve gelişim fırsatları',
        'Kapsamlı sağlık sigortası'
      ],
      skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Microservices', 'GraphQL', 'Docker', 'Kubernetes'],
      salary: '₺75.000 - ₺95.000', // Maaş (varsa)
      applyLink: 'https://www.linkedin.com/jobs/view/4264468962/apply' // LinkedIn'deki gerçek başvuru linki
    },

    'backend-developer': {
      title: 'Backend Developer (Detay)',
      company: 'Firma Adı',
      location: 'Ankara, Türkiye',
      type: 'Tam Zamanlı',
      level: 'Senior',
      posted: '3 gün önce',
      techTags: ['Java', 'Spring Boot', 'Microservices', 'Kafka'],
      description: `Finans sektöründe faaliyet gösteren şirketimiz için güvenli, yüksek performanslı ve ölçeklenebilir backend sistemleri geliştirecek Kıdemli Backend Developer arıyoruz. Java, Spring Boot, Microservices ve Kafka teknolojilerine hakim olmak esastır. Büyük veri işleme ve dağıtık sistemler konusunda deneyim tercih sebebidir. Takım çalışmasına yatkın, problem çözme becerileri yüksek adayları bekliyoruz.`,
      requirements: [
        'Java ve Spring Boot ile 5+ yıl deneyim',
        'Mikroservis tabanlı mimarilerde çalışma tecrübesi',
        'Kafka veya benzeri mesaj kuyruk sistemleri bilgisi',
        'SQL ve NoSQL veritabanı deneyimi (PostgreSQL, Cassandra)',
        'CI/CD süreçlerine hakimiyet',
        'Çevik (Agile) metodolojilerle çalışma alışkanlığı'
      ],
      benefits: [
        'Rekabetçi maaş paketi',
        'Performansa dayalı bonuslar',
        'Şirket içi eğitim ve sertifika programları',
        'Modern ofis ortamı ve sosyal imkanlar',
        'Özel emeklilik planı'
      ],
      salary: '₺50.000 - ₺70.000',
      applyLink: 'https://example.com/apply/backend-developer'
    },
    'python-developer': {
      title: 'Python Developer (Detay)',
      company: 'Şirket A.Ş.',
      location: 'İstanbul, Türkiye',
      type: 'Hibrit',
      level: 'Mid-Level',
      posted: '5 gün önce',
      techTags: ['Python', 'Django', 'Flask', 'PostgreSQL'],
      description: 'AI destekli yenilikçi ürünlerimiz için Python backend geliştirecek yetenekli bir geliştirici arıyoruz. Django ve Flask gibi framework\'lere hakimiyet ve PostgreSQL veritabanı deneyimi önemlidir. Makine öğrenimi modelleriyle entegrasyon konusunda bilgi sahibi olmak avantajdır. Uzaktan ve ofisten çalışma imkanları sunan hibrit bir çalışma modelimiz mevcuttur.',
      requirements: [
        'Python, Django ve Flask ile deneyim',
        'PostgreSQL veya diğer ilişkisel veritabanları bilgisi',
        'Celery, Redis gibi teknolojilerle çalışma deneyimi',
        'API geliştirme (REST, GraphQL)',
        'Test odaklı geliştirme (TDD) prensiplerine aşinalık',
        'Veri bilimi kütüphaneleri (Pandas, NumPy) bilgisi tercih sebebi'
      ],
      benefits: [
        'Hibrit çalışma imkanı',
        'Yemek kartı',
        'Ulaşım desteği',
        'Teknoloji konferanslarına katılım desteği',
        'Mentorluk programları'
      ],
      salary: '₺35.000 - ₺55.000',
      applyLink: 'https://example.com/apply/python-developer'
    },
    'arka-uc-gelistirici-2': {
      title: 'Arka Uç Geliştirici (Detay - 2. İlan)',
      company: 'Başka Bir Startup',
      location: 'İzmir, Türkiye',
      type: 'Tam Zamanlı',
      level: 'Mid-Level',
      posted: '2 gün önce',
      techTags: ['Java', 'Spring Boot', 'MySQL'],
      description: 'Java ve Spring Boot ile microservice geliştirmede deneyimli arka uç geliştirici arıyoruz.',
      requirements: ['Java', 'Spring Boot', 'MySQL', 'RESTful API'],
      benefits: ['Esnek çalışma saatleri', 'Spor kartı'],
      salary: '₺40.000 - ₺50.000',
      applyLink: 'https://example.com/apply/arka-uc-gelistirici-2'
    },
    'backend-developer-2': {
        title: 'Backend Developer (Detay - 2. İlan)',
        company: 'Yüksek Teknoloji A.Ş.',
        location: 'Ankara, Türkiye',
        type: 'Tam Zamanlı',
        level: 'Senior',
        posted: '4 gün önce',
        techTags: ['C#', '.NET Core', 'Azure Functions'],
        description: '.NET Core ve Azure Functions kullanarak bulut tabanlı backend sistemleri geliştirmek isteyen senior developer arıyoruz.',
        requirements: ['C#', '.NET Core', 'Azure', 'NoSQL'],
        benefits: ['Uzaktan çalışma', 'Eğitim bütçesi'],
        salary: '₺55.000 - ₺75.000',
        applyLink: 'https://example.com/apply/backend-developer-2'
    },
    'python-developer-2': {
        title: 'Python Developer (Detay - 2. İlan)',
        company: 'Veri Çözümleri Ltd.',
        location: 'İstanbul, Türkiye',
        type: 'Uzaktan',
        level: 'Mid-Level',
        posted: '6 gün önce',
        techTags: ['Python', 'FastAPI', 'MongoDB'],
        description: 'Veri analizi ve otomasyon projeleri için Python ile API geliştirecek Mid-Level Developer arıyoruz.',
        requirements: ['Python', 'FastAPI', 'MongoDB', 'Docker'],
        benefits: ['Uzaktan çalışma', 'Ekip etkinlikleri'],
        salary: '₺36.000 - ₺56.000',
        applyLink: 'https://example.com/apply/python-developer-2'
    }
  };

  useEffect(() => {
    // Gerçek bir uygulamada burada bir API çağrısı yapardınız:
    // fetch(`/api/jobs/${jobId}`)
    //   .then(response => response.json())
    //   .then(data => { setJob(data); setLoading(false); })
    //   .catch(err => { setError(err); setLoading(false); });

    // Şimdilik, statik veriden çekiyoruz:
    const foundJob = allJobDetails[jobId];
    if (foundJob) {
      setJob(foundJob);
    } else {
      setError("İş ilanı bulunamadı.");
    }
    setLoading(false);
  }, [jobId]); // jobId değiştiğinde useEffect tekrar çalışır

  if (loading) {
    return <div className="project-detail-container loading-message">Yükleniyor...</div>;
  }

  if (error) {
    return (
      <div className="project-detail-container error-message">
        <h2>Hata: {error}</h2>
        <Link to="/" className="back-link">Ana Sayfaya Geri Dön</Link>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="project-detail-container no-job-found">
        <h2>Üzgünüz, aradığınız iş ilanı bulunamadı.</h2>
        <Link to="/" className="back-link">Ana Sayfaya Geri Dön</Link>
      </div>
    );
  }

  // HTML içeriğini güvenli bir şekilde render etmek için DOMPurify kullanın
  const sanitizedDescription = DOMPurify.sanitize(job.description);

  return (
    <div className="project-detail-container">
      <Link to="/" className="back-link">&larr; Tüm İş İlanlarına Geri Dön</Link>
      <h1 className="job-detail-title">{job.title}</h1>
      <div className="job-meta-details">
        <span><strong>Şirket:</strong> {job.company}</span>
        <span><strong>Konum:</strong> {job.location}</span>
        <span><strong>Çalışma Türü:</strong> {job.type}</span>
        <span><strong>Deneyim Seviyesi:</strong> {job.level}</span>
        <span><strong>Maaş:</strong> {job.salary}</span>
        <span><strong>Yayınlanma:</strong> {job.posted}</span>
      </div>

      <div className="job-section">
        <h2>İş Tanımı</h2>
        {/* Güvenlik Uyarısı: dangerouslySetInnerHTML kullanırken dikkatli olun.
            Dışarıdan gelen HTML içeriğini DOMPurify gibi bir kütüphane ile
            temizlemeden kullanmak XSS güvenlik açığına yol açabilir.
            Burada DOMPurify kullanılmıştır. */}
        <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
      </div>

      {job.requirements && job.requirements.length > 0 && (
        <div className="job-section">
          <h2>Gereksinimler</h2>
          <ul>
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      {job.benefits && job.benefits.length > 0 && (
        <div className="job-section">
          <h2>Yan Haklar ve Avantajlar</h2>
          <ul>
            {job.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}

      {job.techTags && job.techTags.length > 0 && (
        <div className="job-section">
          <h2>Kullanılan Teknolojiler</h2>
          <div className="tech-tags-detail"> {/* Farklı stil için sınıf adı */}
            {job.techTags.map((tag, index) => (
              <span key={index} className="tech-tag-item">{tag}</span>
            ))}
          </div>
        </div>
      )}

      {job.applyLink && (
        <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="apply-button-detail">
          Şimdi Başvur
        </a>
      )}
      <Link to="/" className="back-link bottom-back-link">Ana Sayfaya Geri Dön</Link>
    </div>
  );
}

export default ProjectDetail;
