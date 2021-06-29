import React, {useState} from 'react';
import {Fragment, useRef} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {useMutation} from "@apollo/client";
import EmployeesQuery from "../graphql/queries/Employees";
import EmployeeQuery from "../graphql/queries/EmployeeQuery";
import AddCertificateMutation from '../graphql/mutations/AddCertificateMutation';
import {PencilIcon} from "@heroicons/react/solid";

export default function AddCertificate({id, open, onClose}: {id: number, open: boolean, onClose: () => void }) {
  const [addCertificate] = useMutation(AddCertificateMutation, {refetchQueries: [{query: EmployeesQuery}, {query: EmployeeQuery, variables: {id}}]});
  const [formData, setFormData] = useState({
    employeeId: id,
    type: '',
    title: '',
    location: '',
    achievDate: '',
    expirationDate: ''
  });

  const cancelButtonRef = useRef(null)

  function onSubmit(){
    addCertificate({variables: formData}).then(()=> {
      onClose();
    })
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div
                    className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                    <PencilIcon className="h-6 w-6 text-gray-600" aria-hidden="true"/>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Voeg certificaat toe
                    </Dialog.Title>
                    <div className="mt-2">


                      {/*Content*/}
                      <form action="#" onSubmit={(event => onSubmit(event))}>
                        <div className="sm:overflow-hidden">
                          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                            <div className="px-4 py-5 bg-white sm:p-6">
                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    Type
                                  </label>
                                  <input
                                    value={formData.type}
                                    onChange={event => setFormData(prevState => ({...prevState, type: event.target.value}))}
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    autoComplete="given-name"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                                    Title
                                  </label>
                                  <input
                                    value={formData.title}
                                    onChange={event => setFormData(prevState => ({...prevState, title: event.target.value}))}
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    autoComplete="family-name"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  />
                                </div>

                                <div className="col-span-6 sm:col-span-4">
                                  <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">
                                    Locatie
                                  </label>
                                  <input
                                    value={formData.location}
                                    onChange={event => setFormData(prevState => ({...prevState, location: event.target.value}))}
                                    type="text"
                                    name="email_address"
                                    id="email_address"
                                    autoComplete="email"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  />
                                </div>

                                <div className="col-span-6">
                                  <label htmlFor="street_address" className="block text-sm font-medium text-gray-700">
                                    Behaalde datum
                                  </label>
                                  <input
                                    value={formData.achievDate}
                                    onChange={event => setFormData(prevState => ({...prevState, achievDate: event.target.value}))}
                                    type="date"
                                    name="street_address"
                                    id="street_address"
                                    autoComplete="street-address"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  />
                                </div>

                                <div className="col-span-6">
                                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                    Verloop datum
                                  </label>
                                  <input
                                    value={formData.expirationDate}
                                    onChange={event => setFormData(prevState => ({...prevState, expirationDate: event.target.value}))}
                                    type="date"
                                    name="street_address"
                                    id="street_address"
                                    autoComplete="street-address"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>
                            </div>

                          </div>

                        </div>
                      </form>








                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => onSubmit()}
                >
                  Voeg toe
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => onClose()}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>

          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
