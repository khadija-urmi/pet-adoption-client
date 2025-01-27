import { FaEdit, FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AllDonationLists = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { data: allDonation = {}, isLoading, refetch } = useQuery({
        queryKey: ['allDonation',],
        queryFn: async () => {
            const res = await axiosSecure.get("/donations");
            return res.data;
        },
    });

    const handleUpdate = (donationId) => {
        console.log("update", donationId);
        navigate(`/dashboard/edit-donation/${donationId}`)
    }

    const handleDelete = async (donationId) => {
        console.log(donationId)
        try {
            await axiosSecure.delete(`/my-donations-camp/${donationId}`);
            toast.success("Donation deleted successfully!");
            refetch();
        } catch (error) {
            console.error('Error deleting donation:', error);
            toast.error('Failed to delete donation');
        }
    }

    const handleTogglePause = async (donationId, currentState) => {
        const newPauseState = !currentState;
        try {
            await axios.patch(
                `http://localhost:5000/donations-camp-pause/${donationId}`,
                { pause: newPauseState }
            );
            toast.success(`This donation is now ${newPauseState ? 'paused 🛑' : 'resumed 👍'}`);
            refetch();
        } catch (error) {
            console.error('Error toggling pause state:', error);
            toast.error('Failed to update pause state');
        }
    }

    if (isLoading) {
        return (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4"></th>
                            <th scope="col" className="px-6 py-3">Donation Name</th>
                            <th scope="col" className="px-6 py-3">Donation Owner</th>
                            <th scope="col" className="px-6 py-3">Pet Image</th>
                            <th scope="col" className="px-6 py-3">Update</th>
                            <th scope="col" className="px-6 py-3">Delete</th>
                            <th scope="col" className="px-6 py-3">Pause</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="7" className="px-6 py-4 text-center">
                                <Skeleton count={5} height={30} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <label className="sr-only">Serial No</label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">Donation Name</th>
                        <th scope="col" className="px-6 py-3">Donation Owner</th>
                        <th scope="col" className="px-6 py-3">Pet Image</th>
                        <th scope="col" className="px-6 py-3">Update</th>
                        <th scope="col" className="px-6 py-3">Delete</th>
                        <th scope="col" className="px-6 py-3">Pause</th>
                    </tr>
                </thead>
                <tbody>
                    {allDonation && allDonation.length > 0 ? (
                        allDonation.map((donation, index) => (
                            <tr key={donation._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4">{donation.petName}</td>
                                <td className="px-6 py-4">{donation.EventOwnerEmail}</td>
                                <td className="px-6 py-4">
                                    <img src={donation.petPicture} alt={donation.petName} className="w-16 h-16 object-cover rounded-md" />
                                </td>

                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleUpdate(donation._id)}
                                        className="px-4 py-2.5 rounded-lg bg-pink-600 text-white hover:bg-pink-800"
                                        aria-label="Update donation details"
                                    >
                                        <FaEdit />
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleDelete(donation._id)}
                                        className="px-4 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-800"
                                        aria-label="Delete donations"
                                    >
                                        <RiDeleteBin6Line />
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleTogglePause(donation._id, donation.pause)}
                                        className="px-4 py-2.5 rounded-lg bg-yellow-300 text-white hover:bg-yellow-500"
                                        aria-label="Pause Donation"
                                    >
                                        {donation.pause ? <FaPlayCircle /> : <FaPauseCircle />}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-4 text-center">
                                No donations available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AllDonationLists;