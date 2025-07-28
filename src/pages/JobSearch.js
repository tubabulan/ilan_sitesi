// src/pages/JobSearch.js
import React, { useState } from 'react';
import axios from 'axios';

function JobSearch() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [level, setLevel] = useState('');
  const [jobs, setJobs] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:3002filter-jobs', {
        title,
        location,
        type,
        level
      });
      setJobs(response.data);
    } catch (error) {
      console.error("Filtreleme sırasında hata oluştu:", error);
    }
  };

  return (
    <div>
      <h2>İş Ara</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Pozisyon" />
      <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Konum" />
      <input value={type} onChange={e => setType(e.target.value)} placeholder="Çalışma Tipi" />
      <input value={level} onChange={e => setLevel(e.target.value)} placeholder="Seviye" />
      <button onClick={handleSearch}>İş Ara</button>

      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            <strong>{job.title}</strong> - {job.company} - {job.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobSearch;
