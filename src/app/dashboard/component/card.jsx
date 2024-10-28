"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import { PiClockCountdownLight } from "react-icons/pi";
import { AiOutlineEdit } from "react-icons/ai";

const TableItems = ({ title, loading }) => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false); // Tambahkan state untuk modal tambah
  const [currentItem, setCurrentItem] = useState(null);
  const [newItem, setNewItem] = useState({ itemName: "", variant: "", ingredients: "", totalPrice: "" }); // State untuk item baru

  const tableHead = ["Item Name", "Variant", "Ingredients", "Total Price", "Detail", "Edit"];

  const items = [
    { id: 1, itemName: "Burger", variant: "Cheese", ingredients: "4 Ingredients", totalPrice: "$5.99" },
    { id: 2, itemName: "Pizza", variant: "Pepperoni", ingredients: "3 Ingredients", totalPrice: "$8.99" },
    { id: 3, itemName: "Salad", variant: "Caesar", ingredients: "3 Ingredients", totalPrice: "$4.99" },
    { id: 4, itemName: "Pasta", variant: "Alfredo", ingredients: "3 Ingredients", totalPrice: "$7.99" },
    { id: 5, itemName: "Sandwich", variant: "Ham & Cheese", ingredients: "3 Ingredients", totalPrice: "$3.99" },
  ];

  const handleViewDetails = (item) => {
    router.push(`/detail?id=${item.id}`);
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
    setNewItem({ itemName: "", variant: "", ingredients: "", totalPrice: "" }); // Reset item baru
  };

  const handleSaveChanges = () => {
    console.log("Changes saved:", currentItem);
    handleCloseModal();
  };

  const handleAddNewItem = () => {
    console.log("New item added:", newItem);
    handleCloseAddModal();
  };

  return (
    <div className="w-full h-full">
      <h2 className="text-xl font-bold text-gray-700 mb-4">{title}</h2>
      <button onClick={() => setAddModalOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
        Add New Item
      </button>
      <table className="w-full bg-white shadow-lg rounded-lg">
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
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                {Array.from({ length: tableHead.length }).map((_, i) => (
                  <td key={i} className="py-3 px-4">
                    <Skeleton height={20} />
                  </td>
                ))}
              </tr>
            ))
          ) : (
            items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-3 px-4 text-gray-700">{item.itemName}</td>
                <td className="py-3 px-4 text-gray-700">{item.variant}</td>
                <td className="py-3 px-4 text-gray-700">{item.ingredients}</td>
                <td className="py-3 px-4 text-gray-700">{item.totalPrice}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleViewDetails(item)}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                  >
                    <PiClockCountdownLight />
                  </button>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleEditItem(item)}
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

      {isModalOpen && (
        <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-black">Edit Item</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
                  <div className="mb-3">
                    <label className="form-label text-black">Item Name:</label>
                    <input
                      type="text"
                      value={currentItem?.itemName}
                      onChange={(e) => setCurrentItem({ ...currentItem, itemName: e.target.value })}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-black">Variant:</label>
                    <input
                      type="text"
                      value={currentItem?.variant}
                      onChange={(e) => setCurrentItem({ ...currentItem, variant: e.target.value })}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-black">Ingredients:</label>
                    <input
                      type="text"
                      value={currentItem?.ingredients}
                      onChange={(e) => setCurrentItem({ ...currentItem, ingredients: e.target.value })}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-black">Total Price:</label>
                    <input
                      type="text"
                      value={currentItem?.totalPrice}
                      onChange={(e) => setCurrentItem({ ...currentItem, totalPrice: e.target.value })}
                      className="form-control"
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={() => { handleSaveChanges(); handleCloseModal(); }}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

{isAddModalOpen && (
  <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-black">Add New Item</h5>
          <button type="button" className="btn-close" onClick={handleCloseAddModal} aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <form onSubmit={(e) => { e.preventDefault(); handleAddNewItem(); }}>
            <div className="mb-3">
              <label className="form-label text-black">Item Name:</label>
              <input
                type="text"
                value={newItem.itemName}
                onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-black">Variant:</label>
              <input
                type="text"
                value={newItem.variant}
                onChange={(e) => setNewItem({ ...newItem, variant: e.target.value })}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-black">Ingredients:</label>
              <input
                type="text"
                value={newItem.ingredients}
                onChange={(e) => setNewItem({ ...newItem, ingredients: e.target.value })}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-black">Total Price:</label>
              <input
                type="text"
                value={newItem.totalPrice}
                onChange={(e) => setNewItem({ ...newItem, totalPrice: e.target.value })}
                className="form-control"
                required
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleCloseAddModal}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={() => { handleAddNewItem(); handleCloseAddModal(); }}>Add Item</button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default TableItems;
