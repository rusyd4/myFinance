import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App dark:bg-gray-900">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
