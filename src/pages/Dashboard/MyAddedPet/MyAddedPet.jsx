import { useState } from "react";
import SweetPagination from "sweetpagination";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoLogoOctocat, IoMdCheckmark } from "react-icons/io";
import usePet from "../../../hooks/usePet";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const MyAddedPet = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPageData, setCurrentPageData] = useState([]);
    const [PetInfo] = usePet();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletePetId, setDeletePetId] = useState(null);
    const navigate = useNavigate();

    const handleUpdate = (petId) => {
        console.log(petId)
        navigate(`/dashboard/my-edit-pet/${petId}`)
    };

    const handleDelete = (petId) => {
        setDeletePetId(petId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await axiosSecure.delete(`/pets/${deletePetId}`);
            toast.success("Pet deleted successfully");
            setShowDeleteModal(false);
            setCurrentPageData(currentPageData.filter(pet => pet._id !== deletePetId));
        } catch (error) {
            console.error("Error deleting pet:", error);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
    };

    const handleAdopt = async (petId) => {
        try {
            await
                axios.patch(`http://localhost:5000/pet-adopted/${petId}`);
            const updatedPetInfo = PetInfo.map(pet =>
                pet._id === petId ? { ...pet, adopted: true } : pet
            );
            setCurrentPageData(updatedPetInfo);
            toast.success("Now This Pet is Adopted 👍")
        } catch (error) {
            console.error("Error adopting pet:", error);
            toast.error("Failed to Adopted The Pet 💔")
        }
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
                            <th scope="col" className="px-6 py-3">Adopt Status</th>
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
                                        {
                                            !pet.adopted ? (
                                                <button
                                                    onClick={() => handleAdopt(pet._id)}
                                                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                                                    aria-label="Adopt pet"
                                                >
                                                    <span className="relative px-5 py-2.5 flex justify-between items-center transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                        Adopt <IoLogoOctocat className="w-4 h-4 ml-2" />
                                                    </span>
                                                </button>
                                            ) : (
                                                <button
                                                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-200 via-green-300 to-yellow-200 group-hover:from-green-200 group-hover:via-green-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-green-100 dark:focus:ring-green-400"
                                                    aria-label="Adopted pet"
                                                >
                                                    <span className="relative px-5 py-2.5 flex justify-between items-center transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                        Adopted <IoMdCheckmark className="w-4 h-4 ml-2" />
                                                    </span>
                                                </button>
                                            )
                                        }
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

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-lg font-semibold text-center">Are you sure you want to delete this pet?</h3>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={confirmDelete}  // Confirm delete action
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            >
                                Yes
                            </button>
                            <button
                                onClick={cancelDelete}  // Cancel the delete action
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <SweetPagination
                currentPageData={setCurrentPageData}
                getData={PetInfo}
                dataPerPage={10}
            />
        </div>
    );
};

export default MyAddedPet;
