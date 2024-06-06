import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import jsPDF from 'jspdf';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import '../App.css';

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      
      setUserData({
        name: currentUser.displayName || '',
        email: currentUser.email || '',
      });
    } else {
      setUserData(null);
    }
  }, [isAuthenticated, currentUser]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    if (userData) {
      doc.text(`Name: ${userData.name}`, 10, y);
      doc.text(`Email: ${userData.email}`, 10, y + 10);
    }
    doc.save('data.pdf');
  };

  return (
    <div>
      <div>
        <h2>{userData ? userData.name : ''} dashboard</h2>
        {userData && <p>Email: {userData.email}</p>}
      </div>
      <Button type="primary" onClick={exportToPDF} className='btn'>Export to PDF</Button>
    </div>
  );
};

export default Dashboard;
