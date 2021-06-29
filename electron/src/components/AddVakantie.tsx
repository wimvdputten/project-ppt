import React, {useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import AddEmployeeMutation from "../graphql/mutations/AddEmployeeMutation";
import {useHistory} from "react-router-dom";
import EmployeesQuery from "../graphql/queries/Employees";
import AddVacationMutation from "../graphql/mutations/AddVacationMutation";
import AddCertificateMutation from "../graphql/mutations/AddCertificateMutation";
import EmployeeQuery from "../graphql/queries/EmployeeQuery";

const AddVakantie = () => {
  const history = useHistory();
  const {data: employees} = useQuery(EmployeesQuery);

  const [addVacation, {error}] = useMutation(AddVacationMutation, {refetchQueries: [{query: EmployeesQuery}]});

  const [formData, setFormData] = useState({
    employeeId: 0,
    description: '',
    startDate: '',
    endDate: '',
  });



  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addVacation({variables: formData}).then(() => {
      history.push('/vakantie')
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
                          Werknemer
                        </label>
                        <select name="employees" value={formData.employeeId} onChange={event => setFormData(prevState => ({...prevState, employeeId: parseInt(event.target.value)}))}>
                          {employees && employees.employees.map((employee: any) => (
                            <option value={employee.id}>
                              {employee.firstName + " " + employee.lastName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-6">
                        <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">
                          Omschrijving
                        </label>
                        <input
                          value={formData.description}
                          onChange={event => setFormData(prevState => ({...prevState, description: event.target.value}))}
                          type="text"
                          name="email_address"
                          id="email_address"
                          autoComplete="email"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>


                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          Start datum
                        </label>
                        <input
                          value={formData.startDate}
                          onChange={event => setFormData(prevState => ({...prevState, startDate: event.target.value}))}
                          type="date"
                          name="city"
                          id="city"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">
                          Eind datum
                        </label>
                        <input
                          value={formData.endDate}
                          onChange={event => setFormData(prevState => ({...prevState, endDate: event.target.value}))}
                          type="date"
                          name="postal_code"
                          id="postal_code"
                          autoComplete="postal-code"
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

export default AddVakantie;
