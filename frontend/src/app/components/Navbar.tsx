'use client';

import React from 'react';
import Link from 'next/link';
import axiosInstance from '@/axios';
import { usePathname } from 'next/navigation';

type Props = {};

const Navbar = (props: Props) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const pathname = usePathname();

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
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="absolute w-full">
      <div className="py-4 px-2 lg:mx-4 xl:mx-12 ">
        <div className="">
          <nav className="flex items-center justify-between flex-wrap  ">
            <div className="block lg:hidden">
              <button
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="navbar-burger flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white"
              >
                <svg
                  className="fill-current h-6 w-6 text-gray-700"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
            <div
              id="main-nav"
              className={`w-full flex-grow lg:flex items-center lg:w-auto  ${isNavOpen ? '' : 'hidden'}`}
            >
              <div className="text-sm lg:flex-grow mt-2 animated jackinthebox xl:mx-8">
                <Link
                  href="/"
                  className={`block lg:inline-block text-md font-bold ${pathname === '/' ? 'text-orange-500' : 'text-gray-900'}  sm:hover:border-indigo-400  hover:text-orange-500 mx-2 focus:text-blue-500  p-1 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg`}
                >
                  TOP
                </Link>
                {isLoggedIn && (
                  <Link
                    href="/home"
                    className={`block lg:inline-block text-md font-bold ${pathname === '/home' ? 'text-orange-500' : 'text-gray-900'}  sm:hover:border-indigo-400  hover:text-orange-500 mx-2 focus:text-blue-500  p-1 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg`}
                  >
                    HOME
                  </Link>
                )}
              </div>
              <div className="text-sm lg:flex-grow lg:mt-2 animated jackinthebox xl:mx-8 lg:text-right">
                {isLoggedIn ? (
                  <button
                    onClick={() => logout()}
                    className={`block lg:inline-block text-md font-bold text-gray-900  sm:hover:border-indigo-400  hover:text-orange-500 mx-2 focus:text-blue-500  p-1 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg`}
                  >
                    LOGOUT
                  </button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className={`block lg:inline-block text-md font-bold ${pathname === '/login' ? 'text-orange-500' : 'text-gray-900'}  sm:hover:border-indigo-400  hover:text-orange-500 mx-2 focus:text-blue-500  p-1 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg`}
                    >
                      LOGIN
                    </Link>
                    <Link
                      href="/signup"
                      className={`block lg:inline-block text-md font-bold ${pathname === '/signup' ? 'text-orange-500' : 'text-gray-900'}  sm:hover:border-indigo-400  hover:text-orange-500 mx-2 focus:text-blue-500  p-1 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg`}
                    >
                      SIGNUP
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
