"use client";

import React, { useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { PiClockCountdownLight } from "react-icons/pi";


const TableItems = ({ title, loading }) => {
    const tableHead = ["Item Name", "Variant", "Ingredients", "Total Price", "Detail"];

    const items = [
        { id: 1, itemName: "Burger", variant: "Cheese", ingredients: "Beef, Cheese, Lettuce, Tomato", totalPrice: "$5.99" },
        { id: 2, itemName: "Pizza", variant: "Pepperoni", ingredients: "Pepperoni, Cheese, Tomato Sauce", totalPrice: "$8.99" },
        { id: 3, itemName: "Salad", variant: "Caesar", ingredients: "Lettuce, Croutons, Caesar Dressing", totalPrice: "$4.99" },
        { id: 4, itemName: "Pasta", variant: "Alfredo", ingredients: "Pasta, Alfredo Sauce, Chicken", totalPrice: "$7.99" },
        { id: 5, itemName: "Sandwich", variant: "Ham & Cheese", ingredients: "Ham, Cheese, Lettuce", totalPrice: "$3.99" },
    ];

    const handleViewDetails = (item) => {
        alert(`View details for ${item.itemName}`);
    };

    return (
        <div className=" w-full h-full">
            <h2 className="text-xl font-bold text-gray-700 mb-4">{title}</h2>
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
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableItems;
