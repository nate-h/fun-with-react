import React from "react";
import logo from '../logo.svg';
import "./Sidebar.scss"

export default function Sidebar() {
    return (
        <aside className="Sidebar">
            <h1>
                <img src={logo} className="logo" alt="logo" />
                Fun With React
            </h1>
            <p>
                This website was created using react, scss, typescript and deployed
                using github-pages.
            </p>
        </aside>
    )
}