import React from 'react';

export function TableHeader() {
  return (
    <thead className="bg-[#173A5E]">
      <tr>
        <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">
          <span className="lg:hidden">Lease Details</span>
          <span className="hidden lg:inline">Lease Name/ID</span>
        </th>
        <th scope="col" className="hidden lg:table-cell px-4 py-3 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">
          Type
        </th>
        <th scope="col" className="hidden lg:table-cell px-4 py-3 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">
          Description
        </th>
        <th scope="col" className="hidden lg:table-cell px-4 py-3 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">
          Start Date
        </th>
        <th scope="col" className="hidden lg:table-cell px-4 py-3 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">
          End Date
        </th>
        <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">
          Days Left
        </th>
        <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">
          Status
        </th>
        <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">
          Doc
        </th>
      </tr>
    </thead>
  );
}