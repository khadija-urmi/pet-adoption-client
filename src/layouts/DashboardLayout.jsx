import { FaDog, FaGift, FaHome } from 'react-icons/fa';
// add icon FaUsers, FaPaw
import { AiFillCheckCircle } from "react-icons/ai";
import { IoCreateSharp } from "react-icons/io5";
import { BsQuestionDiamondFill } from "react-icons/bs";
import { MdOutlineAddCircle } from "react-icons/md";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import logoImg from "../assets/logo2.png";

const DashboardLayout = () => {
    //const isAdmin = "true";
    const getNavLinkClass = ({ isActive }) =>
        isActive
            ? "flex items-center p-2 text-blue-700 rounded-lg bg-gray-200 hover:bg-gray-100 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 group"
            : "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group";

    return (
        <div>
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            {/* SideBar */}
            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <NavLink href="/" className="flex items-center ps-2.5 mb-5">
                        <img src={logoImg} className=" w-16 h-12 me-3 sm:h-7" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">WoofWow</span>
                    </NavLink>
                    <ul className="space-y-4 font-medium">
                        <li>
                            <NavLink to="/" className={getNavLinkClass}>
                                <span className="flex items-center justify-around  ms-1 whitespace-nowrap">
                                    <FaHome className='w-6 h-6 mr-2' />
                                    Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/add-pet" className={getNavLinkClass}>
                                <span className="flex items-center justify-around  ms-1 whitespace-nowrap">
                                    <FaDog className='w-6 h-6 mr-2' />Add A Pet</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/adopt-pet" className={getNavLinkClass}>
                                <span className="flex items-center justify-around  ms-1 whitespace-nowrap">
                                    <AiFillCheckCircle className='w-6 h-6 mr-2' />
                                    Adopted Pet</span>
                                {/* show total pet adopted */}
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/my-pets" className={getNavLinkClass}>
                                <span className="flex items-center justify-around  ms-1 whitespace-nowrap">
                                    <MdOutlineAddCircle className='w-6 h-6 mr-2' />
                                    My Added Pet</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/adoption-request" className={getNavLinkClass}>
                                <span className="flex items-center justify-around  ms-1 whitespace-nowrap">
                                    <BsQuestionDiamondFill className='w-6 h-6 mr-2' />
                                    Adoption Request</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/add-donation" className={getNavLinkClass}>
                                <span className="flex items-center justify-around  ms-1 whitespace-nowrap">
                                    <IoCreateSharp className='w-6 h-6 mr-2' />
                                    Create Donation Campaign</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/my-donation-campaigns" className={getNavLinkClass}>
                                <span className="flex items-center justify-around  ms-1 whitespace-nowrap">
                                    <BsCalendar2CheckFill className='w-6 h-6 mr-2' />
                                    My Donation Campaigns</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/my-donation" className={getNavLinkClass}>
                                <span className="flex items-center justify-around  ms-1 whitespace-nowrap">
                                    <FaGift className='w-6 h-6 mr-2' />
                                    My Donations</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside >

            <div className="p-4 sm:ml-64">
                <h3 className="bg-red-400">This is the dashboard</h3>
            </div>
        </div >
    );
};

export default DashboardLayout;