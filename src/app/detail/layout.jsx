// src/app/detail/layout.jsx
"use client";
import Sidebar from "./component/sidebar";

export default function DetailLayout({ children }) {
  return (
    <div className="w-full h-full flex">
      <Sidebar />
      <main className="w-full">{children}</main>
    </div>
  );
}
