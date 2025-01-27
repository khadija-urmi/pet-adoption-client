
import { BsQuestionDiamondFill } from 'react-icons/bs';
import { FaShoppingCart, FaHome, FaCalendarAlt, FaCreditCard, FaDollarSign } from 'react-icons/fa';
import { PiUsersThreeFill } from "react-icons/pi";
import { IoCreateSharp } from 'react-icons/io5';
import { MdOutlineAddCircle, MdPlaylistAddCheckCircle } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { LuDog } from 'react-icons/lu';
import useAdmin from '../../hooks/useAdmin';

const Sidebar = () => {
    const [isAdmin] = useAdmin();

    const getNavLinkClass = ({ isActive }) =>
        isActive
            ? "flex items-center py-2 px-2 space-x-3 bg-blue-600 text-white hover:rounded hover:cursor-pointer hover:bg-blue-700 rounded-md"
            : "group flex items-center py-2 px-2 space-x-3 bg-gray-800 text-white hover:rounded hover:cursor-pointer hover:bg-blue-600";

    return (
        <div className="bg-gray-800 text-white h-screen px-4 fixed w-20 md:w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
            <h1 className="text-xl font-bold hidden md:block mt-4 ml-6 ">WoofWow</h1>
            <ul className="flex flex-col mt-3 space-y-1">
                <li className="relative group">
                    <NavLink to="/" className={getNavLinkClass}>
                        <FaHome className="w-5 h-5  mr-2" />
                        <span className="hidden md:inline">Home</span>
                    </NavLink>
                </li>
                <li className="relative group">
                    <NavLink to="add-pet" className={getNavLinkClass}>
                        <FaShoppingCart className="w-5 h-5  mr-2" />
                        <span className="hidden md:inline">Add a pet</span>
                    </NavLink>
                </li>
                <li className="relative group">
                    <NavLink to="my-pets" className={getNavLinkClass}>
                        <MdOutlineAddCircle className="w-5 h-5 mr-2" />
                        <span className="hidden md:inline">My Added Pet</span>
                    </NavLink>
                </li>
                <li className="relative group">
                    <NavLink to="adoption-request" className={getNavLinkClass}>
                        <BsQuestionDiamondFill className="w-5 h-5  mr-2" />
                        <span className="hidden md:inline">Adoption Request</span>
                    </NavLink>
                </li>
                <li className="relative group">
                    <NavLink to="add-donation" className={getNavLinkClass}>
                        <IoCreateSharp className="w-5 h-5  mr-2" />
                        <span className="hidden md:inline">Create DonationCamp</span>
                    </NavLink>
                </li>
                <li className="relative group">
                    <NavLink to="my-donation-campaigns" className={getNavLinkClass}>
                        <FaCalendarAlt className="w-5 h-5 mr-2" />
                        <span className="hidden md:inline">My added event</span>
                    </NavLink>
                </li>
                <li className="relative group">
                    <NavLink to="my-donation" className={getNavLinkClass}>
                        <FaCreditCard className="w-5 h-5  mr-2" />
                        <span className="hidden md:inline">My DonationList</span>
                    </NavLink>
                </li>
                <li className="relative group">
                    <NavLink to="my-donation-donar" className={getNavLinkClass}>
                        <MdPlaylistAddCheckCircle className="w-5 h-5  mr-2" />
                        <span className="hidden md:inline">My Campaign DonarList</span>
                    </NavLink>
                </li>
                {/* Admin routes: only show when isAdmin is true */}
                {isAdmin && (
                    <>
                        <li className="relative group">
                            <NavLink to="all-users" className={getNavLinkClass}>
                                <PiUsersThreeFill className="w-5 h-5  mr-2" />
                                <span className="hidden md:inline">All User</span>
                            </NavLink>
                        </li>
                        <li className="relative group">
                            <NavLink to="all-pet-lists" className={getNavLinkClass}>
                                <LuDog className="w-5 h-5  mr-2" />
                                <span className="hidden md:inline">All Pets</span>
                            </NavLink>
                        </li>
                        <li className="relative group">
                            <NavLink to="all-donation-lists" className={getNavLinkClass}>
                                <FaDollarSign className="w-5 h-5  mr-2" />
                                <span className="hidden md:inline">All Donation</span>
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
