// src/layout/Layout.jsx
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <>
      <Navbar />

      <main className="pt-14">
        {/* Push content below fixed navbar */}
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;