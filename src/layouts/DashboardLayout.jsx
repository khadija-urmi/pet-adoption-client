import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import img1 from "../assets/dog1.jfif";
import img2 from "../assets/rabbit1.jfif";
import { Helmet } from 'react-helmet-async';
const DashboardLayout = () => {
    return (
        <>
            <Helmet>
                <title>WoofWow | Dashboard</title>
            </Helmet>
            <div className='flex'>
                <Sidebar></Sidebar>
                <div className="grow ml-16 md:ml-64 h-full lg:h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
                    <div className="px-6 py-8">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                            Why You Should Adopt a Pet
                        </h1>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                            Adopting a pet can bring a wealth of joy and companionship into your life. By choosing to adopt, you are
                            giving a homeless animal a chance at a better life. Adoption not only saves lives but helps reduce the
                            number of animals in shelters waiting for a loving family. Whether you&apos;re looking for a loyal dog, a playful
                            cat, or a quiet companion, adopting a pet allows you to make a difference in their life and yours.
                        </p>
                        <div className='max-w-3xl mx-auto flex justify-evenly'>
                            <img src={img1} className='w-56 h-48 rounded-md' alt="" />
                            <img src={img2} className='w-56 h-48 rounded-md' alt="" />
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;