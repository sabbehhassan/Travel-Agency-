// src/routes/appRoutes.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/index.jsx";
import Home from "../pages/home/index.jsx";
import About from "../pages/About/index.jsx";
import Login from "../pages/Login/index.jsx";
import Register from "../pages/Register/index.jsx";
import UserDashboard from "../pages/UserDashboard/index.jsx";
import ProfilePage from "../pages/Profile/index.jsx";
import ScrollToTop from "../components/ScrollToTop/index.jsx";
import CustomizeTrip from "../pages/CustomizeTrip/index.jsx";
import AdminDashboard from "../pages/AdminDashboard/index.jsx";
import Destination from "../pages/Destination/index.jsx";
import Packages from "../pages/Packages/index.jsx"
import AllReviews from "../pages/AllReviews/index.jsx";
import Contact from "../pages/Contact/index.jsx";

// Layout ke andar ScrollToTop wrap karenge
const withScrollToTop = (element) => (
  <>
    <ScrollToTop />
    {element}
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: withScrollToTop(<Layout />), // ✅ wrap layout
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "dashboard", element: <UserDashboard /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "customize-trip", element: <CustomizeTrip /> },
      { path: "admin-dashboard", element: <AdminDashboard /> },
      {path: "destinations", element: <Destination />},
      {path: "packages", element: <Packages/>},
      {path: "reviews", element: <AllReviews />},
      {path: "contact", element: <Contact />}
    ],
  },
]);

export default router;
