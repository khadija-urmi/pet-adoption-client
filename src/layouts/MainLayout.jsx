import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      <div className="bg-white dark:bg-gray-900">
        <Navbar></Navbar>
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
