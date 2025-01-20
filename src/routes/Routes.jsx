import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import PetListing from "../pages/PetListing/PetListing";
import DonationCampaign from "../pages/Dashboard/DonationCampaign/DonationCampaign";
import About from "../pages/Home/About/About";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../pages/MyProfile/MyProfile";
import DashboardLayout from "../layouts/DashboardLayout";
import Statistics from "../pages/Statistics/Statistics";
import AddPet from "../pages/Dashboard/AddPet/AddPet";
import AllUser from "../pages/Dashboard/AllUser/AllUser";
import MyAddedPet from "../pages/Dashboard/MyAddedPet/MyAddedPet";
import MyDonationCampaign from "../pages/Dashboard/MyDonationCampaign/MyDonationCampaign";
import AdoptionRequest from "../pages/Dashboard/AdoptionRequest/AdoptionRequest";
import MyDonation from "../pages/Dashboard/MyDonation/MyDonation";

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
        path: "/donation",
        element: <DonationCampaign />,
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
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-pet',
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
        path: 'adoption-request',
        element: <AdoptionRequest />
      },
      {
        path: 'add-donation',
        element: <DonationCampaign />,
      },
      {
        path: 'my-donation-campaigns',
        element: <MyDonationCampaign />,
      },
      {
        path: 'my-donation',
        element: <MyDonation />,
      },
    ],
  },
])