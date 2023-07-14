import React, {useEffect, useState } from 'react'
import axios from 'axios';
import Addsite from './components/Addsite';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

function App() {
  const [sites, setSites] = useState([]);

  useEffect(()=> {
    fetchSites();
  }, []);
  const fetchSites = async () => {
    try {
      const res = await axios.get('/api/sites');
      setSites(res.data);
    } catch (error) {
      console.error('Error fetching sites:', error );
    }
  };

  return (
    <div className="container">
      <h1 > Website and Issue Database. (also hello world...number of sites: {sites.length}) </h1>
      <br/>
      <Addsite />
        {sites.map((site) => (
          <div key={site.id}>
            <h3>{site.site}</h3>
            <p>Has {site.issueCount} issue(s) </p>
            <p>Using the {site.tool} tool.</p>
          </div>
        ))}
    </div>
  )
}

export default App
