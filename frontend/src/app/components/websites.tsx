'use client';

import React, { useState, useEffect } from 'react';
import { Website } from '@prisma/client';
import axiosInstance from '@/axios';

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
    <div>
      <h1>Websites</h1>
      <ul>
        {websites.map((website) => (
          <li key={website.id}>
            <a href={`/home/u/${website.slug}`}>{website.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Websites;
