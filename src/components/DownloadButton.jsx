import React, { useState } from "react";
import Link from "next/link";

// Platform configuration with icons and colors
const platformConfig = {
    windows: {
        name: "Windows",
        icon: "🪟",
        color: "bg-blue-600 hover:bg-blue-700"
    },
    macos: {
        name: "macOS",
        icon: "🍎",
        color: "bg-gray-600 hover:bg-gray-700"
    },
    android: {
        name: "Android",
        icon: "🤖",
        color: "bg-green-600 hover:bg-green-700"
    },
    ios: {
        name: "iOS",
        icon: "📱",
        color: "bg-indigo-600 hover:bg-indigo-700"
    }
};

const DownloadSection = ({ platformData, loading }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [downloadLink, setDownloadLink] = useState("");
    const [selectedPlatform, setSelectedPlatform] = useState("");

    // Open dialog and set download link
    const handleDownloadClick = (link, platform) => {
        setDownloadLink(link);
        setSelectedPlatform(platform);
        setShowDialog(true);
    };

    // Close dialog and reset state
    const handleDialogClose = () => {
        setShowDialog(false);
        setDownloadLink("");
        setSelectedPlatform("");
    };

    return (
        <div className="mt-8 flex flex-col gap-8 justify-center items-center">
            {/* Download text styled to be large, bold, and white */}
            <div className="text-4xl font-bold text-white">Download</div>

            {/* Platform download buttons in a responsive grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
                {Object.entries(platformConfig).map(([platform, config]) => {
                    const data = platformData?.[platform];
                    const hasData = data && !loading;
                    const version = data?.version || "";

                    return (
                        <button
                            key={platform}
                            onClick={() => hasData && handleDownloadClick(data.download_url, platform)}
                            disabled={loading || !hasData}
                            className={`${config.color} text-white px-4 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center gap-2 min-h-[100px] transition-all duration-200`}
                        >
                            <span className="text-2xl">{config.icon}</span>
                            <span className="font-semibold">{config.name}</span>
                            {loading ? (
                                <span className="text-xs">Loading...</span>
                            ) : hasData ? (
                                <span className="text-xs">v{version}</span>
                            ) : (
                                <span className="text-xs text-red-200">Not Available</span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Terms and Conditions Modal */}
            {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">
                            {platformConfig[selectedPlatform]?.icon} Download {platformConfig[selectedPlatform]?.name}
                        </h2>
                        <p className="text-gray-700 mb-6">
                            By downloading and using Service Pro, you agree to the following
                            terms and conditions:
                        </p>
                        <ul className="list-disc pl-6 mb-6 text-gray-700">
                            <li>
                                The software is provided "as-is" without warranties of any kind.
                            </li>
                            <li>
                                You assume all responsibility for any risks, losses, or damages
                                resulting from its use.
                            </li>
                            <li>
                                The developer is not liable for any financial, trading, or
                                other outcomes arising from the use of the application.
                            </li>
                        </ul>
                        <p className="text-gray-700 mb-6">
                            Please read the full terms before proceeding.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleDialogClose}
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <a
                                href={downloadLink}
                                onClick={handleDialogClose}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Accept & Download
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DownloadSection;
