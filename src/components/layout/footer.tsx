import Image from "next/image";
import Link from "next/link";
import {
    FaFacebook,
    FaXTwitter,
    FaInstagram,
    FaLinkedin,
    FaYoutube,
} from "react-icons/fa6";

export const Footer = () => {
    const d = new Date();
    return (
        <div className="w-full bg-DX_blue mt-12 text-white dark:bg-black dark:border-t-2 border-white">
            {/* Subscription Form */}
            <div className="w-full px-4 py-16 flex flex-col items-center">
                <h4 className="text-3xl md:text-4xl font-semibold mb-4 text-center">Stay in the Loop</h4>
                <p className="w-full max-w-md text-base md:text-lg text-center text-white dark:text-gray-300">
                    Join our newsletter, and we’ll keep you up-to-date with all the driving news.
                </p>
                <form className="w-full max-w-2xl mt-6 flex flex-col sm:flex-row gap-4 sm:gap-2">
                    <input
                        placeholder="YOUR E-MAIL"
                        className="flex-1 border border-white/40 bg-white/10 p-2 text-white placeholder:text-gray-300 rounded outline-none focus:ring-2 focus:ring-white/60"
                    />
                    <button
                        className="w-full sm:w-1/4 border border-white/60 bg-white/10 text-white rounded px-4 py-2 transition duration-300 hover:bg-white hover:text-DX_blue dark:hover:text-black"
                    >
                        Subscribe
                    </button>
                </form>
            </div>

            {/* Footer Navigation */}
            <div className="w-full border-t border-white/20">
                <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
                    {/* Logo */}
                    <div className="relative w-[200px] h-[30px] mx-auto lg:mx-0">
                        <Image
                            src="/Driving-Express-logo-white.svg"
                            alt="Driving Express logo"
                            fill
                            style={{ objectFit: "contain" }}
                        />
                    </div>

                    {/* Footer Links */}
                    <ul className="flex flex-wrap justify-center lg:justify-start text-sm gap-x-6 gap-y-2">
                        {[
                            ["About us", "/about-us"],
                            ["Contact us", "/contact-us"],
                            ["Privacy Policy", "/privacy-policy"],
                            ["Cookies Policy", "/cookies-policy"],
                            ["Terms & condition", "/terms-and-condition"],
                            ["Site map", "/site-map"],
                        ].map(([text, href]) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className="underline underline-offset-4 hover:text-white dark:hover:text-gray-300"
                                >
                                    {text}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Social Icons */}
                    <ul className="flex flex-wrap justify-center lg:justify-end items-center gap-4 text-xl">
                        <span className="font-semibold w-full text-center lg:w-auto">Follow us</span>
                        {[FaFacebook, FaYoutube, FaInstagram, FaXTwitter, FaLinkedin].map((Icon, i) => (
                            <li key={i}>
                                <Link href="#">
                                    <Icon className="text-white hover:text-gray-300 cursor-pointer" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="w-full bg-DX_blue dark:bg-black border-t border-white/20">
                <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-2">
                    <span className="text-white/80 dark:text-gray-400 text-sm text-center">
                        ©{d.getFullYear()} DrivingExpress. All Rights Reserved.
                    </span>
                    <span className="text-white/80 dark:text-gray-400 text-sm text-center">
                        Powered by{" "}
                        <Link
                            href="https://www.ipexsoft.co.uk"
                            className="underline hover:text-white"
                        >
                            IPEX SOFT LTD
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};
