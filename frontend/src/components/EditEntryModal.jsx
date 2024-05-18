import React from 'react';

const EditEntryModal = ({
  isOpen,
  onClose,
  updateEntry,
  editDescription,
  setEditDescription,
  editAmount,
  setEditAmount,
  editType,
  setEditType,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded text-white w-96">
        <h2 className="text-xl font-bold mb-4">Edit Entry</h2>
        <input
          type="text"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="Description"
          className="border border-gray-700 p-2 mb-4 w-full bg-gray-900 text-white focus:outline-none focus:ring focus:border-blue-500"
        />
        <input
          type="number"
          value={editAmount}
          onChange={(e) => setEditAmount(e.target.value)}
          placeholder="Amount"
          className="border border-gray-700 p-2 mb-4 w-full bg-gray-900 text-white focus:outline-none focus:ring focus:border-blue-500"
        />
        <div className="mb-4">
          <span className="text-white mr-2">Type:</span>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="income"
              checked={editType === 'income'}
              onChange={(e) => setEditType(e.target.value)}
              className="form-radio h-5 w-5 text-green-500"
            />
            <span className="ml-2 text-white">Income</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input
              type="radio"
              value="expense"
              checked={editType === 'expense'}
              onChange={(e) => setEditType(e.target.value)}
              className="form-radio h-5 w-5 text-red-500"
            />
            <span className="ml-2 text-white">Expense</span>
          </label>
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-600 text-white py-2 px-4 mr-2 rounded focus:outline-none hover:bg-gray-700">
            Cancel
          </button>
          <button onClick={updateEntry} className="bg-green-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-green-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEntryModal;
