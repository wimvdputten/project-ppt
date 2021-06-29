import React from 'react';
import {PencilIcon} from '@heroicons/react/solid'
import {Link} from "react-router-dom";

const VakantieHeader = () => {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Vakantie
          </h2>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <span className="hidden sm:block">
                <Link to="/vakanties/add">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true"/>
            Vakantie
          </button>
        </Link>
        </span>
        </div>
      </div>
    </div>

  );
};

export default VakantieHeader;
