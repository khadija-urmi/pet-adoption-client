import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import SweetPagination from "sweetpagination";
import usePet from "../../../hooks/usePet";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoLogoOctocat } from "react-icons/io";

const MyAddedPet = () => {
    const [currentPageData, setCurrentPageData] = useState([]);
    const [PetInfo] = usePet();


    const handleUpdate = (petId) => {

        console.log("Updating pet with ID:", petId);
    };

    const handleDelete = (petId) => {
        console.log("Deleting pet with ID:", petId);
    };

    const handleAdopt = (petId) => {
        console.log("Adopting pet with ID:", petId);
    };

    return (
        <div>
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
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Pet Image</th>
                            <th scope="col" className="px-6 py-3">Adoption Status</th>
                            <th scope="col" className="px-6 py-3">Update</th>
                            <th scope="col" className="px-6 py-3">Delete</th>
                            <th scope="col" className="px-6 py-3">Adopt Now</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PetInfo && PetInfo.length > 0 ? (
                            currentPageData.map((pet, index) => (
                                <tr key={pet._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">{pet.petName}</td>
                                    <td className="px-6 py-4">{pet.petCategory}</td>
                                    <td className="px-6 py-4">
                                        <img src={pet.petImage} alt={pet.petName} className="w-16 h-16 object-cover rounded-md" />
                                    </td>
                                    <td className="px-6 py-4">{pet.adopted ? "Adopted" : "Not Adopted"}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleUpdate(pet._id)}
                                            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                                            aria-label="Update pet details"
                                        >
                                            <span className="relative px-5 py-2.5 flex justify-between items-center transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Update <FaEdit className="w-4 h-4 ml-2" />
                                            </span>
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDelete(pet._id)}
                                            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                                            aria-label="Delete pet"
                                        >
                                            <span className="relative flex justify-between items-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Delete
                                                <RiDeleteBin6Line className="w-4 h-4 ml-2" />
                                            </span>
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        {!pet.adopted && (
                                            <button
                                                onClick={() => handleAdopt(pet._id)}
                                                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                                                aria-label="Adopt pet"
                                            >
                                                <span className="relative px-5 py-2.5 flex
                                                justify-between items-center
                                                transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                    Adopt <IoLogoOctocat className="w-4 h-4 ml-2" />
                                                </span>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center">
                                    No pets available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <SweetPagination
                currentPageData={setCurrentPageData}
                getData={PetInfo}
                dataPerPage={10}
            />
        </div>
    );
};

export default MyAddedPet;
