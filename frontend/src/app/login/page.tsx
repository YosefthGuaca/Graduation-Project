import React from 'react';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <Navbar />
      <LoginForm />
    </>
  );
};

export default page;
