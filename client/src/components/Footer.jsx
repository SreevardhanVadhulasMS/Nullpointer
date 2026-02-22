import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-text">
          © {new Date().getFullYear()} NullPointer. All rights reserved.
        </p>

        <a
          href="mailto:vardhan22120@gmail.com"
          className="footer-contact"
        >
          Contact
        </a>
      </div>
    </footer>
  );
}

export default Footer;
