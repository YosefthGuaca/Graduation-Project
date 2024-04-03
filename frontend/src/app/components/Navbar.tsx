'use client';

import React from 'react';
import Link from 'next/link';
import axiosInstance from '@/axios';

type Props = {};

const Navbar = (props: Props) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.request({
          url: 'users/me',
          method: 'GET',
        });
        if (response.status === 200 && response.data) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log('Not logged in');
      }
    };
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await axiosInstance.post('/users/logout');
      console.log('Logged out');
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="w-full flex justify-end py-8 gap-4">
      {isLoggedIn && (
        <Link href="/home/websites" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Websites
        </Link>
      )}
      {isLoggedIn && (
        <button
          onClick={() => logout()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      )}
      {!isLoggedIn && (
        <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </Link>
      )}
      {!isLoggedIn && (
        <Link href="/signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          SignUp
        </Link>
      )}
    </div>
  );
};

export default Navbar;
