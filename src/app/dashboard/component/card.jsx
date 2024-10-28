"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import { PiClockCountdownLight } from "react-icons/pi";
import { AiOutlineEdit } from "react-icons/ai";

const TableItems = ({ title, loading }) => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [newItem, setNewItem] = useState({ itemName: "", variant: "", ingredients: "", totalPrice: "" });

  const tableHead = ["Item Name", "Variant", "Ingredients", "Total Price", "Actions"];

  const items = [
    { id: 1, itemName: "Burger", variant: "Cheese", ingredients: "4 Ingredients", totalPrice: "$5.99" },
    { id: 2, itemName: "Pizza", variant: "Pepperoni", ingredients: "3 Ingredients", totalPrice: "$8.99" },
    { id: 3, itemName: "Salad", variant: "Caesar", ingredients: "3 Ingredients", totalPrice: "$4.99" },
    { id: 4, itemName: "Pasta", variant: "Alfredo", ingredients: "3 Ingredients", totalPrice: "$7.99" },
    { id: 5, itemName: "Sandwich", variant: "Ham & Cheese", ingredients: "3 Ingredients", totalPrice: "$3.99" },
    { id: 6, itemName: "Fries", variant: "Large", ingredients: "3 Ingredients", totalPrice: "$2.99" },
    { id: 7, itemName: "Taco", variant: "Chicken", ingredients: "4 Ingredients", totalPrice: "$6.99" },
    { id: 8, itemName: "Sushi", variant: "Salmon", ingredients: "5 Ingredients", totalPrice: "$9.99" },
    { id: 9, itemName: "Steak", variant: "Grilled", ingredients: "2 Ingredients", totalPrice: "$14.99" },
    { id: 10, itemName: "Ice Cream", variant: "Vanilla", ingredients: "1 Ingredient", totalPrice: "$3.49" },
  ];

  const itemsPerPage = 5; 
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
    setNewItem({ itemName: "", variant: "", ingredients: "", totalPrice: "" });
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
        Add New Menu
      </button>
      
      <div className="bg-white shadow-lg rounded-lg p-4">
        <table className="w-full">
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
              currentItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-3 px-4 text-gray-700">{item.itemName}</td>
                  <td className="py-3 px-4 text-gray-700">{item.variant}</td>
                  <td className="py-3 px-4 text-gray-700">{item.ingredients}</td>
                  <td className="py-3 px-4 text-gray-700">{item.totalPrice}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(item)}
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                    >
                      <PiClockCountdownLight />
                    </button>
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
{/* Pagination Controls */}
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
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
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
                  <button type="submit" className="btn btn-primary">Add Item</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableItems;
