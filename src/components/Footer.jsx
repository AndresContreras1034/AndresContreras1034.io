import React from "react";
import '../styles/Footer.css';


const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p>© {new Date().getFullYear()} Andrés Méndez. Todos los derechos reservados.</p>
        <div className="flex justify-center mt-2 space-x-4">
          <a
            href="https://github.com/AndresContreras"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://github.com/AndresContreras"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:contrerandres001@gmail.com"
            className="hover:text-blue-500 transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

