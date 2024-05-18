import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import AddEntryModal from "./AddEntryModal";
import EditEntryModal from "./EditEntryModal";
import DateFilterModal from "./DateFilterModal";
import EntryTable from "./EntryTable";

const FinanceTracker = () => {
  const [entries, setEntries] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [editId, setEditId] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editType, setEditType] = useState("income");
  const [totals, setTotals] = useState({ income: 0, expenses: 0 });
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDateFilterModal, setShowDateFilterModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(20);
  const [darkMode, setDarkMode] = useState(false);

  const fetchEntries = async (startDate = null, endDate = null) => {
    try {
      setIsLoading(true);
      let url = "http://localhost:5000/entries";
      if (startDate && endDate) {
        url += `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
      }
      const res = await axios.get(url);
      setEntries(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTotals = async (startDate = null, endDate = null) => {
    try {
      setIsLoading(true);
      let url = "http://localhost:5000/totals";
      const params = [];
      if (startDate && endDate) {
        url += `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
      }
      const res = await axios.get(url);
      setTotals(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
    fetchTotals();
  }, []);

  const addEntry = async () => {
    // Input validation
    if (!description || !amount) {
      setError("Please provide a description and amount");
      return;
    }

    try {
      const newEntry = { description, amount, type };
      await axios.post("http://localhost:5000/entries", newEntry);
      fetchEntries();
      fetchTotals();
      setDescription("");
      setAmount("");
      setType("income");
      setAddModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/entries/${id}`);
      fetchEntries();
      fetchTotals();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEditing = (entry) => {
    setEditId(entry.id);
    setEditModalOpen(true);
  };

  const cancelEditing = () => {
    setEditId(null);
    setEditDescription("");
    setEditAmount("");
    setEditType("income");
    setEditModalOpen(false);
  };

  const updateEntry = async () => {
    try {
      const updatedEntry = {
        description: editDescription,
        amount: editAmount,
        type: editType,
      };
      await axios.put(`http://localhost:5000/entries/${editId}`, updatedEntry);
      fetchEntries();
      fetchTotals();
      cancelEditing();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSort = (column) => {
    const newSortOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);

    setEntries((prevEntries) =>
      [...prevEntries].sort((a, b) => {
        if (column === "date") {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return newSortOrder === "asc" ? dateA - dateB : dateB - dateA;
        }
        if (column === "amount") {
          return newSortOrder === "asc"
            ? a.amount - b.amount
            : b.amount - a.amount;
        }
        if (column === "description") {
          return newSortOrder === "asc"
            ? a.description.localeCompare(b.description)
            : b.description.localeCompare(a.description);
        }
        if (column === "type") {
          return newSortOrder === "asc"
            ? a.type.localeCompare(b.type)
            : b.type.localeCompare(a.type);
        }
        return 0;
      })
    );
  };

  const applyDateFilters = () => {
    fetchEntries(startDate, endDate);
    fetchTotals(startDate, endDate);
  };

  const filterEntriesByDate = (entries) => {
    return entries.filter((entry) => {
      const entryDate = new Date(entry.created_at);
      if (startDate && endDate) {
        return entryDate >= startDate && entryDate <= endDate;
      }
      return true;
    });
  };

  const clearDateFilters = () => {
    setStartDate(null);
    setEndDate(null);
    fetchEntries();
    fetchTotals();
  };

  const sortedEntries = [...filterEntriesByDate(entries)].sort((a, b) => {
    if (sortColumn) {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      if (sortColumn === "amount") {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      } else if (sortColumn === "created_at") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    }
    return 0;
  });
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedEntries = sortedEntries.slice(
    startIndex,
    startIndex + entriesPerPage
  );
  const handleEntriesPerPageChange = (newEntriesPerPage) => {
    setEntriesPerPage(newEntriesPerPage);
    setCurrentPage(1);
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="mx-40">
      <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white">
        <div className="flex justify-between items-center mb-6"></div>
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold">
            Total Income:{" "}
            <span className="text-green-500">${totals.income}</span>
          </h2>
          <h2 className="text-xl font-semibold">
            Total Expenses:{" "}
            <span className="text-red-500">${totals.expenses}</span>
          </h2>
        </div>
        {showDateFilterModal && (
          <DateFilterModal
            isOpen={showDateFilterModal}
            onClose={() => setShowDateFilterModal(false)}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            filterEntries={applyDateFilters}
            clearFilters={clearDateFilters}
          />
        )}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <div>
                <button
                  onClick={() => setAddModalOpen(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded shadow-md hover:bg-green-600 transition duration-300"
                >
                  Add Entry
                </button>
                <button
                  onClick={() => setShowDateFilterModal(true)}
                  className="bg-blue-500 text-white px-4 py-2 ml-2 rounded shadow-md hover:bg-blue-600 transition duration-300"
                >
                  Add Filter
                </button>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEntriesPerPageChange(10)}
                  className={`px-4 py-2 rounded shadow-md transition duration-300 ${
                    entriesPerPage === 10
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  10
                </button>
                <button
                  onClick={() => handleEntriesPerPageChange(20)}
                  className={`px-4 py-2 rounded shadow-md transition duration-300 ${
                    entriesPerPage === 20
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  20
                </button>
                <button
                  onClick={() => handleEntriesPerPageChange(30)}
                  className={`px-4 py-2 rounded shadow-md transition duration-300 ${
                    entriesPerPage === 30
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  30
                </button>
              </div>
            </div>
            <EntryTable
              entries={paginatedEntries}
              editId={editId}
              editDescription={editDescription}
              setEditDescription={setEditDescription}
              editAmount={editAmount}
              setEditAmount={setEditAmount}
              editType={editType}
              setEditType={setEditType}
              startEditing={startEditing}
              deleteEntry={deleteEntry}
              sortColumn={sortColumn}
              sortOrder={sortOrder}
              handleSort={handleSort}
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-blue-700 text-white px-4 py-2 rounded shadow-md hover:bg-blue-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-4 py-2">{`Page ${currentPage}`}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(sortedEntries.length / entriesPerPage)
                }
                className="bg-blue-700 text-white px-4 py-2 rounded shadow-md hover:bg-blue-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </>
        )}
        <AddEntryModal
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          addEntry={addEntry}
          description={description}
          setDescription={setDescription}
          amount={amount}
          setAmount={setAmount}
          type={type}
          setType={setType}
        />
        <EditEntryModal
          isOpen={isEditModalOpen}
          onClose={cancelEditing}
          updateEntry={updateEntry}
          editDescription={editDescription}
          setEditDescription={setEditDescription}
          editAmount={editAmount}
          setEditAmount={setEditAmount}
          editType={editType}
          setEditType={setEditType}
        />
      </div>
    </div>
  );
};

export default FinanceTracker;
