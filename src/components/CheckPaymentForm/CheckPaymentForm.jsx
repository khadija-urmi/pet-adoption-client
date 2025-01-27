import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const CheckPaymentForm = ({ amount, donationCamp }) => {

    const { _id, petName, totalDonationAmount } = donationCamp;

    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (amount) {
            axiosPublic.post('/create-payment-intent', { price: amount })
                .then(res => {

                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosPublic, amount])

    //calculating the totalCollectDonation
    const amountInt = parseInt(amount)

    const totalCollectDonateAmount = totalDonationAmount + amountInt;
    console.log("Amount", totalDonationAmount, amountInt, totalCollectDonateAmount);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('payment error', error);
            setError(error.message);
        } else {
            console.log('PaymentMethod', paymentMethod);
            setError('');
        }
        //confirming payment
        const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: currentUser?.email || 'Hidden Donar',
                    name: currentUser?.displayName || 'Hidden Donar'
                }
            }
        })
        if (paymentError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                ///send data to donarList  of Database
                const DonarData = {
                    email: currentUser?.email,
                    name: currentUser?.name,
                    date: new Date(),
                    donationAmount: amount,
                    transactionId: paymentIntent.id,
                    donationCampId: _id,
                    donationEventName: petName,
                }
                const res = await axiosPublic.post('/save-donation-pay', DonarData);
                console.log(res.data);
                if (res.data?.insertedId) {
                    const res = await axiosPublic.patch(`my-donations-camp/${_id}`, { totalDonationAmount: totalCollectDonateAmount })
                    if (res.data?.modifiedCount > 0) {
                        toast.success("Successfully donate money 🎉")
                    }
                }
                navigate('/dashboard/my-donation')
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                        },
                    },
                }}
            />
            <button className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg  px-6 py-2.5 text-center me-2 mt-2 mb-2 my-4 " type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your Successful transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckPaymentForm;