import { useState } from "react";
import { Card, Dropdown } from "flowbite-react";
import { useAuth } from "../../hooks/useAuth";
import { uploadImageToServer } from "../../api/utils";
import userImage from "../../assets/user.png";

const MyProfile = () => {
    const { currentUser, updateUserProfile } = useAuth();
    const [name, setName] = useState(currentUser?.name || "");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(currentUser?.profilePicture || userImage);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file); // Store the image file in state
        setImageUrl(URL.createObjectURL(file)); // Display the selected image before uploading it
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let uploadedImageUrl = imageUrl;

        if (image) {
            try {
                // Upload image
                uploadedImageUrl = await uploadImageToServer(image); // Upload the image and get the URL
            } catch (err) {
                console.error("Error uploading image:", err);
                return;
            }
        }

        // Update user profile (assuming you have a function for that)
        const updatedUserData = {
            name,
            profilePicture: uploadedImageUrl,
        };

        try {
            // Assuming updateUserProfileProfile is a method in your context to update the user's profile
            if (updateUserProfile) {
                await updateUserProfile(updatedUserData);
                alert('Profile updated successfully');
            }
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    return (
        <Card className="max-w-sm">
            <div className="flex justify-end px-4 pt-4">
                <Dropdown inline label="">
                    <Dropdown.Item>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Edit
                        </a>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Export Data
                        </a>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Delete
                        </a>
                    </Dropdown.Item>
                </Dropdown>
            </div>
            <div className="flex flex-col items-center pb-10">
                <form onSubmit={handleSubmit} className="w-full text-center">
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Update Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Update Profile Image
                        </label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="mt-2 w-full text-sm text-gray-700 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-3">
                        <img
                            alt="Profile"
                            src={imageUrl}
                            className="mb-3 rounded-full shadow-lg w-24 h-24 object-cover"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 py-2 px-6 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </Card>
    );
};

export default MyProfile;
