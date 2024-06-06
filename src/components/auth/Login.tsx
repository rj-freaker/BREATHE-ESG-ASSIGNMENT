import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../../firebase';
import { login } from '../../redux/authSlice';
import { FirebaseError } from 'firebase/app';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Layout.css';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      dispatch(login(userCredential.user!));
      toast.success('Login Successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in: ', error);
      const firebaseError = error as FirebaseError;
      if (firebaseError.code === 'auth/user-not-found') {
        toast.error('User not registered. Please sign up.');
      } else {
        toast.error('Failed to log in. Please check your credentials.');
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      dispatch(login(userCredential.user!));
      toast.success('Login Successfully!');
    } catch (error) {
      console.error('Error logging in with Google: ', error);
      const firebaseError = error as FirebaseError;
      if (firebaseError.code === 'auth/user-not-found') {
        toast.error('User not registered. Please sign up.');
      } else {
        toast.error('Failed to log in. Please check your credentials.');
      }
    }
  };

  const handleGithubLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, githubProvider);
      dispatch(login(userCredential.user!));
      toast.success('Login Successfully!');
    } catch (error) {
      console.error('Error logging in with GitHub: ', error);
      const firebaseError = error as FirebaseError;
      if (firebaseError.code === 'auth/user-not-found') {
        toast.error('User not registered. Please sign up.');
      } else {
        toast.error('Failed to log in. Please check your credentials.');
      }
    }
  };

  return (
    <div className='signUpDiv'>
      <div className='innerDiv'>
        <p style={{ fontSize: '20px' }}>WELCOME TO</p>
        <h2>BREATHE ESG</h2>
        <p>We help you to track your organisations metric as per the ESG Guidelines</p>
      </div>
      <div className='logInformDiv'>
        <h3>Sign In</h3>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Email"
            name="email"
            labelCol={{ span: 24 }}
            labelAlign="left"
            style={{ color: 'white' }}
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            labelCol={{ span: 24 }}
            labelAlign="left"
            style={{ color: 'white' }}
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" className='loginBtn' style={{ width: '100%' }}>Login</Button>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="default" onClick={handleGoogleLogin} className='btn' style={{ width: '100%' }}>Login with Google</Button>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="default" onClick={handleGithubLogin} className='btn' style={{ width: '100%' }}>Login with GitHub</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
