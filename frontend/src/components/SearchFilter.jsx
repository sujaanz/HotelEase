import React from 'react';

function SearchFilter({ searchTerm, setSearchTerm, filterStatus, setFilterStatus }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="w-full md:w-1/2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search rooms by name..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="w-full md:w-1/4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="Booked">Booked</option>
        </select>
      </div>
    </div>
  );
}

export default SearchFilter;