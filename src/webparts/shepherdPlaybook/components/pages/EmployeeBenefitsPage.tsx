import * as React from "react";
import { NewsCarousel } from "../NewsCarousel";
import { SPHttpClient } from "@microsoft/sp-http";
import { DocumentLibrary } from "../DocumentLibrary";

interface EmployeeBenefitsPageProps {
  spHttpClient: SPHttpClient;
}

const EmployeeBenefitsPage: React.FC<EmployeeBenefitsPageProps> = ({
  spHttpClient,
}) => {
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
            src={require("../../assets/img/banner/employee-benefits.jpg")}
            alt="background image"
          />
          <div className="container">
            <h1 className="page-title">EMPLOYEE BENEFITS</h1>
          </div>
        </div>
        <div className="header-logos">
          <div className="container">
            <ul className="gap-lg">
              <li>
                <a href="https://my.insuresign.com/#/login" target="_blank">
                  <img
                    src={require("../../assets/img/brands/brand24.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://shepherdins.sharepoint.com/sites/InformationTechnology/SitePages/New-Employees!.aspx"
                  target="_blank"
                >
                  <img
                    src={require("../../assets/img/brands/brand25.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a href="https://office.com/login" target="_blank">
                  <img
                    src={require("../../assets/img/brands/brand26.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://support.ringcentral.com/get-started/app.html"
                  target="_blank"
                >
                  <img
                    src={require("../../assets/img/brands/brand27.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://support.vertafore.com/vf_VertaforeLogin"
                  target="_blank"
                >
                  <img
                    src={require("../../assets/img/brands/brand28.png")}
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
                <h2>Employee Benefits News Center</h2>
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
                <h2>Employee Benefits Document Center</h2>
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
              <section>
                <h2>Department Leaders</h2>
                <ul className="people-list">
                  <li>
                    <img
                      src={require("../../assets/img/people/people2.png")}
                      alt="people"
                    />
                    <div>
                      <h4 className="name">Steve Gregory</h4>
                      <a
                        href="mailto:sgregory@shepherdins.com"
                        className="info"
                      >
                        sgregory@shepherdins.com{" "}
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
                      <h4 className="name">Shannon Russell</h4>
                      <a
                        href="mailto:srussell@shepherdins.com"
                        className="info"
                      >
                        srussell@shepherdins.com{" "}
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
                </ul>
              </section>
              <section>
                <h2>Forms & Procedures</h2>
                <div className="sidebar-links">
                  <a className="btn btn-blue" href="#">
                    Quote Form
                  </a>
                  <a className="btn btn-orange" href="#">
                    InsuredMine How-Tos
                  </a>
                  <a className="btn btn-light" href="#">
                    Claim Request Form
                  </a>
                  <a className="btn btn-blue" href="#">
                    Carrier Login Request Form
                  </a>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeBenefitsPage;
