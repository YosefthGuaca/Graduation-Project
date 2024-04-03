'use client';

import Link from 'next/link';
import axiosInstance from '@/axios';

type Props = {};

const TopPage = (props: Props) => {
  const logout = async () => {
    try {
      await axiosInstance.post('/users/logout');
      console.log('Logged out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <p className="text-2xl font-bold">Welcome!</p>
      <h1 className="text-6xl font-bold">Ux Show Go</h1>
      <Link href="/login">Login</Link>
      <Link href="/signup">Signup</Link>
      <button onClick={() => logout()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Logout
      </button>
    </>
  );
};

export default TopPage;
