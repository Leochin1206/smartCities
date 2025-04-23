import { Link } from "react-router-dom";
import React, { useState } from "react";
import menu from "../assets/menu.svg";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="text-[#4895ef]">
      <div className="sm:hidden !p-4 bg-white shadow-right flex justify-between items-center">
        <div className="text-2xl font-bold">Smart City</div>
        <img
          src={menu}
          alt="Menu Hamburguer"
          onClick={toggleMenu}
          className="w-8 h-8 cursor-pointer"
        />
      </div>

      {menuOpen && (
        <ul className="sm:hidden bg-white px-6 pb-4 flex flex-col gap-4 shadow-md">
          <Link to="/home" onClick={() => setMenuOpen(false)}><li className="hover:shadow-lg hover:scale-105 transition-all !p-2"><p className="!ml-7 text-[18px] font-medium">Home</p></li></Link>
          <Link to="/contador" onClick={() => setMenuOpen(false)}><li className="hover:shadow-lg hover:scale-105 transition-all !p-2"><p className="!ml-7 text-[18px] font-medium">Contador</p></li></Link>
          <Link to="/luminosidade" onClick={() => setMenuOpen(false)}><li className="hover:shadow-lg hover:scale-105 transition-all !p-2"><p className="!ml-7 text-[18px] font-medium">Luminosidade</p></li></Link>
          <Link to="/temperatura" onClick={() => setMenuOpen(false)}><li className="hover:shadow-lg hover:scale-105 transition-all !p-2"><p className="!ml-7 text-[18px] font-medium">Temperatura</p></li></Link>
          <Link to="/umidade" onClick={() => setMenuOpen(false)}><li className="hover:shadow-lg hover:scale-105 transition-all !p-2"><p className="!ml-7 text-[18px] font-medium">Umidade</p></li></Link>
        </ul>
      )}

      <div className="hidden sm:flex flex-col w-50 h-[100vh] bg-white shadow-right !p-4 fixed top-0">
        <div className="text-2xl font-bold sm:!mb-5">Smart City</div>
        <ul className="flex flex-col gap-4 !ml-4">
          <Link to="/home"><li className="hover:shadow-lg hover:scale-105 transition-all px-4 py-2 !p-2 rounded-md cursor-pointer"><p className="text-[20px] font-medium">Home</p></li></Link>
          <Link to="/contador"><li className="hover:shadow-lg hover:scale-105 transition-all px-4 py-2 !p-2 rounded-md cursor-pointer"><p className="text-[20px] font-medium">Contador</p></li></Link>
          <Link to="/luminosidade"><li className="hover:shadow-lg hover:scale-105 transition-all px-4 py-2 !p-2 rounded-md cursor-pointer"><p className="text-[20px] font-medium">Luminosidade</p></li></Link>
          <Link to="/temperatura"><li className="hover:shadow-lg hover:scale-105 transition-all px-4 py-2 !p-2 rounded-md cursor-pointer"><p className="text-[20px] font-medium">Temperatura</p></li></Link>
          <Link to="/umidade"><li className="hover:shadow-lg hover:scale-105 transition-all px-4 py-2 !p-2 rounded-md cursor-pointer"><p className="text-[20px] font-medium">Umidade</p></li></Link>
        </ul>
      </div>
    </nav>
  );
}
