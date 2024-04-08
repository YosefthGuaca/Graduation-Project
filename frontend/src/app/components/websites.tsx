'use client';

import React, { useState, useEffect } from 'react';
import axiosInstance from '@/axios';
import CreateWebsiteModal from './CreateWebsiteModal';

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
    <div className="container px-4 my-12 mx-auto">
      <h1 className="text-4xl font-bold">Your Websites</h1>
      <ul className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {websites.map((website) => (
          <li key={website.id}>
            <a
              href={`/home/u/${website.slug}`}
              className="block border-2 hover:border-blue-400 rounded-lg p-12 text-center"
            >
              {website.title}
            </a>
          </li>
        ))}
      </ul>
      <CreateWebsiteModal />
    </div>
  );
};

export default Websites;
