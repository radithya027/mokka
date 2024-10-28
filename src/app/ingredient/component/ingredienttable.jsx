"use client";

import React, { useState } from "react";
import { PiClockCountdownLight } from "react-icons/pi"; // Import your icons if needed
import { AiOutlineEdit } from "react-icons/ai";

const IngredientTable = ({ title, loading }) => {
  const tableHead = ["Ingredient", "Category", "Price", "Stock", "Actions"];
  const [ingredients, setIngredients] = useState([
    { id: 1, name: "Beef", category: "Meat", price: "$3.00", stock: "20" },
    { id: 2, name: "Cheese", category: "Dairy", price: "$1.00", stock: "15" },
    { id: 3, name: "Lettuce", category: "Vegetable", price: "$0.50", stock: "30" },
    { id: 4, name: "Tomato", category: "Vegetable", price: "$0.75", stock: "25" },
    { id: 5, name: "Pepperoni", category: "Meat", price: "$1.50", stock: "10" },
    { id: 6, name: "Pasta", category: "Grain", price: "$2.50", stock: "50" },
    { id: 7, name: "Chicken", category: "Meat", price: "$2.00", stock: "15" },
    { id: 8, name: "Ham", category: "Meat", price: "$1.50", stock: "12" },
    { id: 9, name: "Croutons", category: "Bakery", price: "$0.50", stock: "40" },
    { id: 10, name: "Alfredo Sauce", category: "Condiment", price: "$1.00", stock: "5 liters" },
  ]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [newItem, setNewItem] = useState({ name: "", category: "", price: "", stock: "" });

  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(ingredients.length / itemsPerPage);

  // Calculate the current ingredients to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentIngredients = ingredients.slice(startIndex, startIndex + itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditItem = (item) => {
    setCurrentItem(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentItem(null);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
    setNewItem({ name: "", category: "", price: "", stock: "" }); // Reset item
  };

  const handleSaveChanges = () => {
    setIngredients(ingredients.map((item) => (item.id === currentItem.id ? currentItem : item)));
    handleCloseModal();
  };

  const handleAddNewItem = () => {
    setIngredients([...ingredients, { ...newItem, id: ingredients.length + 1 }]);
    handleCloseAddModal();
  };

  return (
    <div className="w-full h-full">
      <h2 className="text-xl font-bold text-gray-700 mb-4">{title}</h2>
      <button onClick={() => setAddModalOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
        Add New Ingredient
      </button>
      <div className="card mb-4 bg-white shadow-lg">
        <div className="card-body">
          <table className="w-full bg-white rounded-lg mb-4">
            <thead>
              <tr className="bg-gray-100 border-b">
                {tableHead.map((head, index) => (
                  <th key={index} className="py-3 px-4 text-gray-600 font-medium text-left">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: itemsPerPage }).map((_, index) => (
                  <tr key={index}>
                    <td className="py-3 px-4">Loading...</td>
                    <td className="py-3 px-4">Loading...</td>
                    <td className="py-3 px-4">Loading...</td>
                    <td className="py-3 px-4">Loading...</td>
                    <td className="py-3 px-4">Loading...</td>
                  </tr>
                ))
              ) : (
                currentIngredients.map((ingredient) => (
                  <tr key={ingredient.id} className="border-b">
                    <td className="py-3 px-4 text-gray-700">{ingredient.name}</td>
                    <td className="py-3 px-4 text-gray-700">{ingredient.category}</td>
                    <td className="py-3 px-4 text-gray-700">{ingredient.price}</td>
                    <td className="py-3 px-4 text-gray-700">{ingredient.stock}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleEditItem(ingredient)}
                        className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition"
                      >
                        <AiOutlineEdit />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <nav aria-label="Page navigation example" className="d-flex justify-content-center">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)} aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                  <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </a>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)} aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-black">Edit Ingredient</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body text-black">
                <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
                  <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input
                      type="text"
                      value={currentItem?.name}
                      onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category:</label>
                    <input
                      type="text"
                      value={currentItem?.category}
                      onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price:</label>
                    <input
                      type="text"
                      value={currentItem?.price}
                      onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value })}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Stock:</label>
                    <input
                      type="text"
                      value={currentItem?.stock}
                      onChange={(e) => setCurrentItem({ ...currentItem, stock: e.target.value })}
                      className="form-control"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-black">Add New Ingredient</h5>
                <button type="button" className="btn-close" onClick={handleCloseAddModal}></button>
              </div>
              <div className="modal-body text-black">
                <form onSubmit={(e) => { e.preventDefault(); handleAddNewItem(); }}>
                  <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input
                      type="text"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category:</label>
                    <input
                      type="text"
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price:</label>
                    <input
                      type="text"
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Stock:</label>
                    <input
                      type="text"
                      value={newItem.stock}
                      onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
                      className="form-control"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Add Ingredient</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientTable;
