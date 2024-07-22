"use client";

import { useState } from "react";
import { Button } from "./button";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { deleteShortLink } from "@/actions/shortLink";

export const DeleteShortLink = ({ id }: { id: string }) => {
  const [showModal, setShowModal] = useState(false);

  const onDelete = () => {
    deleteShortLink(id);
    setShowModal(false);
  };

  return (
    <>
      <button
        className={"bg-transparent inline-flex justify-center items-center"}
        onClick={() => setShowModal(true)}
      >
        <TrashIcon className="size-6 hover:text-rose-600 inline-block" />
      </button>

      {showModal && (
        <div className="overflow-y-auto fixed top-0 right-0 left-0 z-40 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-900/[.15]">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white z-50 rounded-lg shadow">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  Delete Short Link
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  dark:hover:text-white"
                  onClick={() => setShowModal(false)}
                >
                  <XMarkIcon className="size-6" />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this short link?
                </p>
              </div>
              {/* <!-- Modal footer --> */}
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <Button
                  className="w-[100px] text-red-600 bg-white items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  onClick={onDelete}
                >
                  Delete
                </Button>
                <Button
                  className="w-[100px] ml-4"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
