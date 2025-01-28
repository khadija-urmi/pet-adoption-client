import { Link, NavLink } from "react-router-dom";
import logoImg from "../../assets/logo2.png";
import useAuth from "../../hooks/useAuth";
import { IoMoon, IoSunny } from "react-icons/io5";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { useEffect, useState } from "react";

const Navbar = () => {
    const { currentUser, logOutUser } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        if (localStorage.getItem('color-theme') === 'dark' || (darkMode)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const getNavLinkClass = ({ isActive }) =>
        isActive
            ? "py-2 px-3 text-blue-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            : "py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

    const links = <>
        <li>
            <NavLink to="/" className={getNavLinkClass} aria-current="page">Home</NavLink>
        </li>
        <li>
            <NavLink to="/about" className={getNavLinkClass}>About</NavLink>
        </li>
        <li>
            <NavLink to="/all-pet" className={getNavLinkClass}>Pet Listing</NavLink>
        </li>
        <li>
            <NavLink to="/donation" className={getNavLinkClass}>Donation For Pet</NavLink>
        </li>
    </>;

    return (
        <div className="bg-white max-w-6xl w-full border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <div className="flex items-center rtl:space-x-reverse">
                    <img src={logoImg} className="w-16 md:w-20 h-10" alt="Flowbite Logo" />
                    <span className="self-center text-xl md:text-2xl font-semibold whitespace-nowrap dark:text-white">WoofWow</span>
                </div>

                {/* User image and dropdown */}
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {currentUser ? (
                        <>
                            <button
                                type="button"
                                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 relative" id="user-menu-button"
                                aria-expanded={isDropdownOpen ? "true" : "false"}
                                onClick={toggleDropdown}
                            >
                                <span className="sr-only">Open user menu</span>
                                <img className="w-10 h-10 rounded-full" src={currentUser?.photoURL}
                                    referrerPolicy="no-referrer"
                                    alt="user photo" />
                            </button>
                            {/* User Dropdown Menu */}
                            <div
                                className={`z-50 ${isDropdownOpen ? "" : "hidden"} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-10 right-4`}
                                id="user-dropdown"
                            >
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900 dark:text-white">{currentUser?.displayName}</span>
                                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{currentUser?.email}</span>
                                </div>
                                <ul className="py-2" aria-labelledby="user-menu-button">
                                    <Link to="dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard
                                    </Link>
                                    <Link to="/my-profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My Profile
                                    </Link>
                                    <li>
                                        <button onClick={logOutUser} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign Out</button>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <div className="hidden md:flex justify-center items-center space-x-2">
                            <NavLink to="/login">
                                <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-3 py-2 lg:px-5 lg:py-2.5 text-center me-2 mb-2">Log In</button>
                            </NavLink>
                            <NavLink to="/signup">
                                <button className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-3 py-2 lg:px-5 lg:py-2.5 text-center me-2 mb-2">Register</button>
                            </NavLink>
                        </div>
                    )}
                    {/* Dark mode toggle button */}
                    <button
                        type="button"
                        onClick={toggleDarkMode}
                        className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 "
                    >
                        {darkMode ? <IoSunny className="w-5 h-5 ml-6" /> : <IoMoon className="w-5 h-5 ml-6" />}
                    </button>
                    {/* Menu Icon */}
                    <button
                        data-collapse-toggle="navbar-user"
                        type="button"
                        className="inline-flex items-center p-2 w-8 h-8 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        onClick={toggleMenu}
                    >
                        {menuOpen ? <IoMdClose /> : <IoMdMenu />}
                    </button>
                </div>

                {/* For small devices (Dropdown) */}
                {menuOpen && <div className={`absolute z-50 left-0 right-0 top-12 bg-white shadow-lg p-2  rounded-lg ${menuOpen ? "" : "hidden"}`} >
                    <ul className="flex flex-col space-y-2 font-medium p-4 mt-2 border border-gray-100 rounded-lg bg-gray-200 rtl:space-x-reverse ">
                        {links}
                        <li>
                            <NavLink to="/login" className={getNavLinkClass}>Log In</NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup" className={getNavLinkClass}>Register</NavLink>
                        </li>
                    </ul>
                </div>}

                {/* Flex layout for large devices */}
                <div className={`items-center justify-between hidden w-full md:flex md:text-sm lg:text-base md:w-auto md:order-1 ${menuOpen ? "hidden" : ""}`} id="navbar-user"
                    style={{ zIndex: 10 }}
                >
                    <ul className="flex md:flex-row font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {links}
                    </ul>
                </div>
            </div>
        </div >
    );
};

export default Navbar;
