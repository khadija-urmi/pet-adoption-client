import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const usePet = () => {
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useAuth();
    const { refetch, data: PetInfo = [] } = useQuery({
        queryKey: ['PetInfo', currentUser?.email],
        queryFn: async () => {
            if (currentUser?.email) {
                const res = await axiosSecure.get(`/pets/${currentUser.email}`);
                return res.data;
            }
            return [];
        },
    });
    return [PetInfo, refetch]
}
export default usePet;