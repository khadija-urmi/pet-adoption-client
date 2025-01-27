import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import PetListing from "../pages/PetListing/PetListing";
import About from "../pages/Home/About/About";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../pages/MyProfile/MyProfile";
import DashboardLayout from "../layouts/DashboardLayout";
import AddPet from "../pages/Dashboard/AddPet/AddPet";
import AllUser from "../pages/Dashboard/AllUser/AllUser";
import MyAddedPet from "../pages/Dashboard/MyAddedPet/MyAddedPet";
import MyDonationCampaign from "../pages/Dashboard/MyDonationCampaign/MyDonationCampaign";
import AdoptionRequest from "../pages/Dashboard/AdoptionRequest/AdoptionRequest";
import AddDonationCampaign from "../pages/Dashboard/AddDonationCampaign/AddDonationCampaign";
import DonationList from "../pages/DonationList/DonationList";
import EditDonationCampaign from "../pages/Dashboard/EditDonationCampaign/EditDonationCampaign";
import DonationDetails from "../components/DonationDetails/DonationDetails";
import MyCampaignDonors from "../pages/Dashboard/MyCampaignDonors/MyCampaignDonors";
import MyDonationList from "../pages/Dashboard/MyDonationList/MyDonationList";
import MyAdoptedPet from "../pages/Dashboard/MyAdoptedPet/MyAdoptedPet";
import AllPetLists from "../pages/Dashboard/AllPetLists/AllPetLists";
import AllDonationLists from "../pages/Dashboard/AllDonationLists/AllDonationLists"
import EditPetInfo from "../pages/Dashboard/EditPetInfo/EditPetInfo"
import PetDetails from "../components/PetDetails/PetDetails";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/all-pet",
        element: <PetListing />,
      },
      {
        path: "/pet/:id",
        element: <PetDetails />,
      },
      {
        path: "/donation",
        element: <DonationList />,
      },
      {
        path: "/donation/:id",
        element: <DonationDetails />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
    ]

  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'add-pet',
        index: true,
        element: (
          <PrivateRoute>
            <AddPet />
          </PrivateRoute>
        ),
      },
      {
        path: 'all-users',
        element: (
          <PrivateRoute>
            <AllUser />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-profile',
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-pets',
        element: (
          <PrivateRoute>
            <MyAddedPet />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-edit-pet/:id',
        element: (
          <PrivateRoute>
            <EditPetInfo />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-adoption-pets',
        element: (
          <PrivateRoute>
            <MyAdoptedPet />
          </PrivateRoute>
        ),
      },
      {
        path: 'adoption-request',
        element: <PrivateRoute>
          <AdoptionRequest />
        </PrivateRoute>

      },
      {
        path: 'add-donation',
        element: <PrivateRoute>
          <AddDonationCampaign />
        </PrivateRoute>

      },
      {
        path: 'my-donation-campaigns',
        element: <PrivateRoute>
          <MyDonationCampaign />
        </PrivateRoute>
      },
      {
        path: 'edit-donation/:id',
        element: <PrivateRoute>
          <EditDonationCampaign />
        </PrivateRoute>

      },
      {
        path: 'my-donation',
        element: <PrivateRoute>
          < MyDonationList />
        </PrivateRoute>
      },
      {
        path: 'my-donation-donar',
        element: <PrivateRoute>
          <MyCampaignDonors />
        </PrivateRoute>
      },
      {
        path: 'all-pet-lists',
        element: <PrivateRoute>
          <AllPetLists />
        </PrivateRoute>
      },
      {
        path: 'all-donation-lists',
        element: <PrivateRoute>
          <AllDonationLists />
        </PrivateRoute>
      },
    ],
  },
])