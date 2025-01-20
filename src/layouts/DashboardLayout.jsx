
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/SideBAr';

const DashboardLayout = () => {
    return (
        <div className='flex'>
            <Sidebar></Sidebar>
            <div className='grow ml-16 md:ml-64 h-full lg:h-screen bg-gray-100 text-gray-900
      dark:bg-gray-900 dark:text-white'>
                <div>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;