'use client';

import React from 'react';
import axiosInstance from '@/axios';
import { User } from '@prisma/client';

type Props = {};

const Account = (props: Props) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [passwordValid, setPasswordValid] = React.useState(true);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    const func = async () => {
      try {
        const response = await axiosInstance.request({
          url: 'users/me',
          method: 'GET',
        });
        if (response.status === 200 && response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.log('Not logged in');
      }
    };
    func();
  }, []);

  const submitFunc = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordValid) {
      return;
    }
    try {
      const response = await axiosInstance.request({
        url: 'users/password',
        method: 'PATCH',
        data: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });
      setSuccess(true);
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <form onSubmit={submitFunc} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
          <p className="text-2xl font-bold">Account</p>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Email
            </label>
            <p className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Username
            </label>
            <p className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3">
              {user?.username}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-old-password">
              Old Password
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-old-password"
              type="password"
              placeholder="******************"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-new-password">
              New Password
            </label>
            <input
              className={`appearance-none block w-full bg-white text-gray-700 border ${passwordValid ? 'border-gray-200' : 'border-red-500'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              id="grid-new-password"
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setPasswordValid(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(e.target.value));
              }}
            />
            {!passwordValid && (
              <p className="text-red-500 text-xs italic">
                Password must be at least 8 characters and contain both letters and numbers.
              </p>
            )}
          </div>
        </div>

        {success && (
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <p className="text-green-500 text-xs italic">Successfully changed password</p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap -mx-3 mt-6">
          <div className="w-full px-3">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Change Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Account;
