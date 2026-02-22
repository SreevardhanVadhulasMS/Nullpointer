import { useState } from "react";
import "./Navbar.css";
import JoinModal from "./JoinModal";

function Navbar() {
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <>
      <div className="navbar-wrapper">
        <nav className="navbar">
          <span className="logo-text">
            <span className="logo-bracket">&lt;</span>
            NullPointer
            <span className="logo-bracket">&gt;</span>
          </span>

          <div className="navbar-right">
            <a >The developer commons!</a>
           
            <button
              className="join-btn"
              onClick={() => setJoinOpen(true)}
            >
              Join
            </button>
          </div>
        </nav>
      </div>

      <JoinModal
        open={joinOpen}
        onClose={() => setJoinOpen(false)}
      />
    </>
  );
}

export default Navbar;
