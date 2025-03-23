import React from "react";

const AddGroupUserModal = ({ isOpen, onClose, onSubmit, defaultValue = "", handleNameChange }) => {
  const handleChange = (e) => {
    handleNameChange(e.target.value);
  }
  const handleSubmit = () => {
    onSubmit();
    onClose();
  }
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Enter Details</h2>
        <input
          type="text"
          value={defaultValue}
          onChange={handleChange}
          placeholder="Type here..."
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleSubmit}
            disabled={!defaultValue}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGroupUserModal;
