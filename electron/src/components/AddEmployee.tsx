import React, {useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import AddEmployeeMutation from "../graphql/mutations/AddEmployeeMutation";
import {useHistory} from "react-router-dom";
import EmployeesQuery from "../graphql/queries/Employees";

const AddEmployee = () => {
  const history = useHistory();
  const {data: employees} = useQuery(EmployeesQuery);


  const [addEmployee, {error}] = useMutation(AddEmployeeMutation, {refetchQueries: [{query: EmployeesQuery}]});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    adres: '',
    city: '',
    postalCode: '',
    houseNumber: '',
    function: ''
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addEmployee({variables: formData}).then(() => {
      history.push('/medewerkers')
    }).catch(() => {
    })
  }


  return (
    <div>
      <div>
        <div className="md:grid md:gap-6">
          {error ? <span>Error: {error.message}</span> : ''}
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" onSubmit={(event => onSubmit(event))}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                          Voornaam
                        </label>
                        <input
                          value={formData.firstName}
                          onChange={event => setFormData(prevState => ({...prevState, firstName: event.target.value}))}
                          type="text"
                          name="first_name"
                          id="first_name"
                          autoComplete="given-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                          Achternaam
                        </label>
                        <input
                          value={formData.lastName}
                          onChange={event => setFormData(prevState => ({...prevState, lastName: event.target.value}))}
                          type="text"
                          name="last_name"
                          id="last_name"
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">
                          Email adress
                        </label>
                        <input
                          value={formData.email}
                          onChange={event => setFormData(prevState => ({...prevState, email: event.target.value}))}
                          type="text"
                          name="email_address"
                          id="email_address"
                          autoComplete="email"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="street_address" className="block text-sm font-medium text-gray-700">
                          Adres
                        </label>
                        <input
                          value={formData.adres}
                          onChange={event => setFormData(prevState => ({...prevState, adres: event.target.value}))}
                          type="text"
                          name="street_address"
                          id="street_address"
                          autoComplete="street-address"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          Plaatsnaam
                        </label>
                        <input
                          value={formData.city}
                          onChange={event => setFormData(prevState => ({...prevState, city: event.target.value}))}
                          type="text"
                          name="city"
                          id="city"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">
                          Postcode
                        </label>
                        <input
                          value={formData.postalCode}
                          onChange={event => setFormData(prevState => ({...prevState, postalCode: event.target.value}))}
                          type="text"
                          name="postal_code"
                          id="postal_code"
                          autoComplete="postal-code"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="house_number" className="block text-sm font-medium text-gray-700">
                          Huisnummer
                        </label>
                        <input
                          value={formData.houseNumber}
                          onChange={event => setFormData(prevState => ({
                            ...prevState,
                            houseNumber: event.target.value
                          }))}
                          type="text"
                          name="house_number"
                          id="house_number"
                          autoComplete="number"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="function" className="block text-sm font-medium text-gray-700">
                          Functie
                        </label>
                        <input
                          value={formData.function}
                          onChange={event => setFormData(prevState => ({
                            ...prevState,
                            function: event.target.value
                          }))}
                          type="text"
                          name="function"
                          id="function"
                          autoComplete="function"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
