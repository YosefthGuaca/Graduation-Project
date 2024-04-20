'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import axiosInstance from '@/axios';

const CreateWebsiteModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');

  const submitFunc = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosInstance.request({
        url: 'websites',
        method: 'POST',
        data: JSON.stringify({
          title,
          slug,
        }),
      });
      setIsOpen(false);
      window.location.href = `/home/u/${slug}/templates`;
    } catch (error) {
      alert('Failed to create website');
    }
  };

  return (
    <>
<button
  onClick={() => setIsOpen(true)}
  className="btn-animate absolute bottom-4 right-4 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 active:bg-orange-700 text-white font-bold text-lg tracking-wider shadow-lg px-6 py-3 rounded-full w-44 h-44 mt-8 transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none"
>
  Create New Website
</button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Create new website
                  </Dialog.Title>
                  <form className="pt-7" onSubmit={submitFunc}>
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">Title</label>
                    <input
                      name="title"
                      type="text"
                      className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">Slug</label>
                    <input
                      name="slug"
                      type="text"
                      className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                    >
                      <span className="inline-block mr-2">Create</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4 inline-block"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreateWebsiteModal;
