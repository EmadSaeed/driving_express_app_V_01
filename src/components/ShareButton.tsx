'use client';

import React, { useState } from "react";
import { IoIosShareAlt } from "react-icons/io";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const ShareButton: React.FC = () => {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: document.title,
            text: "Check out this article!",
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                // User cancelled or error occurred
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                alert("Could not copy the link");
            }
        }
    };

    return (
        <div className="relative">
            <button
                type="button"
                className="flex items-center gap-1 w-16 h-7 rounded-[10px] bg-DX_red text-white text-xs font-medium px-2 py-1 mt-2 sm:mt-0 transition-colors hover:bg-red-700"
                onClick={handleShare}
            >
                <span className="text-base">
                    <IoIosShareAlt />
                </span>
                Share
            </button>
            {copied && (
                <span
                    className="absolute w-28 top-full left-1/2 -translate-x-1/2 mt-2 px-1 py-1 bg-neutral-900 text-white text-xs rounded-lg shadow-lg flex items-center gap-1
                  opacity-90 animate-fade-in-up z-10 pointer-events-none"
                    style={{ animation: "fade-in-up 0.4s" }}
                >
                    <IoCheckmarkCircleOutline className="text-green-400 text-base" />
                    Link copied!
                </span>

            )}
        </div>
    );
};

export default ShareButton;
