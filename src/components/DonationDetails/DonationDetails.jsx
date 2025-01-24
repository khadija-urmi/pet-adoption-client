import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment/moment";

const DonationDetails = () => {
    const { id } = useParams();

    const { data: singleDataDonation = {} } = useQuery({
        queryKey: ['singleDataDonation', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/my-donations-camp/${id}`);
            return res.data;
        },
    });

    const formatLastDate = moment(singleDataDonation?.lastDate).format('dddd, MMMM Do YYYY, h:mm A');
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="max-w-3xl bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg w-full h-80 object-cover" src={singleDataDonation?.petPicture} alt={singleDataDonation?.petName} />
                <div className="p-6">
                    <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{singleDataDonation?.petName}</h5>
                    <p className="mb-2 text-lg font-normal text-gray-700 dark:text-gray-400">{singleDataDonation?.shortDescription}</p>
                    <p className="mb-4 text-lg font-normal text-gray-700 dark:text-gray-400">{singleDataDonation?.longDescription}</p>
                    <div className="flex justify-between mt-3">
                        <p className="font-bold text-lg text-gray-700 dark:text-gray-400">Donation Need: ${singleDataDonation?.maxDonationAmount}</p>
                        <p className="font-bold text-lg text-gray-700 dark:text-gray-400">Collected Donation: ${singleDataDonation?.totalDonationAmount}</p>
                    </div>

                    <div className="flex justify-between mt-3">
                        <div className=" text-gray-700 text-lg dark:text-gray-400">
                            <span className="font-bold">End Date:</span> {formatLastDate}
                        </div>
                        <p className=" text-gray-700 dark:text-gray-400 text-lg"><span className="font-bold">Status : </span>{singleDataDonation?.completed ? "Donation Complete" : "Need Donation "}</p>
                    </div>
                    <button href="#" className="inline-flex items-center px-8 py-3 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6">
                        Donate Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DonationDetails;
