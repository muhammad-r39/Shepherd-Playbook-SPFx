import * as React from "react";
import logo from "../assets/img/logo.png";

const SiteNavigation: React.FC = () => {
  React.useEffect(() => {
    const handleLoad = () => {
      const menuIcon = document.querySelector(".menu-icon");

      if (menuIcon) {
        menuIcon.addEventListener("click", function () {
          const nav = document.querySelector("nav");
          const menu = document.querySelector("nav .menu-items");

          if (!nav || !(menu instanceof HTMLElement)) return;

          if (nav.classList.contains("open")) {
            menu.style.maxHeight = "0";
            nav.classList.remove("open");
          } else {
            menu.style.maxHeight = menu.scrollHeight + "px";
            nav.classList.add("open");
          }
        });
      }

      const submenuTogglers = document.querySelectorAll(".sub-menu-toggler");

      submenuTogglers.forEach((toggler) => {
        toggler.addEventListener("click", (e) => {
          e.preventDefault();
          document.querySelectorAll(".has-sub-menu").forEach((item) => {
            const submenu = item.querySelector(".sub-menu");
            if (submenu instanceof HTMLElement) {
              submenu.style.maxHeight = "0";
            }
            item.classList.remove("open");
          });

          const parentMenu = toggler.closest(".has-sub-menu");
          const submenu = parentMenu?.querySelector(".sub-menu");

          if (parentMenu?.classList.contains("open")) {
            if (submenu instanceof HTMLElement) submenu.style.maxHeight = "0";
            parentMenu.classList.remove("open");
          } else {
            if (submenu instanceof HTMLElement)
              submenu.style.maxHeight = submenu.scrollHeight + "px";
            parentMenu?.classList.add("open");
          }
        });
      });
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <header>
      <nav aria-label="Site navigation">
        <div className="container">
          <div className="navigation-wrapper">
            <a href="#index" className="site-branding" aria-label="Go to Home">
              <img src={logo} alt="Logo" />
            </a>
            <ul className="menu-items">
              <li>
                <a href="#company-resources">Company Resources</a>
              </li>
              <li className="has-sub-menu">
                <a className="sub-menu-toggler" href="#">
                  <span className="menu-title">Employee Resources</span>
                  <span className="arrow">
                    <svg
                      height="20"
                      viewBox="0 0 48 48"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z" />
                    </svg>
                  </span>
                </a>
                <ul className="sub-menu">
                  <li>
                    <a href="#human-resources">Human Resources</a>
                  </li>
                  <li>
                    <a href="#it">IT</a>
                  </li>
                  <li>
                    <a href="#marketing">Marketing</a>
                  </li>
                  <li>
                    <a href="#shepstep">ShepStep</a>
                  </li>
                </ul>
              </li>
              <li className="has-sub-menu">
                <a className="sub-menu-toggler" href="#">
                  <span className="menu-title">Workspaces & Teams</span>
                  <span className="arrow">
                    <svg
                      height="20"
                      viewBox="0 0 48 48"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z" />
                    </svg>
                  </span>
                </a>
                <ul className="sub-menu">
                  <li>
                    <a href="#commercial">Commercial</a>
                  </li>
                  <li>
                    <a href="#employee-benefits">Employee Benefits</a>
                  </li>
                  <li>
                    <a href="#personal">Personal</a>
                  </li>
                  <li>
                    <a href="#life-insurance">Life Insurance</a>
                  </li>
                  <li>
                    <a href="#medicare">Medicare</a>
                  </li>
                </ul>
              </li>
            </ul>
            <button className="menu-icon" aria-label="Toggle menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default SiteNavigation;
