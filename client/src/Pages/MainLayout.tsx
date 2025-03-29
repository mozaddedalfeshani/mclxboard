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
    </div>
  );
}
