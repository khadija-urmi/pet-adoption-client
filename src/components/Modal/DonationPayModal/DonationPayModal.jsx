import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import CheckPaymentForm from "../../CheckPaymentForm/CheckPaymentForm"
import { useState } from 'react';

const DonationPayModal = ({ open, setOpen, donation }) => {
    const [amount, setAmount] = useState("");

    const handleInputChange = (e) => {
        setAmount(e.target.value);
    };

    const stripePromise = loadStripe(import.meta.env.VITE_paymentGatewayPK);

    return (
        <>
            <Modal show={open} size="5xl" onClose={() => setOpen(false)}>
                <Modal.Header>Sharing your infinite love to pets</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 p-3">
                        <div>
                            <div className="mb-2  block">
                                <Label htmlFor="base" value="Donate your Amount" />
                            </div>
                            <TextInput id="base"
                                type="text" sizing="md"
                                value={amount}
                                onChange={handleInputChange} />
                        </div>
                        {/* Adding payment way using cards */}
                        <div>
                            <Elements stripe={stripePromise}>
                                <CheckPaymentForm amount={amount} donationCamp={donation} />
                            </Elements>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button gradientMonochrome="cyan" onClick={() => setOpen(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DonationPayModal;