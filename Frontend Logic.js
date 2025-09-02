// Example React component for a Dentist Dashboard (inside a .jsx file)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf'; // Make sure to install this package
import 'jspdf-autotable'; // Optional plugin for tables

const DentistDashboard = () => {
  const [scans, setScans] = useState([]);
  
  useEffect(() => {
    const fetchScans = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/scans', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setScans(response.data);
      } catch (error) {
        console.error("Error fetching scans:", error);
      }
    };
    fetchScans();
  }, []);

  const downloadReport = (scan) => {
    const doc = new jsPDF();
    
    // Add a title
    doc.setFontSize(20);
    doc.text('OralVis Healthcare - Dental Scan Report', 15, 20);

    // Add patient and scan details
    doc.setFontSize(12);
    doc.text(`Patient Name: ${scan.patientName}`, 15, 30);
    doc.text(`Patient ID: ${scan.patientId}`, 15, 40);
    doc.text(`Scan Type: ${scan.scanType}`, 15, 50);
    doc.text(`Region: ${scan.region}`, 15, 60);
    doc.text(`Upload Date: ${new Date(scan.uploadDate).toLocaleDateString()}`, 15, 70);

    // Add the image
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Required to load images from different origins
    img.src = scan.imageUrl;
    img.onload = () => {
      doc.addImage(img, 'JPEG', 15, 80, 180, 120); // x, y, width, height
      doc.save(`report_${scan.patientId}.pdf`);
    };
  };

  return (
    <div>
      <h2>Dentist Dashboard</h2>
      {scans.length === 0 ? (
        <p>No scans found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Patient ID</th>
              <th>Scan Type</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {scans.map(scan => (
              <tr key={scan.id}>
                <td>{scan.patientName}</td>
                <td>{scan.patientId}</td>
                <td>{scan.scanType}</td>
                <td>
                  <button onClick={() => downloadReport(scan)}>Download Report</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DentistDashboard;
