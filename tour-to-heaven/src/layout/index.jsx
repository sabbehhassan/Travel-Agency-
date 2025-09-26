// layout/Layout.jsx
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        {/* to push below fixed navbar */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
