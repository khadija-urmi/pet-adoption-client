import { LiaSpinnerSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const DonationCampaign = () => {
    const axiosSecure = useAxiosSecure();

    console.log("Axios secure is", axiosSecure.defaults);

    const { data: allDonation = [], isLoading } = useQuery({
        queryKey: ['allDonation'],
        queryFn: async () => {
            const res = await axiosSecure.get('/donations');
            console.log("All donation", res.data);
            return res.data;
        }
    })

    if (isLoading) {
        return (
            <button
                disabled
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            >
                <LiaSpinnerSolid className="w-12 h-10 animate-spin text-white m-auto" />
                Loading...
            </button>
        );
    }
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Donation Campaigns</h1>
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto"
            >
                {allDonation.map((donation) => {
                    return (
                        <div
                            key={donation.id}
                            className="bg-white p-4 rounded-lg shadow-lg flex flex-col"
                        >
                            <img
                                src={donation.petPicture}
                                alt="Event Image"
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-2xl text-gray-900 font-bold">{donation.petName}</h2>
                            <p className="text-gray-600">{donation.shortDescription}</p>

                            <div className="mt-4 flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-600">Max Donation: ${donation.maxDonationAmount}</p>
                                </div>
                                <Link
                                    to={`/donation-campaign/${donation.id}`}
                                    className="text-blue-500 hover:text-blue-700 text-sm font-semibold"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DonationCampaign;