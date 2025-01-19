import { Sidebar } from "flowbite-react";
//import logoImg from "../assets/logo2.png";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";


const DashboardLayout = () => {
    //const isAdmin = "true";

    return (
        <div>
            <Sidebar aria-label="Sidebar with logo branding example">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" icon={HiChartPie}>
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiViewBoards}>
                            Add a pet
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiInbox}>
                            My Added Pet
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiUser}>
                            Adoption Request
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiShoppingBag}>
                            Create Donation Campaign
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiArrowSmRight}>
                            My Donation Campaign
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiTable}>
                            My Donations
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
};

export default DashboardLayout;