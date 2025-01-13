import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      <div className="max-w-6xl mx-auto"><Navbar></Navbar></div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;