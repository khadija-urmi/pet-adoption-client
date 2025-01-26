import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import noDataFoundImg from "../../../assets/noDataFound.png";

const MyCampaignDonors = () => {
    const { currentUser } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch donation data for the current user
    const { data: donationData = [] } = useQuery({
        queryKey: ['donationData', currentUser?.email],
        queryFn: async () => {
            if (currentUser?.email) {
                const res = await axiosSecure.get(`/donations/${currentUser?.email}`);
                console.log("donationData:", res.data);  // Check what data is returned
                return res.data;
            }
            return [];
        }
    });

    // Extract donationCampIds
    const donationCampId = donationData.map(({ _id }) => _id);
    console.log("donationCampId:", donationCampId);
    const { data: donarLists = [], } = useQuery({
        queryKey: ['donarLists', donationCampId],
        queryFn: async () => {
            const donationCampIds = Array.isArray(donationCampId) ? donationCampId : [donationCampId];
            const res = await axiosSecure.get(`/my-donar-camp-list/${donationCampIds.join(',')}`);
            // console.log("donarList:", res);
            return res.data;
        },
        enabled: donationCampId.length > 0,
        staleTime: 0,
    });
    console.log("result", donarLists)

    return (
        <div>
            <h2 className="text-3xl text-center py-4 mb-8 bg-gray-200">My event Donor :{donarLists.length}</h2>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                Serial No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Donation Camp Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Donar
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                Donation Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {donarLists && donarLists.length > 0 ? (
                            donarLists.map((singleDonar, index) => {
                                return (
                                    <tr key={singleDonar._id} className="border-b border-gray-200 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                            {index + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            {singleDonar.donationEventName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {singleDonar.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {singleDonar.donationAmount}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="8" className="px-6 py-4 text-center">
                                    <img src={noDataFoundImg} className="w-56 h-48 mx-auto" alt="No data found" />
                                    <p className="text-gray-500 text-3xl mt-2">No donations available</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyCampaignDonors;
