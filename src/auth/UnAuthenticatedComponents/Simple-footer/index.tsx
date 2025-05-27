import React from "react";
import usePortalUrl from "@/hooks/usePortalUrl";

import "./index.scss";
import MCLogo from "./mc-logo.svg";

interface SimpleFooterProps {
  className?: string;
  mobileAppLogin?: boolean;
}

const SimpleFooter: React.FC<SimpleFooterProps> = ({
  className = "",
  mobileAppLogin = false,
}) => {
  const portalUrl = usePortalUrl();

  return (
    <footer className={`simple-footer ${className}`}>
      <div className="simple-footer__content sf-text-center">
        <nav className="simple-footer__links">
          <ul className="divided-hlist">
            {!mobileAppLogin && (
              <>
                <li>
                  <a
                    href={`${portalUrl || ""}/terms`}
                    rel="noopener noreferrer"
                    className="link link--inherit"
                  >
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a
                    href={`${portalUrl || ""}/privacy`}
                    rel="noopener noreferrer"
                    className="link link--inherit"
                  >
                    Privacy Policy
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
        <small className="simple-footer__legal">
          <span className="integrity-logo">
            <img src={MCLogo} alt="Integrity Logo" className="mc-img" />
          </span>
          <br />
          <span>
            &copy; {new Date().getFullYear()} Integrity. All rights reserved.
          </span>
        </small>
      </div>
    </footer>
  );
};

export default SimpleFooter;
