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
                const response = await fetch('https://kxl4fcxtqmkiaiikyny4y27bbi0dntkc.lambda-url.us-east-1.on.aws', {
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
                            <div className="flex justify-center mb-8">
                                <Image
                                    className="rounded-lg shadow-inner mx-auto"
                                    src={logo}
                                    alt="Service Pro - Professional Service Management"
                                    width={650}
                                    unoptimized
                                    priority
                                />
                            </div>
                            <div className="mt-8 flex gap-4 justify-center">
                                <DownloadSection
                                    platformData={platformData}
                                    loading={loading}
                                />
                            </div>
                            <PurchaseButton />
                            {error && (
                                <div className="mt-4 text-red-500">
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
