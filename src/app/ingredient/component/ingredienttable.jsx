"use client";

import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";

const IngredientTable = ({ title, loading }) => {
  const tableHead = ["Ingredient", "Category", "Price", "Unit", "Actions"]; // Tetap sama
  const [ingredients, setIngredients] = useState([
    { id: 1, name: "Beef", category: "Meat", price: "$3.00", unit: "grams" }, // Misalnya gram
    { id: 2, name: "Cheese", category: "Dairy", price: "$1.00", unit: "grams" },
    { id: 3, name: "Lettuce", category: "Vegetable", price: "$0.50", unit: "grams" },
    { id: 4, name: "Tomato", category: "Vegetable", price: "$0.75", unit: "grams" },
    { id: 5, name: "Pepperoni", category: "Meat", price: "$1.50", unit: "grams" },
    { id: 6, name: "Pasta", category: "Grain", price: "$2.50", unit: "grams" },
    { id: 7, name: "Chicken", category: "Meat", price: "$2.00", unit: "grams" },
    { id: 8, name: "Ham", category: "Meat", price: "$1.50", unit: "grams" },
    { id: 9, name: "Croutons", category: "Bakery", price: "$0.50", unit: "grams" },
    { id: 10, name: "Alfredo Sauce", category: "Condiment", price: "$1.00", unit: "liters" }, // Contoh liter
  ]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [newItem, setNewItem] = useState({ name: "", category: "", price: "", unit: "" }); // Tetap sama

  const itemsPerPage = 5; // Jumlah item per halaman
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(ingredients.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentIngredients = ingredients.slice(startIndex, startIndex + itemsPerPage);

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
    setNewItem({ name: "", category: "", price: "", unit: "" }); // Reset item
  };

  const handleAddNewItem = () => {
    if (!newItem.name || !newItem.category || isNaN(parseFloat(newItem.price)) || !newItem.unit) {
      alert("Please fill out all fields correctly.");
      return;
    }
    setIngredients([...ingredients, { ...newItem, id: ingredients.length + 1 }]);
    handleCloseAddModal();
  };
  
  const handleSaveChanges = () => {
    if (!currentItem.name || !currentItem.category || isNaN(parseFloat(currentItem.price)) || !currentItem.unit) {
      alert("Please fill out all fields correctly.");
      return;
    }
    setIngredients(ingredients.map((item) => (item.id === currentItem.id ? currentItem : item)));
    handleCloseModal();
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
                    <td className="py-3 px-4 text-gray-700">{ingredient.unit}</td> {/* Tetap sama */}
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
          <nav aria-label="Page navigation example" className="flex justify-center mt-4">
  <div className="flex space-x-1">
    <button
      className="rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-[#1E3E62] hover:border-[#1E3E62] focus:text-white focus:bg-[#1E3E62] focus:border-[#1E3E62] active:border-[#1E3E62] active:text-white active:bg-[#1E3E62] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Prev
    </button>
    {Array.from({ length: totalPages }).map((_, index) => (
      <button
        key={index}
        className={`min-w-9 rounded-md py-2 px-3 border text-center text-sm transition-all shadow-sm ${
          currentPage === index + 1
            ? "bg-[#1E3E62] text-white border-transparent"
            : "border border-slate-300 text-slate-600 hover:text-white hover:bg-[#1E3E62] hover:border-[#1E3E62]"
        }`}
        onClick={() => handlePageChange(index + 1)}
      >
        {index + 1}
      </button>
    ))}
    <button
      className="rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-[#1E3E62] hover:border-[#1E3E62] focus:text-white focus:bg-[#1E3E62] focus:border-[#1E3E62] active:border-[#1E3E62] active:text-white active:bg-[#1E3E62] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
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
                    <label className="form-label">Unit:</label> {/* Tetap sama */}
                    <input
                      type="text"
                      value={currentItem?.unit}
                      onChange={(e) => setCurrentItem({ ...currentItem, unit: e.target.value })}
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
                    <label className="form-label">Unit:</label> {/* Tetap sama */}
                    <input
                      type="text"
                      value={newItem.unit}
                      onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
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