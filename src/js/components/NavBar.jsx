import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from '@tata1mg/router';
import { User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const { toggleCart, totalItems } = useCart();

  // Handle scrolling effect - only on homepage
  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Re-evaluate scroll state on pathname change
  useEffect(() => {
    const checkHomePage = pathname === "/";
    if (!checkHomePage) {
      setIsScrolled(true);
    } else if (window.scrollY <= 50) {
      setIsScrolled(false);
    }
  }, [pathname]);

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  const toggleVariants = {
    hidden: { scale: 0.8, rotate: -10 },
    visible: { scale: 1, rotate: 0, transition: { duration: 0.2 } },
  };

  const sidebarVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const sidebarItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-semibold tracking-wider">
            <h1
              className={`font-bold tracking-tight ${
                isScrolled
                  ? "text-black drop-shadow-[2px_2px_0px_#e5e7eb]"
                  : isHomePage
                  ? "text-white"
                  : "text-black drop-shadow-[2px_2px_0px_#e5e7eb]"
              }`}
            >
              BRISKK
            </h1>
          </Link>

          {/* Desktop Navigation with Framer Motion */}
          <motion.div
            className="hidden md:flex space-x-8"
            initial="hidden"
            animate="visible"
          >
            {["HOME", "SHOP"].map((item, index) => (
              <motion.div
                key={item}
                custom={index}
                variants={navItemVariants}
              >
                <Link
                  to={item === "HOME" ? "/" : "/shop"}
                  className={`nav-item hover:cursor-pointer hover:opacity-85 transition-opacity ${
                    isScrolled
                      ? "text-brand-dark"
                      : isHomePage
                      ? "text-white"
                      : "text-brand-dark"
                  }`}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Icons and Mobile Menu Toggle */}
          <div className="flex items-center space-x-6">
            <button
              className={`hidden md:block hover:cursor-pointer hover:opacity-85 transition-opacity ${
                isScrolled
                  ? "text-brand-dark"
                  : isHomePage
                  ? "text-white"
                  : "text-brand-dark"
              }`}
            >
              <User className="h-5 w-5" />
            </button>

            <button
              className={`hidden md:block hover:cursor-pointer hover:opacity-85 transition-opacity ${
                isScrolled
                  ? "text-brand-dark"
                  : isHomePage
                  ? "text-white"
                  : "text-brand-dark"
              }`}
            >
              <Heart className="h-5 w-5" />
            </button>

            <button
              onClick={toggleCart}
              className={`hidden md:block hover:cursor-pointer hover:opacity-85 transition-opacity relative ${
                isScrolled
                  ? "text-brand-dark"
                  : isHomePage
                  ? "text-white"
                  : "text-brand-dark"
              }`}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#5c564a] text-white text-xs rounded-full h-5 w-5 scale-75 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle with Framer Motion */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden ${
                isScrolled
                  ? "text-brand-dark"
                  : isHomePage
                  ? "text-white"
                  : "text-brand-dark"
              }`}
              initial="hidden"
              animate="visible"
              variants={toggleVariants}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Sidebar with Framer Motion */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-50 md:hidden"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="absolute inset-0 bg-black/50"
                onClick={() => setMobileMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute right-0 top-0 h-full w-[85%] sm:w-[350px] bg-white shadow-xl flex flex-col"
                variants={sidebarVariants}
              >
                <div className="p-4 border-b">
                  <h2 className="font-bold text-lg">BRISKK</h2>
                </div>
                <div className="p-4 flex-1">
                  <motion.div
                    className="flex flex-col space-y-1"
                    initial="hidden"
                    animate="visible"
                  >
                    {[
                      { to: "/", text: "Home" },
                      { to: "/shop", text: "Shop" },
                    ].map((item, index) => (
                      <motion.div
                        key={item.text}
                        custom={index}
                        variants={sidebarItemVariants}
                      >
                        <Link
                          to={item.to}
                          className="text-lg text-black hover:cursor-pointer hover:bg-gray-100 px-4 py-3 rounded-lg"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.text}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                  <div className="h-px bg-gray-200 my-4" />
                  <motion.div
                    className="flex flex-col space-y-1"
                    initial="hidden"
                    animate="visible"
                  >
                    {[
                      { icon: <Heart className="h-5 w-5 mr-3" />, text: "Wishlist" },
                      {
                        icon: <ShoppingBag className="h-5 w-5 mr-3" />,
                        text: `Cart (${totalItems})`,
                        onClick: () => {
                          toggleCart();
                          setMobileMenuOpen(false);
                        },
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.text}
                        custom={index + 2} // Offset delay after nav items
                        variants={sidebarItemVariants}
                      >
                        <button
                          onClick={item.onClick}
                          className="flex items-center justify-start text-left hover:cursor-pointer hover:bg-gray-100 px-4 py-3 text-black rounded-lg transition-all"
                        >
                          {item.icon}
                          <span>{item.text}</span>
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
                <motion.div
                  className="p-4 border-t mt-auto"
                  initial="hidden"
                  animate="visible"
                  custom={4} // Further delay for footer
                  variants={sidebarItemVariants}
                >
                  <div className="text-sm text-gray-500">© 2023 BRISKK. All rights reserved.</div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;