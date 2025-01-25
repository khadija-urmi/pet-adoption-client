import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const MyDonation = () => {
    const { currentUser } = useAuth();
    //const axiosSecure = useAxiosSecure();

    const { data: donations = [] } = useQuery({
        queryKey: ['donations', currentUser?.email],
        queryFn: async () => {
            // const res = await axiosSecure.get(`/save-donation-pay/${currentUser.email}`)
            //return res.data;
        }
    })
    console.log(donations)
    return (
        <div>
            <h2 className="text3-xl">Total Payments: {donations.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Serial no</th>
                            <th>Price</th>
                            <th>Transaction Id</th>
                            <th>Donation Campaign</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation, index) => <tr key={donation._id}>
                            <th>{index + 1}</th>
                            <td>{donation?.donationAmount}</td>
                            <td>{donation?.transactionId}</td>
                            <td>{donation?._id}</td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDonation;
