import React from "react";
import { Link } from "react-router-dom";

import Logo from "../Logo";

import "./index.scss";

interface SimpleHeaderProps {
  mobileAppLogin?: boolean;
}

const SimpleHeader: React.FC<SimpleHeaderProps> = ({
  mobileAppLogin = false,
}) => {
  return (
    <header className="simple-header">
      <h1 className="simple-header__title">
        {!mobileAppLogin ? (
          <Link to="/">
            <Logo aria-hidden="true" id="headerLogo" />
            <span className="visually-hidden">Integrity</span>
          </Link>
        ) : (
          <div className="mobile-med-icon">
            <Logo aria-hidden="true" id="headerLogo" />
            <span className="visually-hidden">Integrity</span>
          </div>
        )}
      </h1>
    </header>
  );
};

export default SimpleHeader;
