import { useQuery } from "@tanstack/react-query";
import { LiaSpinnerSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";



const DonationList = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allDonation = [], isLoading } = useQuery({
        queryKey: ['allDonation'],
        queryFn: async () => {
            const res = await axiosSecure.get('/donations');
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
        <>
            <Helmet>
                <title>WoofWow | Donations</title>
            </Helmet>
            <div className="container mx-auto p-6">
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto"
                >
                    {allDonation.map((donation) => {
                        return (
                            <div
                                key={donation._id}
                                className="bg-white p-4 rounded-lg shadow-lg flex flex-col"
                            >
                                <img
                                    src={donation.petPicture}
                                    alt="Event Image"
                                    className="w-full h-48 object-center rounded-lg mb-4 hover:scale-110"
                                />
                                <h2 className="text-2xl text-gray-900 font-bold">{donation.petName}</h2>
                                <p className="text-gray-600 mt-2">{donation.shortDescription}</p>

                                <div className="mt-3 flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-600">Max Donation: ${donation.maxDonationAmount}</p>
                                    </div>
                                    <Link
                                        to={`/donation/${donation._id}`}
                                        className={`bg-blue-500 px-6 py-3 hover:bg-blue-700 text-white rounded-md text-sm font-semibold ${donation?.pause ? "cursor-not-allowed opacity-50" : ""} `}
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default DonationList;
