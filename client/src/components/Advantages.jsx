import { useEffect, useRef } from "react";
import "./Advantages.css";

function Advantages() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="advantages">
      <div className="advantages-inner">
        <h2>Why NullPointer?</h2>

        {/* TRACK */}
        <div className="advantages-track">
          <div className="adv-card">
            <h3>Structured Learning</h3>
            <p>
              Follow clear, well-designed learning paths instead of jumping
              between random tutorials. Every step builds forward with intent.
            </p>
          </div>

          <div className="adv-card">
            <h3>Real Community</h3>
            <p>
              Learn with real developers. Ask questions, review code,
              exchange feedback, and grow together — not alone.
            </p>
          </div>

          <div className="adv-card">
            <h3>Consistency System</h3>
            <p>
              Build momentum through accountability and habit-building
              systems that help you stay consistent long-term.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Advantages;
