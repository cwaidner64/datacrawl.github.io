// src/Components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';
import { LogOut, Menu, UserCircle, X } from 'lucide-react';
import { hasAdminAccess } from "../utils/authClaims";

function Navbar() {
  const { isLoggedIn, loggedInEmail, handleLogout, isLoading, isInitialized, accessToken } = useAuth();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const isAdmin = hasAdminAccess(accessToken);

  const userId = localStorage.getItem('DCuserId');
  const profileHref = userId ? `/profile/${userId}` : '/account';

  const navLinks = [
    { to: '/about', label: 'About' },
    { to: '/vendor/information', label: 'Vendors' },
    { to: '/investors', label: 'Investors' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/contact', label: 'Contact' },
    { to: '/market', label: 'Marketplace' },
    { to: '/ai-node-training', label: 'AI Node Training' }
  ];

  const handleLogoutClick = () => {
    handleLogout();
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className="py-4 md:py-6 px-4 md:px-6 bg-transparent text-white w-full absolute top-0 z-50">
      <div className="max-w-full flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={`${import.meta.env.BASE_URL}Logo-basic.svg`} alt="DataCrawl Logo" className="w-8 h-8" />
          <Link to="/" className="text-white hover:text-gray-300 text-xl font-bold" onClick={() => setMenuOpen(false)}>
            <h1>DataCrawl</h1>
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden text-white p-2 rounded-lg border border-[#2b2b2b] bg-[#111111]/80"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="hidden md:flex items-center bg-[#111111] rounded-full px-5 py-3 text-white">
          <ul className="font-semibold flex items-center gap-6 lg:gap-10">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-white hover:text-gray-400">
                  {link.label}
                </Link>
              </li>
            ))}

            {isLoggedIn && isAdmin && (
              <>
                <li>
                  <Link to="/admin/vendor-applications" className="text-white hover:text-gray-400">
                    Admin Review
                  </Link>
                </li>
                <li>
                  <Link to="/admin/vendor-endpoints" className="text-white hover:text-gray-400">
                    Admin Endpoints
                  </Link>
                </li>
              </>
            )}

        
          </ul>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-3 rounded-xl border border-[#2b2b2b] bg-[#0f0f0f]/95 px-4 py-4 text-[#E3E3E3] backdrop-blur-sm">
          <div className="flex flex-col gap-3 text-sm font-[500]">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-left"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {isLoggedIn && isAdmin && (
              <>
                <Link to="/admin/vendor-applications" className="text-left" onClick={() => setMenuOpen(false)}>
                  Admin Review
                </Link>
                <Link to="/admin/vendor-endpoints" className="text-left" onClick={() => setMenuOpen(false)}>
                  Admin Endpoints
                </Link>
              </>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-[#2b2b2b]">
            {!isInitialized || isLoading ? (
              <div className="text-sm text-gray-400">Loading...</div>
            ) : isLoggedIn ? (
              <div className="flex flex-col gap-3">
                <span className="text-white text-sm break-all">{loggedInEmail}</span>
                <Link
                  to={profileHref}
                  className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-[500] transition-all duration-200 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-[500] transition-all duration-200"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-[500] transition-all duration-200 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Login / Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;