import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const MyDonation = () => {
    const { currentUser } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: donations = [] } = useQuery({
        queryKey: ['donations', currentUser?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/save-donation-pay/${currentUser.email}`)
            return res.data;
        }
    })
    return (
        <div>
            <h2 className="text3-xl">Total Payments: {donations.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>price</th>
                            <th>Transaction Id</th>
                            <th>Donation Campaign</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation, index) => <tr key={donation._id}>
                            <th>{index + 1}</th>
                            <td>${donation.price}</td>
                            <td>{donation.transactionId}</td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDonation;
