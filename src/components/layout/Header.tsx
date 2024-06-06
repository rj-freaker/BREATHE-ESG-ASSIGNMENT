import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/authSlice';
import { Button } from 'antd';
import '../../App.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Log ou successfully!');
    navigate('/');
  };

  return (
    <header>
        <div className='headerDiv'>
          <h2>Welcome</h2>
            {user && <Button onClick={handleLogout} className='btn'>Logout</Button>}
        </div>
    </header>
  );
};

export default Header;
