import React, { useEffect, useState } from "react";
import { Link } from '@tata1mg/router';
import { Globe } from "lucide-react";

const Hero = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-brand-green">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10" />

            {/* Background Image with smooth load-in */}
            <div className="absolute inset-0 z-0">
                <img
                    src="images/hero-banner.jpg"
                    alt="Street style fashion"
                    className={`w-full h-full object-cover transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
                />
            </div>

            {/* Hero Content */}
            <div className="relative z-20 h-full flex flex-col justify-center max-w-7xl mx-auto px-6">
                <div className={`space-y-8 transition-all duration-1000 ease-out ${loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                    <h1 className="text-white text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
                        STYLE
                        <br />
                        UNLEASHED
                    </h1>

                    <Link to="/shop" className="cursor-pointer">
                        <button className="cursor-pointer group relative overflow-hidden rounded-none bg-transparent text-white border border-white hover:border-black font-medium text-lg px-8 py-3 transition-all duration-500">
                            <span className="relative z-10">SHOP NOW</span>
                            {/* Background with smooth blur-in effect */}
                            <span
                                className={`absolute inset-0 backdrop-blur-md bg-[#514B42] transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
                            />
                            {/* Hover background */}
                            <span className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    </Link>
                </div>

                {/* Social Media Icons */}
                <div className={`absolute bottom-8 left-6 flex items-center space-x-6 transition-opacity duration-1000 delay-500 ${loaded ? "opacity-100" : "opacity-0"}`}>
                    <Link
                        to="https://github.com/abdullashahil/Briskk_apparels"
                        className="text-white hover:text-white/80 transition-colors"
                        aria-label="Visit our website"
                    >
                        <Globe className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;