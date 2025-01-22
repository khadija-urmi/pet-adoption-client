import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useDonation = () => {
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useAuth();
    const { refetch, data: DonationInfo = [] } = useQuery({
        queryKey: ['DonationInfo', currentUser?.email],
        queryFn: async () => {
            if (currentUser?.email) {
                const res = await axiosSecure.get(`/donations/${currentUser.email}`);
                return res.data;
            }
            return [];
        },
    });
    return [DonationInfo, refetch]
};

export default useDonation;