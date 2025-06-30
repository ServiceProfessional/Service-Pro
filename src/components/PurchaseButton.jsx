import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51RfD93Phv6PF2WVhFGZHgnYmFdjQJZGVvioFhKMjucKqRfK6GPPwIrKXEzJ9HUHILZgjKiUTEWGUuVfJNFn3SJqd00eqCJuAl4");

export const PurchaseButton = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

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
        <div className="mt-12 flex flex-col gap-8 justify-center items-center">
            {/* Purchase Section Header */}
            <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">
                    Unlock Full Features
                </h2>
                <p className="text-gray-300 text-sm max-w-md mx-auto">
                    Get unlimited access with a professional license
                </p>
            </div>

            {/* Professional Purchase Card */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 max-w-md w-full">
                <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">Professional Subscription</h3>
                    <p className="text-gray-300 text-sm">Monthly subscription • Full access</p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Processing...
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            Start Subscription
                        </div>
                    )}
                </button>

                <div className="mt-4 text-center">
                    <p className="text-gray-400 text-xs">
                        Secure payment via Stripe • Cancel anytime
                    </p>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-lg shadow-2xl">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-white">Professional Subscription</h2>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 mb-6">
                            Subscribe to unlock the full potential of Service Professional with unlimited access to all features,
                            advanced tools, and priority support.
                        </p>

                        {/* Features */}
                        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                            <h3 className="font-semibold text-blue-300 mb-3 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                What's Included:
                            </h3>
                            <ul className="space-y-2 text-gray-300 text-sm">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                                    Unlimited clients and service schedules
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                                    Advanced reporting and analytics
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                    Email and SMS notifications
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                                    Invoice generation and payment tracking
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
                                    Priority customer support
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                                    Regular updates and new features
                                </li>
                            </ul>
                        </div>

                        {/* Subscription Info */}
                        <div className="text-center mb-6">
                            <div className="text-lg font-semibold text-white mb-1">Monthly Subscription</div>
                            <div className="text-gray-400 text-sm">Flexible billing • Cancel anytime</div>
                        </div>

                        {/* Disclaimer */}
                        <p className="text-gray-500 text-xs mb-6 text-center">
                            Software provided "as-is". Developer not liable for business outcomes.
                            Secure payment processing by Stripe.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 bg-slate-700 hover:bg-slate-600 text-gray-300 font-medium px-4 py-3 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePurchase}
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-4 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                        Start Subscription
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
