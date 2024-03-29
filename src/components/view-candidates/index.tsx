import { Dialog, Transition } from '@headlessui/react';
import { Table } from 'components/view-candidates/table';
import { type JobWithCandidates } from 'next-auth';
import { Fragment, useState } from 'react';

export const ViewCandidates = ({
  candidates
}: {
  candidates: JobWithCandidates['applicants'];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  if (candidates.length === 0)
    return <span className="whitespace-nowrap">No candidates</span>;

  return (
    <>
      <button
        onClick={openModal}
        className="text-gray-600 underline hover:text-gray-900"
      >
        View candidates
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative  z-10" onClose={closeModal}>
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
                <Table candidates={candidates} />
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
