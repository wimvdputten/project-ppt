import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {PaperClipIcon} from '@heroicons/react/solid'
import {useQuery} from "@apollo/client";
import EmployeeQuery from "../graphql/queries/EmployeeQuery";
import AddCertificate from "./AddCertificate";
import CertificateDetails from "./CertificateDetails";

const EmployeeDetails = () => {
  let id: any;
  ({id} = useParams());

  const {data: employeeData, loading} = useQuery(EmployeeQuery, {variables: {id: parseInt(id)}});
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openCertificate, setOpenCertificate] = useState(0)

  if (!employeeData || loading){
    return (<div>loading...</div>)
  }
  const {employee} = employeeData;


  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Medewerker Informatie</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Persoon details en certificaten.</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Naam</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{employee.firstName} {employee.lastName}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Functie</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{employee.function}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{employee.email}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Adres</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{employee.adres} {employee.houseNumber}, {employee.postalCode}, {employee.city}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Certificaten</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                {employee.certificates.map((certificate: any) => (
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm" key={certificate.id}>
                    <div className="w-0 flex-1 flex items-center">
                      <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true"/>
                      <span className="ml-2 flex-1 w-0 truncate">{certificate.title}</span>
                    </div>
                    <CertificateDetails id={parseInt(certificate.id)} title={certificate.title} type={certificate.type} location={certificate.location} expirationDate={certificate.expirationDate} achievDate={certificate.achievDate} open={openCertificate === parseInt(certificate.id)} onClose={ () => {setOpenCertificate(0)}} />
                    <div className="ml-4 flex-shrink-0">
                      <a onClick={() => {setOpenCertificate(parseInt(certificate.id))}} className="font-medium text-indigo-600 hover:text-indigo-500">
                        Details
                      </a>
                    </div>
                  </li>
                  )
                )}

                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <AddCertificate id={parseInt(id)} open={isModalOpen} onClose={ () => {setIsModalOpen(false)}} />
                  <div className="ml-4 flex-shrink-0 button">
                    <a onClick={() => {setIsModalOpen(true)}} className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                      Toevoegen
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>

  );
};

export default EmployeeDetails;
