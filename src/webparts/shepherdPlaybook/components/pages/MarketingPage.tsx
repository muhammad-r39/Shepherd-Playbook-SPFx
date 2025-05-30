import * as React from "react";
import { NewsCarousel } from "../NewsCarousel";
import { SPHttpClient } from "@microsoft/sp-http";
import { DocumentLibrary } from "../DocumentLibrary";

interface MarketingPageProps {
  spHttpClient: SPHttpClient;
}

const MarketingPage: React.FC<MarketingPageProps> = ({ spHttpClient }) => {
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
            src={require("../../assets/img/banner/marketing.jpg")}
            alt="background image"
          />
          <div className="container">
            <h1 className="page-title">MARKETING</h1>
          </div>
        </div>
        <div className="header-logos">
          <div className="container">
            <ul className="gap-lg">
              <li>
                <a href="https://forms.office.com/r/v55KQ9fxnw" target="_blank">
                  <img
                    src={require("../../assets/img/brands/brand18.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a href="https://forms.office.com/r/wVV1RhPfHS" target="_blank">
                  <img
                    src={require("../../assets/img/brands/brand19.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img
                    src={require("../../assets/img/brands/brand20.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img
                    src={require("../../assets/img/brands/brand21.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a href="https://forms.office.com/r/WqcnwJb6ur" target="_blank">
                  <img
                    src={require("../../assets/img/brands/brand22.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a href="https://forms.office.com/r/ptcD2CwLB2" target="_blank">
                  <img
                    src={require("../../assets/img/brands/brand23.png")}
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
                <h2>Marketing News Center</h2>
                <NewsCarousel
                  spHttpClient={spHttpClient}
                  pageCategories={["Marketing", "Training"]}
                />
              </section>
              <section className="document-center">
                <h2>Marketing Document Center</h2>
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
              <section className="text-center">
                <h2>Latest Newsletter</h2>
                <a href="#">
                  <img
                    src={require("../../assets/img/scoop.png")}
                    alt="The Scoop"
                  />
                </a>
              </section>
              <section className="text-center">
                <h2>Logo Use Tips</h2>
                <a href="#">
                  <img
                    src={require("../../assets/img/how-not-to-use.png")}
                    alt="Logo use tips"
                  />
                </a>
              </section>
              <section className="">
                <h2>Social Links</h2>
                <div className="sidebar-links">
                  <a className="btn btn-blue" href="#">
                    Facebook
                  </a>
                  <a className="btn btn-orange" href="#">
                    Instagram
                  </a>
                  <a className="btn btn-light" href="#">
                    LinkedIn
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

export default MarketingPage;
