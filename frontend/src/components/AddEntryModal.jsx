const AddEntryModal = ({ isOpen, onClose, addEntry, description, setDescription, amount, setAmount, type, setType }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) {
      alert("Please fill in all the fields");
      return;
    }
    addEntry();
    onClose(); // Close modal after adding entry
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Add New Entry</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 dark:text-gray-300">Type:</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    checked={type === "income"}
                    onChange={() => setType("income")}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">Incoming</span>
                </label>
                <label className="flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    checked={type === "expense"}
                    onChange={() => setType("expense")}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">Outgoing</span>
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6 space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded shadow hover:bg-gray-400 dark:hover:bg-gray-700 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-300"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEntryModal;
