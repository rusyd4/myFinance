import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AboutMe from "./components/AboutMe";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import FinanceTracker from "./components/FinanceTracker";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<FinanceTracker />} />
      <Route path="home" element={<FinanceTracker />} />
      <Route path="about" element={<AboutMe />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
