import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const AdoptionRequest = () => {
  const { currentUser } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: adoptReqInfo, refetch } = useQuery({
    queryKey: ["adoptReqInfo"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/adopt-pet/${currentUser?.email}`);
      return res.data;
    },
  });

  const handleAdoptionStatusChange = async (adoptUserId) => {
    await axiosPublic.patch(`/pet-adopted-req/${adoptUserId}`, {
      adopted: true,
    });
    refetch();
    toast.success("Adoption request accepted!");
  };

  return (
    <div>
      <Helmet>
        <title>Adoption Request | WoofWow</title>
      </Helmet>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone No
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {adoptReqInfo?.map((adoptUser) => (
              <tr
                key={adoptUser._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {adoptUser?.userName}
                </td>
                <td className="px-6 py-4">{adoptUser?.userEmail}</td>
                <td className="px-6 py-4">{adoptUser?.phoneNumber}</td>
                <td className="px-6 py-4">{adoptUser?.address}</td>
                <td className="px-6 py-4">
                  <button
                    className="mr-2 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                    onClick={() => handleAdoptionStatusChange(adoptUser._id)}
                  >
                    Accept
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdoptionRequest;
