import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaPaw } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { LuHeartHandshake } from "react-icons/lu";
import { RiBubbleChartFill } from "react-icons/ri";
import { TbVaccine } from "react-icons/tb";



const PetDetails = () => {
    const { id } = useParams();
    const { data: singlePetInfo = {} } = useQuery({
        queryKey: ['singlePetInfo', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/my-added-pet/${id}`);
            return res.data;
        },
    });
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="max-w-3xl bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg w-full h-[400px] object-cover" src={singlePetInfo?.petImage} alt={singlePetInfo?.petName} />
                <div className="p-6">
                    <div className="flex flex-col justify-between p-3 leading-normal">
                        <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white leading-loose">
                            Meet the {singlePetInfo?.petName}
                        </h5>
                        <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                            <SlCalender className="w-6 h-6 text-cyan-500 mr-2" />
                            <span className="font-bold">Age </span> : {singlePetInfo?.petAge}
                        </p>
                        <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                            <FaMapMarkerAlt className="w-6 h-6 text-cyan-500 mr-2" />
                            <span className="font-bold">Location: </span> {singlePetInfo?.petLocation}
                        </p>
                        <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                            <RiBubbleChartFill className="w-6 h-6 text-cyan-500 mr-2" />
                            <span className="font-bold">About : </span>
                            {singlePetInfo?.shortDescription}
                        </p>
                        <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                            <TbVaccine className="w-6 h-6 text-cyan-500 mr-2" />
                            <span className="font-bold">Vaccinated : </span> {singlePetInfo?.
                                vaccinated}
                        </p>
                        <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                            <FaPaw className="w-6 h-6 text-cyan-500 mr-2" />
                            Special Needs pet
                        </p>
                        <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 flex items-center">
                            <LuHeartHandshake className="w-6 h-6 text-cyan-500 mr-2" />
                            Friendly to other animals
                        </p>
                    </div>
                </div>
                <div>
                    <h2 className="text-4xl font-bold mb-2 tracking-tight text-gray-900 dark:text-white leading-loose">About me</h2>
                    <p className="text-lg mb-3 font-normal text-gray-700 dark:text-gray-400">{singlePetInfo?.petFullDetail}</p>
                </div>
                <Link to={`${singlePetInfo?._id}`}>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition duration-300 ease-in-out transform hover:scale-105">
                        Adopt Me
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PetDetails;