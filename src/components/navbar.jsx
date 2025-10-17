import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-4 z-20">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-white text-2xl font-semibold tracking-tight">
          Maddie Knappenberger
        </h1>
        <button
          onClick={() => setOpen(!open)}
          className="text-white text-3xl absolute right-4 top-2"
        >
          ☰
        </button>
      </div>
      {open && (
        <div className="absolute top-12 left-0 bg-[#DA485D] p-4 rounded-xl shadow-xl">
          <Link to="/" onClick={() => setOpen(false)} className="block text-white mb-2 hover:underline">Home</Link>
          <Link to="/projects" onClick={() => setOpen(false)} className="block text-white mb-2 hover:underline">Projects</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="block text-white hover:underline">Contact</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
