'use client';

import React from 'react';
import axiosInstance from '@/axios';
import { useRouter } from 'next/navigation';
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
    } catch (error) {}
  };

  return (
    <form onSubmit={submitFunc}>
      <div className="grid place-items-center gap-12 mt-12 p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <p className="text-2xl font-bold">Account</p>
        <p className="font-semibold text-sm text-gray-600 pb-1 block">Email: {user?.email}</p>
        <p className="font-semibold text-sm text-gray-600 pb-1 block">Username: {user?.username}</p>
        {user?.hashedPassword && (
          <>
            <div className="w-full text-center">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">Old Password</label>
              <input
                name="old password"
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
              />
            </div>
            <div className="w-full text-center">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">New Password</label>
              <input
                name="new password"
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                  setPasswordValid(passwordRegex.test(e.target.value));
                }}
              />
            </div>
          </>
        )}
        {!passwordValid && (
          <p className="text-red-500 text-sm">
            Password must be at least 8 characters and contain both letters and numbers.
          </p>
        )}
        {success && <p className="text-green-500 text-sm">Successfully changed password</p>}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          change password
        </button>
      </div>
    </form>
  );
};

export default Account;
