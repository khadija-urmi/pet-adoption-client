import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const { currentUser } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin } = useQuery({
        queryKey: [currentUser?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${currentUser.email}`);
            return res.data?.admin;
        }
    })
    return [isAdmin];
};

export default useAdmin;