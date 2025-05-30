import * as React from "react";
import { NewsCarousel } from "../NewsCarousel";
import { SPHttpClient } from "@microsoft/sp-http";
import { DocumentLibrary } from "../DocumentLibrary";

interface ShepstepPageProps {
  spHttpClient: SPHttpClient;
}

const ShepstepPage: React.FC<ShepstepPageProps> = ({ spHttpClient }) => {
  React.useEffect(() => {
    const handleLoad = () => {
      console.log("load home page");
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
    <>
      <section className="hero-area">
        <div className="hero-banner">
          <img
            className="background-image"
            src={require("../../assets/img/banner/shepstep.jpg")}
            alt="background image"
          />
          <div className="container">
            {/* Page Title */}
            <h1 className="page-title">SHEPSTEP</h1>
          </div>
        </div>
        <div className="header-logos">
          <div className="container">
            <ul className="gap-lg">
              <li>
                <a href="#" target="_blank">
                  <img
                    src={require("../../assets/img/brands/brand29.png")}
                    alt="Brand"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* Main Content Area */}
      <div className="body-content">
        <div className="container">
          <div className="content-wrapper no-sidebar">
            <section>
              <div className="shepstep-logo">
                <img
                  src={require("../../assets/img/shepstep-logo.png")}
                  alt="ShepStep Logo"
                />
              </div>
              <div className="shepstep-content">
                <p>
                  Welcome to our ShepStep landing page - our internal platform
                  to Support, Train, Elevate, and Progress. ShepStep was created
                  to help our new and tenured employees enhance their insurance
                  knowledge and expand their professional develop-ment.
                </p>
                <p>
                  One element of ShepStep is Total CSR. Some of you are already
                  familiar with Total CSR as you have participated in the
                  assessment process and/or completed training modules offered
                  there. For those of you who are unfamiliar with Total CSR and
                  are interested in learning more about the courses offered and
                  how to utilize the portal, here are a few things to note:
                </p>
                <ul>
                  <li>
                    Review the Total CSR course list to get an idea of the
                    courses available (we will be adding new courses monthly).
                  </li>
                  <li>
                    Get in touch with your division's Knowledge Base for
                    information and assistance.
                  </li>
                  <li>
                    Unsure if you are enrolled or not sure how to login? Contact
                    Maggie Watkins.
                  </li>
                </ul>
              </div>
            </section>
          </div>
          <div className="content-wrapper">
            <main>
              <section className="news-center extra-gap">
                <h2>ShepStep News Center</h2>
                <NewsCarousel
                  spHttpClient={spHttpClient}
                  pageCategories={["ShepStep Updates", "Announcements"]}
                />
              </section>
              <section className="document-center">
                <h2>ShepStep Document Center</h2>
                <h3>Top Resources</h3>
                <div className="resources-carousel">
                  <div className="carousel-container">
                    <div className="slide">
                      <div className="slide-image">
                        <img
                          src={require("../../assets/img/resource/card1.png")}
                          alt="Featured Image"
                        />
                      </div>
                      <div className="slide-body">
                        <h4 className="slide-title">Find a Health Provider</h4>
                      </div>
                    </div>
                    <div className="slide">
                      <div className="slide-image">
                        <img
                          src={require("../../assets/img/resource/card2.png")}
                          alt="Featured Image"
                        />
                      </div>
                      <div className="slide-body">
                        <h4 className="slide-title">Benefits Guide for 2023</h4>
                      </div>
                    </div>
                    <div className="slide">
                      <div className="slide-image">
                        <img
                          src={require("../../assets/img/resource/card3.png")}
                          alt="Featured Image"
                        />
                      </div>
                      <div className="slide-body">
                        <h4 className="slide-title">
                          30-Day Walking Challenge
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-controller">
                    <button className="prev">
                      <img
                        src={require("../../assets/img/arrow-bold.png")}
                        alt="prevous slide"
                      />
                    </button>
                    <button className="next">
                      <img
                        src={require("../../assets/img/arrow-bold.png")}
                        alt="next slide"
                      />
                    </button>
                  </div>
                </div>
              </section>
              <section>
                <DocumentLibrary />
              </section>
            </main>
            {/*  Sidebar */}
            <aside>
              <section>
                <h2>
                  Total CSR Knowledge <br />
                  Base Team
                </h2>
                <ul className="people-list">
                  <li>
                    <img
                      src={require("../../assets/img/people/people2.png")}
                      alt="people"
                    />
                    <div>
                      <h4 className="name">Linda Bottoms</h4>
                      <a
                        href="mailto:lbottoms@shepherdins.com"
                        className="info"
                      >
                        lbottoms@shepherdins.com{" "}
                      </a>
                      <br />
                      <a href="tel:317.xxx.xxxx" className="info">
                        317.xxx.xxxx
                      </a>
                    </div>
                  </li>
                  <li>
                    <img
                      src={require("../../assets/img/people/people3.png")}
                      alt="people"
                    />
                    <div>
                      <h4 className="name">LuAnn Walcott</h4>
                      <a
                        href="mailto:lwalcott@shepherdins.com"
                        className="info"
                      >
                        lwalcott@shepherdins.com{" "}
                      </a>
                      <br />
                      <a href="tel:317.xxx.xxxx" className="info">
                        317.xxx.xxxx
                      </a>
                    </div>
                  </li>
                  <li>
                    <img
                      src={require("../../assets/img/people/people3.png")}
                      alt="people"
                    />
                    <div>
                      <h4 className="name">Susie Brancheu</h4>
                      <a
                        href="mailto:sbrancheau@shepherdins.com"
                        className="info"
                      >
                        sbrancheau@shepherdins.com{" "}
                      </a>
                      <br />
                      <a href="tel:317.xxx.xxxx" className="info">
                        317.xxx.xxxx
                      </a>
                    </div>
                  </li>
                  <li>
                    <img
                      src={require("../../assets/img/people/people2.png")}
                      alt="people"
                    />
                    <div>
                      <h4 className="name">Gary Campbell</h4>
                      <a
                        href="mailto:gcampbell@shepherdins.com"
                        className="info"
                      >
                        gcampbell@shepherdins.com{" "}
                      </a>
                      <br />
                      <a href="tel:317.xxx.xxxx" className="info">
                        317.xxx.xxxx
                      </a>
                    </div>
                  </li>
                  <li>
                    <img
                      src={require("../../assets/img/people/people3.png")}
                      alt="people"
                    />
                    <div>
                      <h4 className="name">Taylor Bikirk</h4>
                      <a href="mailto:tnikirk@shepherdins.com" className="info">
                        tnikirk@shepherdins.com{" "}
                      </a>
                      <br />
                      <a href="tel:317.xxx.xxxx" className="info">
                        317.xxx.xxxx
                      </a>
                    </div>
                  </li>
                  <li>
                    <img
                      src={require("../../assets/img/people/people3.png")}
                      alt="people"
                    />
                    <div>
                      <h4 className="name">Ashley Dawson</h4>
                      <a href="mailto:adawson@shepherdins.com" className="info">
                        adawson@shepherdins.com{" "}
                      </a>
                      <br />
                      <a href="tel:317.xxx.xxxx" className="info">
                        317.xxx.xxxx
                      </a>
                    </div>
                  </li>
                  <li>
                    <img
                      src={require("../../assets/img/people/people3.png")}
                      alt="people"
                    />
                    <div>
                      <h4 className="name">Maggie Watkins</h4>
                      <a
                        href="mailto:mwatkins@shepherdins.com"
                        className="info"
                      >
                        mwatkins@shepherdins.com{" "}
                      </a>
                      <br />
                      <a href="tel:317.xxx.xxxx" className="info">
                        317.xxx.xxxx
                      </a>
                    </div>
                  </li>
                </ul>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShepstepPage;
