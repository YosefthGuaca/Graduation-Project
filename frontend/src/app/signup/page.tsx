import React from 'react';
import SignupForm from '../components/SignupForm';
import Navbar from '../components/Navbar';

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <Navbar />
      <SignupForm />
    </>
  );
};

export default page;
