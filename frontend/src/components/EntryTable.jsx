import React from "react";
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";

const EntryTable = ({
  entries,
  editId,
  editDescription,
  setEditDescription,
  editAmount,
  setEditAmount,
  editType,
  setEditType,
  startEditing,
  deleteEntry,
  saveEdit,
  cancelEdit,
  sortColumn,
  sortOrder,
  handleSort,
}) => {
  const getTypeIcon = (type) => {
    if (type === "expense") {
      return "-";
    } else if (type === "income") {
      return "+";
    }
    return "";
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full border-collapse bg-white dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-left">
            <th
              className="px-4 py-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
              onClick={() => handleSort("type")}
            >
              Type
              {sortColumn === "type" && (
                <span className="ml-2">
                  {sortOrder === "asc" ? (
                    <ChevronUpIcon className="w-4 h-4 inline" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4 inline" />
                  )}
                </span>
              )}
            </th>
            <th
              className="px-4 py-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
              onClick={() => handleSort("amount")}
            >
              Amount
              {sortColumn === "amount" && (
                <span className="ml-2">
                  {sortOrder === "asc" ? (
                    <ChevronUpIcon className="w-4 h-4 inline" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4 inline" />
                  )}
                </span>
              )}
            </th>
            <th
              className="px-4 py-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
              onClick={() => handleSort("description")}
            >
              Description
              {sortColumn === "description" && (
                <span className="ml-2">
                  {sortOrder === "asc" ? (
                    <ChevronUpIcon className="w-4 h-4 inline" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4 inline" />
                  )}
                </span>
              )}
            </th>
            <th
              className="px-4 py-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
              onClick={() => handleSort("date")}
            >
              Date
              {sortColumn === "date" && (
                <span className="ml-2">
                  {sortOrder === "asc" ? (
                    <ChevronUpIcon className="w-4 h-4 inline" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4 inline" />
                  )}
                </span>
              )}
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr
              key={entry.id}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
            >
              <td className="px-4 py-2 font-medium dark:text-gray-300">
                {getTypeIcon(editId === entry.id ? editType : entry.type)}
              </td>
              <td className="px-4 py-2 dark:text-gray-300">{entry.amount}</td>
              <td className="px-4 py-2 dark:text-gray-300">
                {entry.description}
              </td>
              <td className="px-4 py-2 dark:text-gray-300">
                {new Date(entry.created_at).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="px-4 py-2 flex items-center space-x-2">
                {editId === entry.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(entry.id)}
                      className="text-green-500 hover:text-green-700 transition duration-300 dark:text-green-400 dark:hover:text-green-500"
                    >
                      <CheckIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => cancelEdit()}
                      className="text-red-500 hover:text-red-700 transition duration-300 dark:text-red-400 dark:hover:text-red-500"
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditing(entry)}
                      className="text-yellow-500 hover:text-yellow-700 transition duration-300 dark:text-yellow-400 dark:hover:text-yellow-500"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="text-red-500 hover:text-red-700 transition duration-300 dark:text-red-400 dark:hover:text-red-500"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntryTable;
