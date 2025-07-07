// src/components/Navbar.jsx
import { HashLink as Link } from 'react-router-hash-link';
import React from 'react'; // React is needed for JSX
import { useLocation } from 'react-router-dom'; // NEW: Import useLocation

export function Navbar({ activeSection }) { // NEW: Accept activeSection prop
  const location = useLocation(); // NEW: Get the current location object

  // Helper function to determine the target path for HashLink
  // If we are NOT on the home page ('/'), the links should navigate back to '/'
  // and then to the specific section ID.
  const getLinkTo = (sectionId) => {
    // FIX 2: Remove leading slash from hash links when on the home page
    // If not on the root of the basename, navigate to the root first, then hash
    if (location.pathname !== '/') {
      return `/#${sectionId}`; // e.g., /my-portfolio/#home
    }
    return `#${sectionId}`; // e.g., #home (for in-page scrolling on home)
  };

  // Helper function to determine the CSS classes for the link
  // Active highlighting should only apply when on the home page ('/').
  const getLinkClass = (sectionLinkTargetId) => {
    const baseClasses = "hover:text-yellow-400 transition";
    const activeClasses = "text-yellow-400 font-bold bg-gray-700/50 px-3 py-1 rounded-full shadow-inner";

    // Only apply active highlighting if the current path is the home page (root of the basename)
    if (location.pathname === '/') {
      // For 'Home' and 'About me' links (which both map to 'home' section)
      if (sectionLinkTargetId === 'home') {
        return `${baseClasses} ${activeSection === 'home' ? activeClasses : ''}`;
      }
      // For other sections, compare directly with the activeSection prop
      if (sectionLinkTargetId === activeSection) {
        return `${baseClasses} ${activeClasses}`;
      }
    }
    // No active highlighting if not on the home page or no match
    return baseClasses;
  };

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <ul className="flex bg-gray-800 bg-opacity-60 backdrop-blur-md text-white rounded-full px-6 py-2 gap-6 text-sm font-medium shadow-md">
        <li>
          <Link smooth to={getLinkTo('home')}
            className={getLinkClass('home')}
          >
            Home
          </Link>
        </li>
        <li>
          {/* 'About me' link: will navigate to '#home' and highlight when 'home' is active. */}
          <Link smooth to={getLinkTo('home')}
            className={getLinkClass('home')}
          >
            About me
          </Link>
        </li>
        <li>
          <Link smooth to={getLinkTo('skills')}
            className={getLinkClass('skills')}
          >
            Skill
          </Link>
        </li>
        <li>
          <Link smooth to={getLinkTo('contact')}
            className={getLinkClass('contact')}
          >
            Contact
          </Link>
        </li>
        <li>
          <Link smooth to={getLinkTo('portfolio')}
            className={getLinkClass('portfolio')}
          >
            Portfolio
          </Link>
        </li>
      </ul>
    </nav>
  );
}