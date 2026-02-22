import "./Hero.css";
import { useAuth } from "../context/AuthContext";

function Hero({ openJoinModal }) {
  const { user } = useAuth();

  const handleStart = () => {
    if (user) window.location.href = "/dashboard";
    else openJoinModal();
  };

  return (
    <section className="hero">
      <div className="hero-grid">

        {/* LEFT */}
        <div className="hero-left">
          <h1 className="hero-title">
            Consistency <br />
            and <span>Community</span>
          </h1>

          <p className="hero-subtitle">
            Content is everywhere. What's rare is a place to learn and grow
            together. NullPointer combines structured learning with a real
            developer community. Progress is never solo!
          </p>

          {/* Plain text CTA — no button element, no styling hooks */}
          <p className="hero-cta" onClick={handleStart}>
            <span className="typing-text">Start today! !</span>
          </p>
        </div>

        {/* RIGHT */}
        <div className="hero-right">
          <div className="np-panel">

            <div className="np-panel-header">
              <span className="np-dot red"></span>
              <span className="np-dot yellow"></span>
              <span className="np-dot green"></span>
              <div className="np-title">NullPointer.com</div>
            </div>

            <div className="np-panel-body">

              <div>
                <div className="np-block-title">Learning Path</div>
                <div className="np-task done">✔ JavaScript Foundations</div>
                <div className="np-task done">✔ React Core</div>
                <div className="np-task active">➜ Auth System</div>
              
              </div>

              <div className="np-streak">
                <span>Consistency</span>
                <strong>12 day streak 🔥</strong>
              </div>

              <div>
                <div className="np-block-title">Community Live</div>
                <div className="np-user"><span className="avatar"></span>Ravi joined #100DaysOfCode</div>
                <div className="np-user"><span className="avatar"></span>Ananya shipped portfolio 🚀</div>
                <div className="np-user"><span className="avatar"></span>Kiran completed DSA module</div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
