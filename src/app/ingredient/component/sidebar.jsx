"use client";

import React from "react";
import Link from "next/link";
import { FaBacon, FaHome, FaListAlt, FaUser } from "react-icons/fa";

const Sidebar = () => {
  const data = [
    { menu: "Home", href: "/home", icon: <FaHome /> },
    { menu: "Menu", href: "/dashboard", icon: <FaListAlt /> },
    { menu: "Ingredient", href: "/ingredient", icon: <FaBacon /> },
    
  ];

  return (
    <div className="h-screen w-[20%] bg-white p-8 flex flex-col gap-12">
      <h1 className="text-black font-bold text-3xl">Ingredient</h1>
      <div className="w-full flex flex-col gap-3">
        {data.map((item, index) => (
          <Link href={item.href} key={index}>
            <div className="p-2 rounded-xl text-black hover:bg-blue-500 hover:text-white flex items-center gap-2 text-xl">
              {item.icon}
              <h1>{item.menu}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
