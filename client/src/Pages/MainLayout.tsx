import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <NavBar />
      </div>
      <div className="container mx-auto px-4 py-8">
        <Outlet />
      </div>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
        <p>
          Made by{"❤️"}
          <u>
            <a href="https://imurad.netlify.app/">Murad</a>
          </u>
        </p>
        <p>Powered by React & DraftJS</p>
      </footer>
    </div>
  );
}
