import React from "react";
import '../styles.css';

export default function Footer() {
    const curYear = new Date().getFullYear();

    return(
        <footer className="footer">
            <p className="footer-text">© {curYear} MovieDux, All rights reserved.</p>
        </footer>
    );
}