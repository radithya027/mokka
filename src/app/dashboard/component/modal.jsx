// src/app/dashboard/component/Modal.jsx

import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [variant, setVariant] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [totalPrice, setTotalPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      itemName,
      variant,
      ingredients,
      totalPrice,
    };
    onAddItem(newItem);
    onClose(); // Close modal after submission
    resetForm(); // Reset form fields
  };

  const resetForm = () => {
    setItemName('');
    setVariant('');
    setIngredients('');
    setTotalPrice('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Variant"
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <input
            type="number"
            placeholder="Total Price"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
            required
          />
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="bg-gray-300 p-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
