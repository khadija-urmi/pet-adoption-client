import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import { RiAdminFill } from "react-icons/ri";
import { Helmet } from "react-helmet-async";


const AllUser = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: userInfo = [] } = useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });
    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success("Successfully make user Admin ")
                }
            })
    }
    return (
        <div>
            <Helmet>
                <title>All User | WoofWow</title>
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
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userInfo.map((user) => (
                                <tr key={user.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">

                                    <td className="px-6 py-4">
                                        {user?.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user?.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user?.role === "admin" ? <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn btn-lg p-2 bg-purple-500 rounded-md flex justify-center items-center">
                                            <RiAdminFill className="text-white 
                                        w-4 h-4 rounded-md"></RiAdminFill>
                                            <span className="text-white">Admin</span>
                                        </button> :
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="btn btn-lg p-2 bg-purple-500 rounded-md flex justify-center items-center">
                                                <FaUser className="text-white 
                                        w-4 h-4 rounded-md"></FaUser>
                                                <span className="text-white">User</span>
                                            </button>

                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default AllUser;