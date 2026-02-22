import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./HomeNavbar.css";

export default function HomeNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const [open, setOpen] = useState(false);         // profile dropdown
  const [menuOpen, setMenuOpen] = useState(false); // mobile nav drawer

  const go = (path) => {
    navigate(path);
    setOpen(false);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
    setOpen(false);
    setMenuOpen(false);
  };

  const active = (path) =>
    location.pathname.startsWith(path) ? "nav-item active" : "nav-item";

  const NAV_LINKS = [
    { path: "/study-plan", icon: "ri-book-open-line",  label: "Learning"   },
    { path: "/community",  icon: "ri-team-line",        label: "Community"  },
    { path: "/articles",   icon: "ri-article-line",     label: "Articles"   },
  ];

  return (
    <>
      <div className="tu-navbar-wrapper">
        <div className="tu-navbar">

          {/* LOGO */}
          <div className="tu-left" onClick={() => go("/dashboard")}>
            <span className="logo-bracket">&lt;</span>
            NullPointer
            <span className="logo-bracket">&gt;</span>
          </div>

          {/* CENTER MENU — desktop */}
          <div className="tu-center">
            {NAV_LINKS.map(({ path, icon, label }) => (
              <span key={path} className={active(path)} onClick={() => go(path)}>
                <i className={icon}></i>
                {label}
              </span>
            ))}
          </div>

          {/* RIGHT */}
          <div className="tu-right">

            {/* Hamburger — mobile only */}
            <div
              className="tu-hamburger"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
            </div>

            {/* Avatar + profile dropdown */}
            <div className="tu-avatar" onClick={() => setOpen(!open)}>
              <div className="avatar-circle">
                <i className="ri-user-3-line"></i>
              </div>
              <i className="ri-arrow-down-s-line chevron"></i>
            </div>

            {open && (
              <div className="tu-dropdown">
                <div onClick={() => go("/profile")}>
                  <i className="ri-user-line"></i>
                  Profile
                </div>
                <div onClick={handleLogout}>
                  <i className="ri-logout-box-r-line"></i>
                  Logout
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* MOBILE DRAWER — rendered outside navbar so it slides below */}
      <div className={`tu-mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map(({ path, icon, label }) => (
          <span key={path} className={active(path)} onClick={() => go(path)}>
            <i className={icon}></i>
            {label}
          </span>
        ))}
      </div>
    </>
  );
}
