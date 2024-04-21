'use client';

import React, { useState, useEffect } from 'react';
import axiosInstance from '@/axios';
import CreateWebsiteModal from './CreateWebsiteModal';
import NavbarAccount from './NavbarAccount';

const Websites = () => {
  const [websites, setWebsites] = useState<{ id: number; slug: string; title: string }[]>([]);

  useEffect(() => {
    async function fetchWebsites() {
      try {
        const response = await axiosInstance.get('/websites');
        setWebsites(response.data);
      } catch (error) {
        console.error('Error fetching websites:', error);
      }
    }
    fetchWebsites();
  }, []);

  return (
    <div>
      <NavbarAccount />
      <div className="container px-4 my-12 mx-auto">
        <h1 className="text-7xl font-bold">Manage portfolios</h1>
        <br></br>
        <h4 className="text-2xl font-bold">This are your last portfolio pages.</h4>
        <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websites.map((website) => (
            <li
              key={website.id}
              className="bg-white border border-gray-200 hover:shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out"
            >
              <p className="mb-4 text-2xl font-semibold text-gray-900">{website.title}</p>
              <a
                href={`http://localhost:4000/u/${website.slug}`}
                className={`block border-2 px-2 lg:inline-block text-md font-bold text-orange-500 sm:hover:border-indigo-400  hover:text-orange-500 mx-2 focus:text-blue-500  p-1 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg`}
                target="_blank"
              >
                Published Page
              </a>
              <a
                href={`/home/u/${website.slug}`}
                className={`block border-2 px-2 lg:inline-block text-md font-bold text-orange-500 sm:hover:border-indigo-400  hover:text-orange-500 mx-2 focus:text-blue-500  p-1 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg`}
              >
                Editing Page
              </a>
            </li>
          ))}
        </ul>
        {/* <img src="UX SHOW GO 4.png" alt="" /> */}
        <CreateWebsiteModal />
      </div>
    </div>
  );
};
export default Websites;
