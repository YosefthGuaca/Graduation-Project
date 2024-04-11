'use client';

import React, { useState, useEffect } from 'react';
import { Website } from '@prisma/client';
import axiosInstance from '@/axios';
import CreateWebsiteModal from './CreateWebsiteModal';

const Websites = () => {
  const [websites, setWebsites] = useState<Website[]>([]);

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
    <div className="container px-4 my-12 mx-auto">
      <h1 className="text-4xl font-bold">Your Websites</h1>
      <ul className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {websites.map((website) => (
          <li key={website.id} className="border-2 hover:border-blue-400 rounded-lg p-12 text-center">
            <p className="mb-4 bold text-3xl">{website.title}</p>
            <a
              href={`http://localhost:4000/u/${website.slug}`}
              className={`block border-2 px-2 lg:inline-block text-md font-bold text-orange-500 sm:hover:border-indigo-400  hover:text-orange-500 mx-2 focus:text-blue-500  p-1 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg`}
              target="_blank"
            >
              published page
            </a>
            <a
              href={`/home/u/${website.slug}`}
              className={`block border-2 px-2 lg:inline-block text-md font-bold text-orange-500 sm:hover:border-indigo-400  hover:text-orange-500 mx-2 focus:text-blue-500  p-1 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg`}
            >
              editing page
            </a>
          </li>
        ))}
      </ul>
      <CreateWebsiteModal />
    </div>
  );
};

export default Websites;
