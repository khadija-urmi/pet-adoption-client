import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import { Helmet } from 'react-helmet-async';
const DashboardLayout = () => {
    return (
        <>
            <Helmet>
                <title>WoofWow | Dashboard</title>
            </Helmet>
            <div className='flex'>
                <Sidebar></Sidebar>
                <div className='grow ml-20 md:ml-64 h-full lg:h-screen bg-gray-100 text-gray-900
      dark:bg-gray-900 dark:text-white'>
                    <div>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;