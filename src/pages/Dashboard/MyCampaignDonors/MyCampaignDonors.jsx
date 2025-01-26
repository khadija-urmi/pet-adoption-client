import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const MyCampaignDonors = () => {
    const { data: donarList = [] } = useQuery({
        queryKey: ['donarList',],
        queryFn: async () => {
            const res = await useAxiosSecure.get(`/my-donar-camp-list/${donarCampId}`)
            return res.data;
        }
    })
    return (
        <div>
            <h2 className="text-3xl text-center py-4 mb-8 bg-gray-200">Total Payments: {donarList.length}</h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                Serial no
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                Transaction Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                donar Campaign
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {donarList.map((donar, index) =>
                            <tr key={donar._id} className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4">
                                    {donar?.donarAmount}
                                </td>
                                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                    {donar?.transactionId}
                                </td>
                                <td className="px-6 py-4">
                                    {donar?.donarEventName}
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