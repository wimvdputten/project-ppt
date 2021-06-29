import {Fragment} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import { MenuIcon, XIcon} from '@heroicons/react/outline'
import React from 'react'
import {Link, useHistory} from "react-router-dom";
import {UserCircleIcon} from "@heroicons/react/solid";

const profile = ['Sign out']

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const Shell = ({children, selectedMenu, headerComponent}: any) => {
  const history = useHistory();
  const navigation = ['Dashboard', 'Medewerkers', 'Voertuigen', 'Vakantie']

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token, ': token')
    if (!token) {
      history.push('/login')
    }
  }, [history, localStorage])

  function logout(){
    localStorage.clear();
    history.push('/login')
  }

  React.useEffect(() => {

    const isAdmin = localStorage.getItem('admin');
    if (isAdmin) {
      navigation.push('Admin')
    }
  })

  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800">
        {({open}) => (
          <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) =>
                        item === selectedMenu ? (
                          <Fragment key={item}>
                            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                            <Link to={`/${item.toLocaleLowerCase()}`} href="#" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                              {item}
                            </Link>
                          </Fragment>
                        ) : (
                          <Link
                            to={`/${item.toLocaleLowerCase()}`}
                            key={item}
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          >
                            {item}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/*<button*/}
                    {/*  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">*/}
                    {/*  <span className="sr-only">View notifications</span>*/}
                    {/*  <BellIcon className="h-6 w-6" aria-hidden="true"/>*/}
                    {/*</button>*/}

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      {({open}) => (
                        <div>
                          <div>
                            <Menu.Button
                              className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                              <span className="sr-only">Open user menu</span>
                              <UserCircleIcon className="h-8 w-8 rounded-full text-grey-600" aria-hidden="true"/>
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              {profile.map((item) => (
                                <Menu.Item key={item}>
                                  {({active}) => (
                                    <a
                                      onClick={ () => logout()}
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      {item}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </div>
                      )}
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button
                    className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true"/>
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item, itemIdx) =>
                  itemIdx === 0 ? (
                    <Fragment key={item}>
                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
                        {item}
                      </a>
                    </Fragment>
                  ) : (
                    <a
                      key={item}
                      href="#"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <UserCircleIcon className="h-8 w-8 rounded-full text-grey-600" aria-hidden="true"/>
                  </div>
                  {/*<button*/}
                  {/*  className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">*/}
                  {/*  <span className="sr-only">View notifications</span>*/}
                  {/*  <BellIcon className="h-6 w-6" aria-hidden="true"/>*/}
                  {/*</button>*/}
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {profile.map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>

      <header className="bg-white shadow">
        {headerComponent}
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            {children? children : <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"/>}
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  )
}

export default Shell;
