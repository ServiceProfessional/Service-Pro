import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51RfD93Phv6PF2WVhFGZHgnYmFdjQJZGVvioFhKMjucKqRfK6GPPwIrKXEzJ9HUHILZgjKiUTEWGUuVfJNFn3SJqd00eqCJuAl4");

export const PurchaseButton = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handlePurchase = async () => {
        try {
            setLoading(true);
            const stripe = await stripePromise; // Load Stripe.js

            // Create a checkout session with email
            const response = await fetch('https://mv4jzytg25yvjeywdxd7jjytue0qiskl.lambda-url.us-east-1.on.aws?buy=1', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to create Stripe checkout session');
            }

            const { id } = await response.json();

            if (id) {
                // Redirect to Stripe Checkout
                const { error } = await stripe.redirectToCheckout({ sessionId: id });
                if (error) {
                    console.error('Stripe Checkout error:', error.message);
                }
            } else {
                console.error('Failed to create a checkout session.');
            }
        } catch (error) {
            console.error('Error creating Stripe Checkout session:', error);
            alert('Failed to start the purchase process.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 flex flex-col gap-8 justify-center items-center">
            <button
                onClick={() => setShowModal(true)}
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600"
            >
Get Full Version ($20)
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Purchase Service Pro License</h2>
                        <p className="text-gray-700 mb-6">
                            Unlock the full potential of Service Pro with unlimited clients,
                            advanced reporting, and priority support.
                        </p>
                        <div className="bg-blue-50 p-4 rounded-lg mb-6">
                            <h3 className="font-semibold text-blue-900 mb-2">Full Version Includes:</h3>
                            <ul className="list-disc pl-6 text-blue-800 text-sm">
                                <li>Unlimited clients and service schedules</li>
                                <li>Advanced reporting and analytics</li>
                                <li>Email and SMS notifications</li>
                                <li>Invoice generation and payment tracking</li>
                                <li>Priority customer support</li>
                                <li>Regular feature updates</li>
                            </ul>
                        </div>
                        <p className="text-gray-600 text-sm mb-6">
                            By purchasing, you agree that the software is provided "as-is"
                            and the developer is not liable for business outcomes from its use.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePurchase}
                                disabled={loading}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                {loading ? 'Processing...' : 'Purchase Now'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
