import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <p>TABLE TENNIS SCORE KEEPER</p>
      </Link>
    </header>
  );
}
