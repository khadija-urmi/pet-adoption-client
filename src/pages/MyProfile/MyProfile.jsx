import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { uploadImageToServer } from "../../api/utils";
import toast from "react-hot-toast";

const MyProfile = () => {
  const { currentUser, updateUserProfile } = useAuth();

  const [username, setUsername] = useState(currentUser?.displayName || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    currentUser?.phoneNumber || ""
  );
  const [address, setAddress] = useState(currentUser?.address || "");
  const [photo, setPhoto] = useState(currentUser?.photoURL || "");
  const [newPhoto, setNewPhoto] = useState(null);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewPhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        username !== currentUser?.displayName ||
        email !== currentUser?.email
      ) {
        await updateUserProfile(username, currentUser?.photoURL);
      }

      if (
        phoneNumber !== currentUser?.phoneNumber ||
        address !== currentUser?.address
      ) {
        console.log("Update phone number and address", phoneNumber, address);
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
      <Helmet>
        <title>My Profile</title>
      </Helmet>
      <div className="w-full max-w-xl mx-auto bg-white border border-gray-200 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 mt-14">
        <div className="max-w-lg mx-auto flex flex-col items-center mt-6 pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={photo}
            alt="User image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {username}
          </h5>

          <div className="w-full text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Email: {email}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Phone: {phoneNumber || "Not provided"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Address: {address || "Not provided"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full mt-6">
            {/* Username Field */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Updated Name"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Email Address"
                required
              />
            </div>

            {/* Phone Number Field */}
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Phone Number
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Phone Number"
              />
            </div>

            {/* Address Field */}
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={handleAddressChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Address"
              />
            </div>

            {/* Profile Image Upload */}
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Upload New Profile Picture
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                type="file"
                onChange={handleFileChange}
              />
            </div>

            <div className="mt-6">
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
