import * as React from "react";
import { NewsCarousel } from "../NewsCarousel";
import { SPHttpClient } from "@microsoft/sp-http";
import { DocumentLibrary } from "../DocumentLibrary";

interface HumanResourcesPage {
  spHttpClient: SPHttpClient;
}

const HumanResourcesPage: React.FC<HumanResourcesPage> = ({ spHttpClient }) => {
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
            src={require("../../assets/img/banner/human-resources.jpg")}
            alt="background image"
          />
          <div className="container">
            <h1 className="page-title">HUMAN RESOURCES</h1>
          </div>
        </div>
        <div className="header-logos">
          <div className="container">
            <ul className="full-width">
              <li>
                <a href="https://www.anthem.com/account-login/" target="_blank">
                  <img
                    src={require("../../assets/img/brands/brand9.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a href="https://rsli.mylifeexpert.com/" target="_blank">
                  <img
                    src={require("../../assets/img/brands/brand10.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://participant.empower-retirement.com/participant/#/login"
                  target="_blank"
                >
                  <img
                    src={require("../../assets/img/brands/brand11.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a href="https://www.eyemed.com/en-us" target="_blank">
                  <img
                    src={require("../../assets/img/brands/brand12.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.openenrollment123.com/content/cex-consumer/openenrollment123/en/HSA/Employee.html"
                  target="_blank"
                >
                  <img
                    src={require("../../assets/img/brands/brand13.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a href="https://www.insuringsmiles.com/" target="_blank">
                  <img
                    src={require("../../assets/img/brands/brand14.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a href="https://www.paylocity.com/" target="_blank">
                  <img
                    src={require("../../assets/img/brands/brand15.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.reliancematrix.com/individuals/claims"
                  target="_blank"
                >
                  <img
                    src={require("../../assets/img/brands/brand16.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://iam.virginpulse.com/auth/realms/virginpulse/protocol/openid-connect/auth?client_id=genesis-ui&redirect_uri=https://app.member.virginpulse.com/%23/home&state=954bdbfe-1a08-4e8d-be4c-a9cdf353aa5a&response_mode=fragment&response_type=code&scope=openid&nonce=d2a528bb-b827-4552-a74a-e948e8fc0ef4"
                  target="_blank"
                >
                  <img
                    src={require("../../assets/img/brands/brand17.png")}
                    alt="Brand"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <div className="body-content">
        <div className="container">
          <div className="content-wrapper">
            <main>
              <section className="news-center extra-gap">
                <h2>HR News Center</h2>
                <NewsCarousel
                  spHttpClient={spHttpClient}
                  pageCategories={[
                    "Employee Benefits",
                    "Career Updates",
                    "Life Insurance",
                  ]}
                />
              </section>
              <section className="document-center">
                <h2>HR Document Center</h2>
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
            <aside>
              <section className="employee-guide">
                <h2>Employee Benefit Guide</h2>
                <a
                  href="https://online.flippingbook.com/view/1007426963/"
                  target="_blank"
                >
                  <img
                    src={require("../../assets/img/employee-benegits-guide.png")}
                    alt="employee-benegits-guide"
                  />
                </a>
              </section>
              <section className="">
                <h2>Holiday Schedule</h2>
                <ul className="event-lists">
                  <li className="event label-dark">
                    <div className="event-date">
                      <span className="year">2025</span>
                      <span className="date">1</span>
                      <span className="month">JAN</span>
                    </div>
                    <div className="event-details">
                      <div className="event-time">
                        <h4 className="event-title">New Years Day</h4>
                        <span className="event-duration">Closed</span>
                      </div>
                    </div>
                  </li>
                  <li className="event label-dark">
                    <div className="event-date">
                      <span className="year">2025</span>
                      <span className="date">18</span>
                      <span className="month">APR</span>
                    </div>
                    <div className="event-details">
                      <div className="event-time">
                        <h4 className="event-title">Good Friday</h4>
                        <span className="event-duration">Closed @ 12 pm</span>
                      </div>
                    </div>
                  </li>
                  <li className="event label-lime">
                    <div className="event-date">
                      <span className="year">2025</span>
                      <span className="date">23</span>
                      <span className="month">MAY</span>
                    </div>
                    <div className="event-details">
                      <div className="event-time">
                        <h4 className="event-title">Memorial Day</h4>
                        <span className="event-duration">Closed @ 2 pm</span>
                      </div>
                    </div>
                  </li>
                  <li className="event label-lime">
                    <div className="event-date">
                      <span className="year">2025</span>
                      <span className="date">26</span>
                      <span className="month">MAY</span>
                    </div>
                    <div className="event-details">
                      <div className="event-time">
                        <h4 className="event-title">Memorial Day</h4>
                        <span className="event-duration">Closed</span>
                      </div>
                    </div>
                  </li>
                  <li className="event label-green">
                    <div className="event-date">
                      <span className="year">2025</span>
                      <span className="date">3</span>
                      <span className="month">JUL</span>
                    </div>
                    <div className="event-details">
                      <div className="event-time">
                        <h4 className="event-title">Independence Day</h4>
                        <span className="event-duration">Closed @ 2 pm</span>
                      </div>
                    </div>
                  </li>
                  <li className="event label-green">
                    <div className="event-date">
                      <span className="year">2025</span>
                      <span className="date">4</span>
                      <span className="month">JUL</span>
                    </div>
                    <div className="event-details">
                      <div className="event-time">
                        <h4 className="event-title">Independence Day</h4>
                        <span className="event-duration">Closed</span>
                      </div>
                    </div>
                  </li>
                  <li className="event label-dark">
                    <div className="event-date">
                      <span className="year">2025</span>
                      <span className="date">29</span>
                      <span className="month">AUG</span>
                    </div>
                    <div className="event-details">
                      <div className="event-time">
                        <h4 className="event-title">Labor Day</h4>
                        <span className="event-duration">Closed @ 2 pm</span>
                      </div>
                    </div>
                  </li>
                  <li className="event label-dark">
                    <div className="event-date">
                      <span className="year">2025</span>
                      <span className="date">1</span>
                      <span className="month">SEP</span>
                    </div>
                    <div className="event-details">
                      <div className="event-time">
                        <h4 className="event-title">Labor Day</h4>
                        <span className="event-duration">Closed</span>
                      </div>
                    </div>
                  </li>
                  <li className="event label-lime">
                    <div className="event-date">
                      <span className="year">2025</span>
                      <span className="date">26</span>
                      <span className="month">NOV</span>
                    </div>
                    <div className="event-details">
                      <div className="event-time">
                        <h4 className="event-title">Thanksgiving</h4>
                        <span className="event-duration">Closed @ 12 pm</span>
                      </div>
                    </div>
                  </li>
                  <li className="event label-lime">
                    <div className="event-date">
                      <span className="year">2025</span>
                      <span className="date">27</span>
                      <span className="month">NOV</span>
                    </div>
                    <div className="event-details">
                      <div className="event-time">
                        <h4 className="event-title">Thanksgiving</h4>
                        <span className="event-duration">Closed</span>
                      </div>
                    </div>
                  </li>
                  <li className="event label-lime">
                    <div className="event-date">
                      <span className="year">2025</span>
                      <span className="date">28</span>
                      <span className="month">NOV</span>
                    </div>
                    <div className="event-details">
                      <div className="event-time">
                        <h4 className="event-title">Thanksgiving</h4>
                        <span className="event-duration">Closed</span>
                      </div>
                    </div>
                  </li>
                  <li className="event label-green">
                    <div className="event-date">
                      <span className="year">2025</span>
                      <span className="date">24</span>
                      <span className="month">DEC</span>
                    </div>
                    <div className="event-details">
                      <div className="event-time">
                        <h4 className="event-title">Christmas Eve</h4>
                        <span className="event-duration">Closed</span>
                      </div>
                    </div>
                  </li>
                  <li className="event label-green">
                    <div className="event-date">
                      <span className="year">2025</span>
                      <span className="date">25</span>
                      <span className="month">DEC</span>
                    </div>
                    <div className="event-details">
                      <div className="event-time">
                        <h4 className="event-title">Christmas</h4>
                        <span className="event-duration">Closed</span>
                      </div>
                    </div>
                  </li>
                  <li className="event label-dark">
                    <div className="event-date">
                      <span className="year">2025</span>
                      <span className="date">31</span>
                      <span className="month">DEC</span>
                    </div>
                    <div className="event-details">
                      <div className="event-time">
                        <h4 className="event-title">New Years Eve</h4>
                        <span className="event-duration">Closed</span>
                      </div>
                    </div>
                  </li>
                  <li className="event label-dark">
                    <div className="event-date">
                      <span className="year">2026</span>
                      <span className="date">1</span>
                      <span className="month">JAN</span>
                    </div>
                    <div className="event-details">
                      <div className="event-time">
                        <h4 className="event-title">New Years Day</h4>
                        <span className="event-duration">Closed</span>
                      </div>
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

export default HumanResourcesPage;
