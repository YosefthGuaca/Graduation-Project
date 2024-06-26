'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import axiosInstance from '@/axios';
import Image from 'next/image';

type Props = { websiteSlug: string; pageSlug: string };

const TemplateLinkModal = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { websiteSlug, pageSlug } = props;

  useEffect(() => {
    const func = async () => {
      try {
        const response = await axiosInstance.get(`websites/${websiteSlug}/pages/${pageSlug}`);
        if (!response.data.content) {
          setIsOpen(true);
        }
      } catch (error) {}
    };
    func();
  }, [websiteSlug, pageSlug]);

  if (!isOpen) return null;

  return (
    <>
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
                    Go to template list
                  </Dialog.Title>
                  <a
                    href={`/home/u/${websiteSlug}/templates`}
                    className="block border-2 hover:border-blue-400 rounded-lg p-12 text-center"
                  >
                    <Image
                      src={'/defaultTemplate.png'}
                      alt="defaultTemplate"
                      width={240}
                      height={67}
                      className="mx-auto mb-4"
                    />
                    <p>Click here to go to the template list</p>
                  </a>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default TemplateLinkModal;
