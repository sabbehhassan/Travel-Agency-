// src/routes/appRoutes.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/home";
import About from "../pages/about";
import Login from "../pages/login";
import Register from "../pages/register";
import UserDashboard from "../pages/userdashbaord";
import ProfilePage from "../pages/profile";
import ScrollToTop from "../components/scrolltotop";
import CustomizeTrip from "../pages/customizetrip";
import AdminDashboard from "../pages/admindashboard";
import Destination from "../pages/destination";
import Packages from "../pages/packages"
import AllReviews from "../pages/allreviews";
import Contact from "../pages/contact";

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
