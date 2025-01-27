import { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import { IoMdClose } from "react-icons/io";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const AdoptPetModal = ({ open, setOpen, pet }) => {
    const { currentUser } = useAuth();
    const axiosPublic = useAxiosPublic();
    console.log(pet);

    const [formData, setFormData] = useState({
        petId: "",
        petName: "",
        petImage: "",
        OwnerEmail: "",
        userName: currentUser?.displayName || "",
        userEmail: currentUser?.email || "",
        phoneNumber: "",
        address: "",
    });

    useEffect(() => {
        if (pet) {
            setFormData({
                petId: pet._id || "",
                petName: pet.petName || "",
                petImage: pet.petImage || "",
                OwnerEmail: pet.OwnerEmail || "",
                userName: currentUser?.displayName || "",
                userEmail: currentUser?.email || "",
                phoneNumber: "",
                address: "",
            });
        }
    }, [pet, currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosPublic.post("/adopt-pet", formData);
            toast.success("Successfully sent Adoption Request 🎉");
            setOpen(false);
        } catch (error) {
            console.error("Error submitting adoption request", error);
        }
    };


    return (
        <Modal show={open} onClose={() => setOpen(false)}>
            <Modal.Body>
                <div className="flex flex-col items-center">
                    <h5 className="mb-4 text-xl font-bold text-gray-900">{`Adopt ${formData?.petName}`}</h5>

                    <form onSubmit={handleSubmit} className="w-full max-w-md p-4 space-y-4">
                        <div className="mb-4">
                            {formData?.petImage && <img src={formData?.petImage} alt={formData?.petName} className="w-full h-48 object-cover" />}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="petId" className="block text-sm font-medium text-gray-700 dark:text-white">
                                Pet ID
                            </label>
                            <p className="w-full p-3 border border-gray-300 rounded-lg shadow-sm">{formData?.petId}</p>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="petName" className="block text-sm font-medium text-gray-700 dark:text-white">
                                Pet Name
                            </label>
                            <p className="w-full p-3 border border-gray-300 rounded-lg shadow-sm">{formData?.petName}</p>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 dark:text-white">
                                User Name
                            </label>
                            <p className="w-full p-3 border border-gray-300 rounded-lg shadow-sm">{formData.userName}</p>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">
                                Email
                            </label>
                            <p className="w-full p-3 border border-gray-300 rounded-lg shadow-sm">{formData?.userEmail}</p>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-white">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                value={formData?.phoneNumber}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-white">
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={formData?.address}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your address"
                            />
                        </div>

                        <div className="flex justify-between gap-4">
                            <button
                                type="submit"
                                disabled={!currentUser}
                                className={`text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 flex justify-center items-center ${!currentUser ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 flex justify-center items-center"
                            >
                                <IoMdClose className="text-xl" />
                                <span>Close</span>
                            </button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
};

AdoptPetModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    pet: PropTypes.shape({
        _id: PropTypes.string,
        petName: PropTypes.string,
        petImage: PropTypes.string,
        OwnerEmail: PropTypes.string
    }).isRequired
};

export default AdoptPetModal;
