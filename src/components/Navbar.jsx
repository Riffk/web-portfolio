import { HashLink as Link } from 'react-router-hash-link';

export function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <ul className="flex bg-gray-800 bg-opacity-60 backdrop-blur-md text-white rounded-full px-6 py-2 gap-6 text-sm font-medium shadow-md">
        <li>
          <Link smooth to="/#home" className="hover:text-blue-400 transition">
            Home
          </Link>
        </li>
        <li>
          <Link smooth to="/#About%20me" className="hover:text-blue-400 transition">
            About me
          </Link>
        </li>
        <li>
          <Link smooth to="/#Skill" className="hover:text-blue-400 transition">
            Skill
          </Link>
        </li>
        <li>
          <Link smooth to="/#Contact" className="hover:text-blue-400 transition">
            Contact
          </Link>
        </li>
        <li>
          <Link smooth to="/#Portfolio" className="hover:text-blue-400 transition">
            Portfolio
          </Link>
        </li>
      </ul>
    </nav>
  );
}
