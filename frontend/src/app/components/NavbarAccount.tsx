'use client'
import React from 'react';
import axiosInstance from '@/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';



type NavItemProps = {
  label: string;
  link: string;
};

const logout = async () => {
  try {
    await axiosInstance.post('/users/logout');
    window.location.reload();
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

const NavItem: React.FC<NavItemProps> = ({ label, link }) => (
  <a href={link} className="flex justify-center items-center text-white px-3 py-3 rounded-full text-sm font-medium hover:bg-orange-500 transition-colors duration-300" style={{ width: '90px', height: '90px' }}>
    {label}
  </a>
);

const NavbarAccount: React.FC = () => {
  return (
    <nav className="bg-black">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between" style={{ height: '120px' }}> 
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img className="block lg:hidden h-8 w-auto" src="/UxShowGoDark.png" alt="Logo" />
              <img className="hidden lg:block h-8 w-auto" src="/UxShowGoDark.png" alt="Logo" />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-6">  
                <NavItem label="Home" link="/" />
                <NavItem label="About" link="/about" />
                <NavItem label="Account" link="/UserAccount" />
              </div>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="flex justify-center items-center text-white rounded-full text-sm font-medium hover:bg-orange-500 transition-colors duration-300"
            style={{ width: '90px', height: '90px', padding: '28px' }}> <FontAwesomeIcon icon={faSignOutAlt} /> 
            LOGOUT
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAccount;
