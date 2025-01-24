import useDonation from "../../../hooks/useDonation";
import { FaPauseCircle } from 'react-icons/fa';
import { RiEditCircleFill } from "react-icons/ri";
import noDataFoundImg from "../../../assets/noDataFound.png";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaPlayCircle } from "react-icons/fa";
const MyDonationCampaign = () => {
    const [DonationInfo, refetch] = useDonation();

    const calculateProgress = (donatedAmount, maxDonationAmount) => {
        return (donatedAmount / maxDonationAmount) * 100;
    };

    const togglePause = async (donationId, currentState) => {
        const newPauseState = !currentState;
        await axios.patch(
            `http://localhost:5000/donations-camp-pause/${donationId}`,
            { pause: newPauseState }
        );
        toast.success(`Now This donation is now ${newPauseState ? 'paused 🛑' : 'resumed 👍'} `);
        refetch();
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
                        <th scope="col" className="px-6 py-3">Pet Name</th>
                        <th scope="col" className="px-6 py-3">Pet Image</th>
                        <th scope="col" className="px-6 py-3">Max Donation</th>
                        <th scope="col" className="px-6 py-3">Total Donation</th>
                        <th scope="col" className="px-6 py-3">Progress Bar</th>
                        <th scope="col" className="px-6 py-3">Edit</th>
                        <th scope="col" className="px-6 py-3">Pause</th>
                    </tr>
                </thead>
                <tbody>
                    {DonationInfo && DonationInfo.length > 0 ? (
                        DonationInfo.map((donationEvent, index) => {
                            const progress = calculateProgress(donationEvent.totalDonationAmount, donationEvent.maxDonationAmount);
                            return (
                                <tr key={donationEvent._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">{donationEvent.petName}</td>
                                    <td className="px-6 py-4">
                                        <img src={donationEvent.petPicture} alt={donationEvent.petName} className="w-12 h-12 object-cover rounded-full" />
                                    </td>
                                    <td className="px-6 py-4">${donationEvent.maxDonationAmount}</td>
                                    <td className="px-6 py-4">${donationEvent.totalDonationAmount}</td>
                                    <td className="px-6 py-4">
                                        <div className="mb-1 text-base font-medium text-black">
                                            Donation Progress
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                                            <div
                                                className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        {/* edit button */}
                                        <Link to={`/dashboard/edit-donation/${donationEvent._id}`}>
                                            <button className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-800">
                                                <RiEditCircleFill />
                                            </button>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        {/* pause Button */}
                                        <button
                                            onClick={() => togglePause(donationEvent._id, donationEvent.pause)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        >
                                            {donationEvent.pause ? <FaPlayCircle /> : <FaPauseCircle />}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="8" className="px-6 py-4 text-center">
                                <img src={noDataFoundImg} className="w-56 h-48 mx-auto" alt="No data found" />
                                <p className="text-gray-500 text-3xl mt-2">No donations available</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyDonationCampaign;
