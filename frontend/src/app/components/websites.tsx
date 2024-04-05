'use client';

import React, { useState, useEffect } from 'react';
import { Website } from '@prisma/client';
import axiosInstance from '@/axios';
import NewWebsiteModal from './CreateWebsiteModal';

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
    <div className="container px-4 my-12">
      <h1 className="text-4xl font-bold">Your Websites</h1>
      <ul className="mt-24">
        {websites.map((website) => (
          <li key={website.id}>
            <a href={`/home/u/${website.slug}`} className="border-2 hover:border-blue-400 rounded-lg p-12 text-center">
              {website.title}
            </a>
          </li>
        ))}
      </ul>
      <NewWebsiteModal />
    </div>
  );
};

export default Websites;
