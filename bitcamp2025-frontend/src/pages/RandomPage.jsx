//random page with blue background and white text
import React from 'react';
import './style.css'; // Assuming you have a CSS file for styles


const RandomPage = () => {
  return (
    <div style={{ backgroundColor: 'blue', color: 'white', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Random Page</h1>
    </div>
  );
}
export default RandomPage;