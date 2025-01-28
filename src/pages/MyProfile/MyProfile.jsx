import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { uploadImageToServer } from "../../api/utils";
import toast from "react-hot-toast";

const MyProfile = () => {
    const { currentUser, updateUserProfile } = useAuth();
    const [username, setUsername] = useState(currentUser?.displayName || "");
    const [photo, setPhoto] = useState(currentUser?.photoURL || "");
    const [newPhoto, setNewPhoto] = useState(null);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewPhoto(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (username !== currentUser?.displayName) {
                await updateUserProfile(username, currentUser?.photoURL);
            }
            if (newPhoto) {
                const imageURL = await uploadImageToServer(newPhoto);
                await updateUserProfile(username, imageURL);
                setPhoto(imageURL);
            }
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error updating profile");
        }
    };

    return (
        <div>
            <Helmet><title>My Profile</title></Helmet>
            <div className="w-full h-screen max-w-xl mx-auto bg-white border border-gray-200 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="max-w-lg mx-auto flex flex-col items-center mt-6 pb-10">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={photo} alt="User image" />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{username}</h5>
                    <form onSubmit={handleSubmit} className="w-full">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User name</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Your Updated Name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload file</label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                id="file_input"
                                type="file"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="mt-4 md:mt-6">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
