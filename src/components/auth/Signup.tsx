import React from 'react';
import './Layout.css';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { login } from '../../redux/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (values: { email: string; password: string; displayName: string }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      if (user) {
        await updateProfile(user, { displayName: values.displayName });
        dispatch(login(userCredential.user!));
        toast.success('Signed up successfully!');
        navigate('/dashboard');
      } else {
        throw new Error('User object is null');
      }
    } catch (error) {
      console.error('Error signing up: ', error);
      const firebaseError = error as FirebaseError;
      console.error('Error signing up: ', firebaseError);
      if (firebaseError.code === 'auth/email-already-in-use') {
        toast.error('Email already in use. Please use a different email.');
      } else {
        toast.error('Failed to sign up. Please try again.');
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
      <div className='formDiv'>
        <h3>Sign Up</h3>
        <Form layout="vertical" onFinish={handleSignup}>
          <Form.Item
            label="Name"
            name="displayName"
            labelCol={{ span: 24 }}
            labelAlign="left"
            style={{ color: 'white' }}
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            labelCol={{ span: 24 }}
            labelAlign="left"
            style={{ color: 'white' }}
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            labelCol={{ span: 24 }}
            labelAlign="left"
            style={{ color: 'white' }}
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Sign Up</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
