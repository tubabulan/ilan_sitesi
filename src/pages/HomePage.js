import React, { useState } from "react";
import '../App.css';
import { FaSearch } from 'react-icons/fa'; // Arama ikonu için
import { FaUsers, FaBuilding, FaCheckCircle, FaDollarSign } from 'react-icons/fa';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProjectDetail from './ProjectDetail';

function App() {
  const [form, setForm] = useState({
    keyword: '',
    city: '',
    experience: '',
    workType: ''
  });

  const [filteredJobs, setFilteredJobs] = useState([]); // Filtrelenmiş işler için state
  const navigate = useNavigate();

  // İlk renderda tüm iş ilanlarını göster
  React.useEffect(() => {
    setFilteredJobs(jobListings);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filtered = jobListings.filter((job) => {
      const keywordMatch = form.keyword === '' ||
        job.title.toLowerCase().includes(form.keyword.toLowerCase()) ||
        job.description.toLowerCase().includes(form.keyword.toLowerCase());

      const cityMatch = form.city === '' ||
        job.location.toLowerCase().includes(form.city.toLowerCase());

      const experienceMap = {
        junior: ['Junior', 'Yeni Mezun / Junior'],
        mid: ['Mid-Level', 'Orta Seviye'],
        senior: ['Senior', 'Kıdemli']
      };
      const experienceMatch = form.experience === '' ||
        (experienceMap[form.experience] && experienceMap[form.experience].some(level => job.level.toLowerCase().includes(level.toLowerCase())));

      const workTypeMap = {
        remote: ['Remote', 'Uzaktan'],
        hybrid: ['Hybrid', 'Hibrit'],
        onsite: ['Onsite', 'Tam Zamanlı', 'Ofis']
      };
      const workTypeMatch = form.workType === '' ||
        (workTypeMap[form.workType] && workTypeMap[form.workType].some(type => job.type.toLowerCase().includes(type.toLowerCase())));

      return keywordMatch && cityMatch && experienceMatch && workTypeMatch;
    });

    setFilteredJobs(filtered);
  };

  const handleProjectDetailsClick = (jobSlug) => {
    navigate(`/jobs/${jobSlug}`);
  };

  const filters = [
    { title: 'Frontend Developer', tags: ['React', 'Vue', 'Angular', 'JavaScript', 'HTML', 'CSS', 'TypeScript'] },
    { title: 'Backend Developer', tags: ['Node.js', 'Python', 'Java', 'Spring Boot', 'PHP', 'Go', '.NET'], highlight: true },
    { title: 'Full Stack Developer', tags: ['Frontend + Backend', 'MERN', 'MEAN', 'LAMP'] },
    { title: 'Mobile Developer', tags: ['iOS', 'Android', 'React Native', 'Flutter', 'Swift', 'Kotlin'] },
    { title: 'DevOps Engineer', tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Azure', 'GCP', 'Terraform'] },
    { title: 'Data Scientist', tags: ['Python', 'ML', 'AI', 'Pandas', 'TensorFlow', 'PyTorch', 'SQL'] },
    { title: 'Siber Güvenlik Uzmanı', tags: ['Ağ Güvenliği', 'Sızma Testi', 'Uygulama Güvenliği', 'SIEM'] },
    { title: 'Bulut Mühendisi', tags: ['AWS', 'Azure', 'GCP', 'Konteyner', 'Sunucusuz', 'IaC'] },
    { title: 'QA / Test Mühendisi', tags: ['Otomasyon Testi', 'Selenium', 'Cypress', 'Manuel Test'] },
    { title: 'UI/UX Tasarımcısı', tags: ['Figma', 'Sketch', 'Prototipleme', 'Kullanıcı Deneyimi'] },
    { title: 'Veritabanı Yöneticisi', tags: ['SQL', 'NoSQL', 'PostgreSQL', 'MongoDB', 'Performans Optimizasyonu'] },
    { title: 'Ağ Mühendisi', tags: ['TCP/IP', 'Yönlendirme', 'Güvenlik Duvarı', 'VPN'] },
    { title: 'Teknik Destek / BT Uzmanı', tags: ['Donanım', 'Yazılım Sorun Giderme', 'Ağ Temelleri'] }
  ];

  const jobListings = [
    {
      title: 'Yapay Zeka Mühendisi',
      jobSlug: 'yapay-zeka-muhendisi',
      company: 'AI Vision Tech',
      location: 'İstanbul, Türkiye',
      type: 'Tam Zamanlı',
      level: 'Senior',
      posted: '2 gün önce',
      techTags: ['Python', 'TensorFlow', 'PyTorch', 'Docker', 'AWS'],
      description: 'Görüntü işleme ve makine öğrenmesi projelerinde görev alacak, deneyimli yapay zeka mühendisi arıyoruz.',
      salary: '₺80.000 - ₺100.000'
    },
    {
      title: 'Veri Bilimci',
      jobSlug: 'veri-bilimci',
      company: 'DataSense',
      location: 'Ankara, Türkiye',
      type: 'Hibrit',
      level: 'Mid-Level',
      posted: '1 gün önce',
      techTags: ['Python', 'Pandas', 'Scikit-learn', 'SQL', 'PowerBI'],
      description: 'Büyük veri setleriyle çalışacak, analiz ve modelleme yapabilecek veri bilimci arıyoruz.',
      salary: '₺55.000 - ₺75.000'
    },
    {
      title: 'Makine Öğrenmesi Mühendisi',
      jobSlug: 'makine-ogrenmesi-muhendisi',
      company: 'SmartML',
      location: 'Remote',
      type: 'Uzaktan',
      level: 'Senior',
      posted: '3 saat önce',
      techTags: ['Python', 'Keras', 'MLflow', 'Azure ML', 'NumPy'],
      description: 'Ürünlerimizde makine öğrenmesi algoritmalarının geliştirilmesi ve devreye alınmasında görev alacak mühendis arıyoruz.',
      salary: '₺90.000 - ₺110.000'
    },
    {
      title: 'Veri Mühendisi',
      jobSlug: 'veri-muhendisi',
      company: 'BigData Solutions',
      location: 'İzmir, Türkiye',
      type: 'Tam Zamanlı',
      level: 'Mid-Level',
      posted: '4 gün önce',
      techTags: ['SQL', 'ETL', 'Apache Spark', 'Kafka', 'AWS Glue'],
      description: 'Veri boru hatlarının kurulumu ve yönetimi konusunda deneyimli veri mühendisi arıyoruz.',
      salary: '₺60.000 - ₺80.000'
    },
    {
      title: 'NLP Uzmanı',
      jobSlug: 'nlp-uzmani',
      company: 'LangAI',
      location: 'Bursa, Türkiye',
      type: 'Tam Zamanlı',
      level: 'Junior',
      posted: 'Bugün',
      techTags: ['Python', 'NLTK', 'spaCy', 'HuggingFace', 'FastAPI'],
      description: 'Doğal dil işleme projelerinde çalışacak, yeni mezun veya 1-2 yıl deneyimli NLP uzmanı arıyoruz.',
      salary: '₺40.000 - ₺55.000'
    },
    {
      title: 'Veri Analisti',
      jobSlug: 'veri-analisti',
      company: 'Insight Analytics',
      location: 'Antalya, Türkiye',
      type: 'Hibrit',
      level: 'Mid-Level',
      posted: '2 gün önce',
      techTags: ['SQL', 'Tableau', 'Excel', 'Python', 'Looker'],
      description: 'İş zekası ve raporlama projelerinde görev alacak veri analisti arıyoruz.',
      salary: '₺45.000 - ₺60.000'
    },
    {
      title: 'MLOps Mühendisi',
      jobSlug: 'mlops-muhendisi',
      company: 'OpsAI',
      location: 'Remote',
      type: 'Uzaktan',
      level: 'Senior',
      posted: '5 saat önce',
      techTags: ['Docker', 'Kubernetes', 'CI/CD', 'Python', 'AWS SageMaker'],
      description: 'Makine öğrenmesi modellerinin üretime alınması ve otomasyonu için MLOps mühendisi arıyoruz.',
      salary: '₺85.000 - ₺105.000'
    },
    {
      title: 'Veri Tabanı Yöneticisi',
      jobSlug: 'veri-tabani-yoneticisi',
      company: 'DataGuard',
      location: 'İstanbul, Türkiye',
      type: 'Tam Zamanlı',
      level: 'Senior',
      posted: '1 gün önce',
      techTags: ['PostgreSQL', 'MongoDB', 'Backup', 'Replication', 'Linux'],
      description: 'Veri tabanı yönetimi ve güvenliği konusunda deneyimli, büyük veri tabanlarıyla çalışmış yönetici arıyoruz.',
      salary: '₺70.000 - ₺90.000'
    },
    {
      title: 'Yapay Zeka Destekli Ürün Yöneticisi',
      jobSlug: 'ai-urun-yoneticisi',
      company: 'NextGenAI',
      location: 'İzmir, Türkiye',
      type: 'Hibrit',
      level: 'Mid-Level',
      posted: '3 gün önce',
      techTags: ['Product Management', 'AI', 'Agile', 'Jira', 'User Research'],
      description: 'Yapay zeka tabanlı ürünlerin yönetiminde görev alacak, teknik bilgiye sahip ürün yöneticisi arıyoruz.',
      salary: '₺60.000 - ₺80.000'
    },
    {
      title: 'Veri Görselleştirme Uzmanı',
      jobSlug: 'veri-gorsellestirme-uzmani',
      company: 'Vizualize',
      location: 'Ankara, Türkiye',
      type: 'Tam Zamanlı',
      level: 'Junior',
      posted: '2 gün önce',
      techTags: ['D3.js', 'Tableau', 'PowerBI', 'JavaScript', 'Python'],
      description: 'Veri görselleştirme araçlarıyla çalışacak, rapor ve dashboard hazırlayacak uzman arıyoruz.',
      salary: '₺35.000 - ₺50.000'
    },
    {
      title: 'Yapay Zeka Destekli Otomasyon Uzmanı',
      jobSlug: 'ai-otomasyon-uzmani',
      company: 'AutoAI',
      location: 'Bursa, Türkiye',
      type: 'Tam Zamanlı',
      level: 'Mid-Level',
      posted: 'Bugün',
      techTags: ['Python', 'RPA', 'UiPath', 'Automation Anywhere', 'Machine Learning'],
      description: 'İş süreçlerinde yapay zeka destekli otomasyon projelerinde görev alacak uzman arıyoruz.',
      salary: '₺50.000 - ₺65.000'
    },
    {
      title: 'Veri Güvenliği Uzmanı',
      jobSlug: 'veri-guvenligi-uzmani',
      company: 'SecureData',
      location: 'Remote',
      type: 'Uzaktan',
      level: 'Senior',
      posted: '4 saat önce',
      techTags: ['Data Security', 'GDPR', 'Python', 'Encryption', 'SIEM'],
      description: 'Veri güvenliği, şifreleme ve mevzuat uyumluluğu konularında deneyimli uzman arıyoruz.',
      salary: '₺75.000 - ₺95.000'
    }
  ];

  const stats = [
    { value: '2.5K+', label: 'Aktif İş İlanı', icon: <FaUsers /> },
    { value: '800+', label: 'Şirket', icon: <FaBuilding /> },
    { value: '15K+', label: 'Başarılı Yerleşim', icon: <FaCheckCircle /> },
    { value: '₺85K', label: 'Ortalama Maaş', icon: <FaDollarSign /> }
  ];

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={
          <div className="center-content-wrapper">
            <section className="stats-section">
              {stats.map((stat, index) => (
                <div className="stat-box" key={index}>
                  <div className="stat-icon-value">
                    {stat.icon}
                    <span className="stat-value">{stat.value}</span>
                  </div>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </section>

            <div className="main-layout-columns">
              <aside className="left-sidebar">
                <div className="job-search-section">
                  <form onSubmit={handleSubmit} className="job-form">
                    <div className="search-header">
                      <FaSearch className="search-icon" />
                      <h2 className="section-title">İş Arama</h2>
                    </div>

                    <input
                      type="text"
                      name="keyword"
                      placeholder="İş pozisyonu veya anahtar kelime"
                      value={form.keyword}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="Şehir (Örn: İstanbul, Ankara)"
                      value={form.city}
                      onChange={handleChange}
                    />
                    <select
                      name="experience"
                      value={form.experience}
                      onChange={handleChange}
                    >
                      <option value="">Deneyim Seviyesi</option>
                      <option value="junior">Yeni Mezun / Junior</option>
                      <option value="mid">Orta Seviye</option>
                      <option value="senior">Kıdemli</option>
                    </select>
                    <select
                      name="workType"
                      value={form.workType}
                      onChange={handleChange}
                    >
                      <option value="">Çalışma Türü</option>
                      <option value="remote">Uzaktan</option>
                      <option value="hybrid">Hibrit</option>
                      <option value="onsite">Ofis</option>
                    </select>
                    <button type="submit">İş Ara</button>
                  </form>
                </div>

                <div className="quick-filters-box">
                  <h3>Hızlı Filtreler</h3>
                  <ul className="filter-list">
                    {filters.map((filter, index) => (
                      <li
                        key={index}
                        className={`filter-item ${filter.highlight ? 'highlight' : ''}`}
                      >
                        <strong>{filter.title}</strong>
                        <span className="tags">{filter.tags.join(', ')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              <main className="main-content">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job, index) => (
                    <div className="job-card" key={index}>
                      <div className="job-card-header">
                        <h3>{job.title}</h3>
                        <span className="company">{job.company}</span>
                        <span className="location">{job.location}</span>
                        <span className="type">{job.type}</span>
                        <span className="level">{job.level}</span>
                        <span className="posted">{job.posted}</span>
                      </div>

                      <div className="tech-tags">
                        {job.techTags.map((tag, tagIndex) => (
                          <span key={tagIndex}>{tag}</span>
                        ))}
                      </div>

                      <p className="description">{job.description}</p>

                      <div className="job-footer">
                        <button className="apply-btn">Başvur</button>
                        <button
                          className="project-details-btn"
                          onClick={() => handleProjectDetailsClick(job.jobSlug)}
                        >
                          Proje Detayları
                        </button>
                        <span className="salary">{job.salary}</span>
                        <span className="save-icon">❤️</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Aramanıza uygun iş ilanı bulunamadı.</p>
                )}
              </main>
            </div>
          </div>
        } />

        <Route path="/jobs/:jobId" element={<ProjectDetail />} />
      </Routes>
    </div>
  );
}

export default App;
