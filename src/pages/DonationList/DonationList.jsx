import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { MagnifyingGlass } from "react-loader-spinner";

const DonationList = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allDonation = [], isLoading } = useQuery({
    queryKey: ["allDonation"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{}}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>WoofWow | Donations</title>
      </Helmet>
      <div className="mx-auto p-6 dark:bg-gray-800 mt-12">
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
          {allDonation.map((donation) => {
            return (
              <div
                key={donation._id}
                className="bg-white p-4 rounded-lg shadow-lg flex flex-col dark:bg-gray-800 dark:text-white"
              >
                <img
                  src={donation.petPicture}
                  alt="Event Image"
                  className="w-full h-48 object-center rounded-lg mb-4 hover:scale-110 dark:hover:scale-105"
                />
                <h2 className="text-2xl text-gray-900 font-bold dark:text-white">
                  {donation.petName}
                </h2>
                <p className="text-gray-600 mt-2 dark:text-gray-400">
                  {donation.shortDescription}
                </p>

                <div className="mt-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Max Donation: ${donation.maxDonationAmount}
                    </p>
                  </div>
                  <Link
                    to={`/donation/${donation._id}`}
                    className={`bg-blue-500 px-6 py-3 hover:bg-blue-700 text-white rounded-md text-sm font-semibold ${
                      donation?.pause ? "cursor-not-allowed opacity-50" : ""
                    } dark:bg-blue-600 dark:hover:bg-blue-500`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DonationList;
