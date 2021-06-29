import React, {useState} from 'react';
import {LockClosedIcon} from '@heroicons/react/solid';
import {useMutation} from '@apollo/client';
import {ipcRenderer} from 'electron';
import jwtDecode from 'jwt-decode';
import {useHistory} from 'react-router-dom';
import LoginMutation from '../graphql/mutations/LoginMutation';
import icon from '../../assets/containers.svg';

const Login = () => {
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [loginMutation, {}] = useMutation(LoginMutation);
  const history = useHistory();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      history.push('/')
    }
  })


  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const variables = {userName, password};
    loginMutation({variables})
      .then(
        ({
           data: {
             login: {token},
           },
         }) => {
          if (token) {
            const {
              user: {name, admin},
            }: any = jwtDecode(token);

            // bad practice :(
            localStorage.setItem('name', name);
            localStorage.setItem('admin', admin);
            localStorage.setItem('token', token);
            ipcRenderer.send('set:login', token);
          }
          return token;
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src={icon} alt="Workflow"/>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" onSubmit={(event => onSubmit(event))}>
          <input type="hidden" name="remember" defaultValue="true"/>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                value={userName}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
                id="username"
                name="username"
                type="username"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {/* <div className="flex items-center justify-between"> */}
          {/*    <div className="flex items-center"> */}
          {/*        <input */}
          {/*            id="remember_me" */}
          {/*            name="remember_me" */}
          {/*            type="checkbox" */}
          {/*            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" */}
          {/*        /> */}
          {/*        <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900"> */}
          {/*            Remember me */}
          {/*        </label> */}
          {/*    </div> */}
          {/* </div> */}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
