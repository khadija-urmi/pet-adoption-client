import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import moment from "moment/moment";
import DonationPayModal from "../Modal/DonationPayModal/DonationPayModal";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const DonationDetails = () => {
    const { id } = useParams();
    const [openDonateModal, setOpenDonateModal] = useState(true);
    const [selectedDonation, setSelectedDonation] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { data: singleDataDonation = {} } = useQuery({
        queryKey: ['singleDataDonation', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/my-donations-camp/${id}`);
            return res.data;
        },
    });

    const openDonationModal = (donation) => {
        setSelectedDonation(donation);
        setOpenDonateModal(true);
    };

    const formatLastDate = moment(singleDataDonation?.lastDate).format('dddd, MMMM Do YYYY, h:mm A');
    return (
        <>
            <Helmet>
                <title>WoofWow | DonationDetails</title>
            </Helmet>
            <div className="flex justify-center items-center min-h-screen">
                <div className="max-w-3xl bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                    <img className="rounded-t-lg w-full h-[400px] object-cover" src={singleDataDonation?.petPicture} alt={singleDataDonation?.petName} />
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
                        <button onClick={() => openDonationModal(singleDataDonation)} className="inline-flex items-center px-8 py-3 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6">
                            Donate Now
                        </button>
                        {
                            selectedDonation && (
                                <DonationPayModal
                                    open={openDonateModal}
                                    setOpen={setOpenDonateModal}
                                    donation={singleDataDonation}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default DonationDetails;
