import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';

interface ModalProps {
  buttonName: string;
  children: React.ReactNode;
}

export const Modal = ({ buttonName, children }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.modal === buttonName) {
      setIsOpen(true);
    }
  }, [router.query.modal, buttonName]);

  const openModal = () => {
    setIsOpen(true);
    void router.push({
      pathname: router.pathname,
      query: {
        modal: buttonName,
        ...(router.query.id && { id: router.query.id })
      }
    });
  };

  const closeModal = () => {
    setIsOpen(false);
    void router.push({
      pathname: router.pathname,
      query: {
        ...(router.query.id && { id: router.query.id })
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-base font-medium text-white"
      >
        {buttonName}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
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
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
