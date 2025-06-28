import React, { useState } from "react";
import Link from "next/link";

// Helper functions to extract versions
const extractWindowsVersion = (url) => {
    const match = url.match(/ServicePro-Windows-([\d.]+)\.zip/);
    return match ? match[1] : null;
};

const extractUnixVersion = (url) => {
    const match = url.match(/ServicePro-Unix-([\d.]+)\.zip/);
    return match ? match[1] : null;
};

const DownloadSection = ({ windowsVersionLink, unixVersionLink, loading }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [downloadLink, setDownloadLink] = useState("");

    let windowsVersion;
    let unixVersion;
    if (!loading) {
        windowsVersion = extractWindowsVersion(windowsVersionLink);
        unixVersion = extractUnixVersion(unixVersionLink);
    } else {
        windowsVersion = "";
        unixVersion = "";
    }

    // Open dialog and set download link
    const handleDownloadClick = (link) => {
        setDownloadLink(link);
        setShowDialog(true);
    };

    // Close dialog and reset state
    const handleDialogClose = () => {
        setShowDialog(false);
        setDownloadLink("");
    };

    return (
        <div className="mt-8 flex flex-col gap-8 justify-center items-center">
            {/* Download text styled to be large, bold, and white */}
            <div className="text-4xl font-bold text-white">Download</div>


        
            <div className="flex gap-4">
                <button
                    onClick={() => handleDownloadClick(windowsVersionLink)}
                    disabled={loading || !windowsVersionLink}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Loading..." : `Windows ${windowsVersion || ""}`}
                </button>
                <button
                    onClick={() => handleDownloadClick(unixVersionLink)}
                    disabled={loading || !unixVersionLink}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? "Loading..." : `Unix ${unixVersion || ""}`}
                </button>
            </div>

            {/* Terms and Conditions Modal */}
            {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
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
