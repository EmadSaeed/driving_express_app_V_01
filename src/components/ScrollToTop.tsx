'use client';

import React, { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => setVisible(window.scrollY > 200);
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 rounded-2xl bg-white/80 text-DX_blue p-3 shadow-xl transition-all
        hover:bg-white active:scale-95
        ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        backdrop-blur-md
      `}
            aria-label="Scroll to top"
            style={{ transition: "opacity 0.3s" }}
        >
            <FiArrowUp size={24} />
        </button>
    );
};

export default ScrollToTop;
