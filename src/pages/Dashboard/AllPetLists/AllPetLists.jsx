import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const AllPetLists = () => {
    const { data: allPetInfo = [] } = useQuery({
        queryKey: ['allPetInfo'],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/pets");
            return res.data;
        },
    });

    console.log(allPetInfo);
    const handleUpdate = (petId) => {

        console.log("Updating pet with ID:", petId);
    };

    const handleDelete = (petId) => {
        console.log("Deleting pet with ID:", petId);
    };
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Pet Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Pet Image
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Owner Email
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Update
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {allPetInfo.map((pet) => (
                        <tr key={pet._id} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                {pet?.petName}
                            </td>
                            <td className="px-6 py-4">
                                <img src={pet.petImage} alt={pet.petName} className="w-16 h-16 object-cover rounded" />
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                {pet?.OwnerEmail}
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                {pet?.adopted ? "Adopted" : "Not adopted"}
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                <button
                                    onClick={() => handleUpdate(pet._id)}
                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
                                    aria-label="Update pet details"
                                >
                                    <span className="relative px-2 py-2 flex justify-between items-center transition-all ease-in duration-75  dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        Update <FaEdit className="w-3 h-3 ml-2" />
                                    </span>
                                </button>
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                <button
                                    onClick={() => handleDelete(pet._id)}
                                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
                                    aria-label="Delete pet"
                                >
                                    <span className="relative flex justify-between items-center px-3 py-3 transition-all ease-in duration-75  dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        Delete
                                        <RiDeleteBin6Line className="w-3 h-3 ml-2" />
                                    </span>
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllPetLists;
