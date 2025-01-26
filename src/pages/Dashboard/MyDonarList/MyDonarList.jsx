import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyDonarList = () => {
    const { currentUser } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: donations = [] } = useQuery({
        queryKey: ['donations', currentUser?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-donation/${currentUser.email}`)
            return res.data;
        }
    })
    return (
        <div>
            <h2 className="text-3xl text-center py-4 mb-8 bg-gray-200">Total Payments: {donations.length}</h2>
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
                                Donation Campaign
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation, index) =>
                            <tr key={donation._id} className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4">
                                    {donation?.donationAmount}
                                </td>
                                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                    {donation?.transactionId}
                                </td>
                                <td className="px-6 py-4">
                                    {donation?.donationEventName}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDonarList;