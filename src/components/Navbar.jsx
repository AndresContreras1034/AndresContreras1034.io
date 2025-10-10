<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
=======
import React, { useState } from "react";
import { motion } from "framer-motion";
>>>>>>> 446c5d0336885d5ae9287c78893985c29674a2a8
import "../styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
<<<<<<< HEAD
  const [hideNavbar, setHideNavbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHideNavbar(currentScrollY > lastScrollY && currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`navbar ${hideNavbar ? "hide" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
=======

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "about", href: "#about" },
    { name: "skills", href: "#skills" },
    { name: "projects", href: "#projects" },
    { name: "contact", href: "#contact" },
  ];

  return (
    <nav>
      <div>
>>>>>>> 446c5d0336885d5ae9287c78893985c29674a2a8
        <motion.div
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
<<<<<<< HEAD
          <span className="font-bold text-xl text-blue-500">
            Doc. cdgo viejo 45%
          </span>
        </motion.div>

        {/* Desktop Menu */}
=======
Pagina En Desarrollo 40%
        </motion.div>

        {/* Menú de escritorio */}
>>>>>>> 446c5d0336885d5ae9287c78893985c29674a2a8
        <motion.ul
          className="desktop-menu"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {navItems.map((item) => (
            <li key={item.name}>
<<<<<<< HEAD
              <a href={item.href} className="nav-link">
=======
              <a href={item.href}>{item.name}</a>
            </li>
          ))}
        </motion.ul>

        {/* Botón hamburguesa móvil */}
        <div className="menu-toggle-container">
          <button onClick={toggleMenu} className="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <motion.ul
          className="mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {navItems.map((item) => (
            <li key={item.name}>
              <a href={item.href} onClick={() => setIsOpen(false)}>
>>>>>>> 446c5d0336885d5ae9287c78893985c29674a2a8
                {item.name}
              </a>
            </li>
          ))}
        </motion.ul>
<<<<<<< HEAD

        {/* Hamburger Button */}
        <div className="menu-toggle-container">
          <button
            onClick={toggleMenu}
            className="menu-toggle"
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
=======
      )}
>>>>>>> 446c5d0336885d5ae9287c78893985c29674a2a8
    </nav>
  );
};

<<<<<<< HEAD
export default Navbar;
=======
export default Navbar;
>>>>>>> 446c5d0336885d5ae9287c78893985c29674a2a8
