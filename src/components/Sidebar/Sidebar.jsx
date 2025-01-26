import { AiFillCheckCircle } from 'react-icons/ai';
import { BsQuestionDiamondFill } from 'react-icons/bs';
import { FaShoppingCart, FaHome, FaCalendarAlt, FaCreditCard } from 'react-icons/fa';
import { PiUsersThreeFill } from "react-icons/pi";
import { IoCreateSharp } from 'react-icons/io5';
import { MdOutlineAddCircle, MdPlaylistAddCheckCircle } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const getNavLinkClass = ({ isActive }) =>
        isActive
            ? "flex items-center py-3 px-2 space-x-4 bg-blue-600 text-white hover:rounded hover:cursor-pointer hover:bg-blue-700 rounded-md"
            : "group flex items-center py-3 px-2 space-x-4 bg-gray-800 text-white hover:rounded hover:cursor-pointer hover:bg-blue-600";

    return (
        <div className="bg-gray-800 text-white h-screen px-4 fixed w-20 md:w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
            <h1 className="text-2xl font-bold hidden md:block mt-4 ml-6 ">WoofWow</h1>
            <ul className="flex flex-col mt-5">
                <li className="relative group">
                    <NavLink to="/" className={getNavLinkClass}>
                        <FaHome className="w-5 h-5 md: mr-2" />
                        <span className="hidden md:inline">Home</span>
                    </NavLink>
                    <span className="absolute left-full rounded-md whitespace-nowrap px-3 py-2 ml-4 bg-indigo-300 text-indigo-800 text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 sm:block md:hidden">
                        Home
                    </span>
                </li>
                <li className="relative group">
                    <NavLink to="add-pet" className={getNavLinkClass}>
                        <FaShoppingCart className="w-5 h-5 md: mr-2" />
                        <span className="hidden md:inline">Add a pet</span>
                    </NavLink>
                    <span className="absolute left-full top-5 rounded-md whitespace-nowrap px-3 py-2 ml-4 bg-indigo-300 text-indigo-800 text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 sm:block md:hidden">
                        Add a pet
                    </span>
                </li>
                <li className="relative group">
                    <NavLink to="my-adoption-pets" className={getNavLinkClass}>
                        <AiFillCheckCircle className="w-5 h-5  mr-2" />
                        <span className="hidden md:inline">Adopted Pet</span>
                    </NavLink>
                    <span className="absolute left-full rounded-md whitespace-nowrap px-3 py-2 ml-4 bg-indigo-300 text-indigo-800 text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 sm:block md:hidden">
                        Adopted Pet
                    </span>
                </li>
                <li className="relative group">
                    <NavLink to="my-pets" className={getNavLinkClass}>
                        <MdOutlineAddCircle className="w-5 h-5 mr-2" />
                        <span className="hidden md:inline">My Added Pet</span>
                    </NavLink>
                    <span className="absolute left-full rounded-md whitespace-nowrap px-3 py-2 ml-4 bg-indigo-300 text-indigo-800 text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 sm:block md:hidden">
                        My Added Pet
                    </span>
                </li>
                <li className="relative group">
                    <NavLink to="adoption-request"
                        className={getNavLinkClass}>
                        <BsQuestionDiamondFill className="w-5 h-5  mr-2" />
                        <span className="hidden md:inline">Adoption Request</span>
                    </NavLink>
                    <span className="absolute left-full rounded-md whitespace-nowrap px-3 py-2 ml-4 bg-indigo-300 text-indigo-800 text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 sm:block md:hidden">
                        Adoption Request
                    </span>
                </li>
                <li className="relative group">
                    <NavLink to="add-donation" className={getNavLinkClass}>
                        <IoCreateSharp className="w-5 h-5 md:w-7 md:h-7 mr-2" />
                        <span className="hidden md:inline">Create DonationCamp</span>
                    </NavLink>
                    <span className="absolute left-full rounded-md whitespace-nowrap px-3 py-2 ml-4 bg-indigo-300 text-indigo-800 text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 sm:block md:hidden">
                        Create DonationCamp
                    </span>
                </li>
                <li className="relative group">
                    <NavLink to="my-donation-campaigns" className={getNavLinkClass}>
                        <FaCalendarAlt className="w-5 h-5 mr-2" />
                        <span className="hidden md:inline">My added event</span>
                    </NavLink>
                    <span className="absolute left-full rounded-md whitespace-nowrap px-3 py-2 ml-4 bg-indigo-300 text-indigo-800 text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 sm:block md:hidden">
                        My Added Events
                    </span>
                </li>
                <li className="relative group">
                    <NavLink to="my-donation" className={getNavLinkClass}>
                        <FaCreditCard className="w-5 h-5  mr-2" />
                        <span className="hidden md:inline">My DonationList</span>
                    </NavLink>
                    <span className="absolute left-full rounded-md whitespace-nowrap px-3 py-2 ml-4 bg-indigo-300 text-indigo-800 text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 sm:block md:hidden">
                        My DonationList
                    </span>
                </li>
                <li className="relative group">
                    <NavLink to="my-donation-donar" className={getNavLinkClass}>
                        <MdPlaylistAddCheckCircle className="w-5 h-5  mr-2" />
                        <span className="hidden md:inline">My Campaign DonarList</span>
                    </NavLink>
                    <span className="absolute left-full rounded-md whitespace-nowrap px-3 py-2 ml-4 bg-indigo-300 text-indigo-800 text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 sm:block md:hidden">
                        My Campaign DonarList
                    </span>
                </li>
                <li className="relative group">
                    <NavLink to="all-users" className={getNavLinkClass}>
                        <PiUsersThreeFill className="w-5 h-5  mr-2" />
                        <span className="hidden md:inline">All User</span>
                    </NavLink>
                    <span className="absolute left-full rounded-md whitespace-nowrap px-3 py-2 ml-4 bg-indigo-300 text-indigo-800 text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 sm:block md:hidden">
                        All User
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
