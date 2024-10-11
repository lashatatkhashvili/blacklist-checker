"use client";

import { IBlacklistResult } from "@/types";

interface PhoneTableProps {
  results: IBlacklistResult[];
}

const PhoneTable: React.FC<PhoneTableProps> = ({ results }) => {
  return (
    <table className="min-w-full">
      <thead>
        <tr className="bg-[#F2F4F7]">
          <th className="py-2 px-4 rounded-l-[20px] border-gray-300 text-left">
            Order
          </th>
          <th className="py-2 px-2 border-gray-300 text-left">Phone Number</th>
          <th className="py-2 px-1 rounded-r-[20px] border-gray-300 text-left">
            Message
          </th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => (
          <tr key={index}>
            <td className="px-4 py-[12px] border-b border-b-[#E7E9EB]">
              {index + 1}
            </td>
            <td className="px-4 py-[12px] border-b border-b-[#E7E9EB]">
              {result?.phoneNumber}
            </td>
            <td
              className={`px-4 py-[12px] border-b border-b-[#E7E9EB] ${
                result?.message === "Good" ? "text-[#0B9F61]" : ""
              }`}
            >
              {result?.message}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PhoneTable;
