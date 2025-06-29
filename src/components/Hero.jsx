import Image from 'next/image';
import { Button } from '@/components/Button';
import { HeroBackground } from '@/components/HeroBackground';
import blurCyanImage from '@/images/blur-cyan.png';
import blurIndigoImage from '@/images/blur-indigo.png';
import logo from '@/images/logo.png';

import { PurchaseButton } from './PurchaseButton';
import { useState, useEffect } from 'react';
import DownloadSection from '@/components/DownloadButton';
export function TrafficLightsIcon(props) {
    return (
        <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
            <circle cx="5" cy="5" r="4.5" />
            <circle cx="21" cy="5" r="4.5" />
            <circle cx="37" cy="5" r="4.5" />
        </svg>
    );
}

export function Hero() {
    const [loading, setLoading] = useState(true);
    const [platformData, setPlatformData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLatestVersions = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://mv4jzytg25yvjeywdxd7jjytue0qiskl.lambda-url.us-east-1.on.aws', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                // Process platform data and errors
                const platforms = ['windows', 'macos', 'android', 'ios'];
                const newPlatformData = {};
                const errors = [];

                platforms.forEach(platform => {
                    if (data[platform]) {
                        newPlatformData[platform] = data[platform];
                    } else if (data[`${platform}_error`]) {
                        errors.push(`${platform}: ${data[`${platform}_error`]}`);
                    }
                });

                setPlatformData(newPlatformData);

                if (errors.length > 0) {
                    setError(`Download errors: ${errors.join(', ')}`);
                } else if (Object.keys(newPlatformData).length === 0) {
                    setError('No downloads available for any platform.');
                }

            } catch (error) {
                console.error('There was an error fetching the latest versions:', error);
                setError('Failed to fetch the latest versions.');
            } finally {
                setLoading(false);
            }
        };

        fetchLatestVersions();
    }, []); // Empty dependency array means it runs once on mount
    return (
        <div className="overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]">
            <div className="py-16 sm:px-2 lg:relative lg:py-20 lg:px-0">
                <div className="mx-auto max-w-4xl px-4 lg:px-8">
                    <div className="relative z-10 text-center">
                        <div className="relative">
                            {/* Main Brand Banner */}
                            <div className="mb-12">
                                <h1 className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-7xl lg:text-8xl">
                                    Service Professional
                                </h1>
                                <p className="mt-6 text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
                                    The complete service management solution for professionals.
                                    Track clients, schedule recurring services, and never miss a job again.
                                </p>
                                <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                        <span>Client Management</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                        <span>Smart Scheduling</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                        <span>Automated Reminders</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                        <span>Cross-Platform</span>
                                    </div>
                                </div>
                            </div>

                            {/* App Preview */}
                            <div className="flex justify-center mb-12">
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                                    <Image
                                        className="relative rounded-xl shadow-2xl border border-gray-700/50"
                                        src={logo}
                                        alt="Service Professional - App Preview"
                                        width={600}
                                        unoptimized
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Download Section */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-6">
                                    Download for Your Platform
                                </h2>
                                <div className="flex gap-4 justify-center">
                                    <DownloadSection
                                        platformData={platformData}
                                        loading={loading}
                                    />
                                </div>
                            </div>

                            <PurchaseButton />

                            {error && (
                                <div className="mt-4 text-red-500">
                                    {error}
                                </div>
                            )}

                            {/* Additional Features */}
                            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                                <div className="text-center p-6 rounded-lg bg-gray-800/30 border border-gray-700/50">
                                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Client Management</h3>
                                    <p className="text-gray-400 text-sm">Organize and track all your clients in one place with detailed service histories.</p>
                                </div>

                                <div className="text-center p-6 rounded-lg bg-gray-800/30 border border-gray-700/50">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Smart Scheduling</h3>
                                    <p className="text-gray-400 text-sm">Automatically schedule recurring services and optimize your route planning.</p>
                                </div>

                                <div className="text-center p-6 rounded-lg bg-gray-800/30 border border-gray-700/50">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 4.828A4 4 0 015.5 4H9v1H5.5a3 3 0 00-2.121.879l-.707.707A1 1 0 002 7.414V16.5A1.5 1.5 0 003.5 18H12v1H3.5A2.5 2.5 0 011 16.5V7.414a2 2 0 00-.586-1.414l.707-.707z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Never Miss a Job</h3>
                                    <p className="text-gray-400 text-sm">Get timely notifications and reminders for all your scheduled services.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
