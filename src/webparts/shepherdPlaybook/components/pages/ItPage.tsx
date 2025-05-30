import * as React from "react";
import { NewsCarousel } from "../NewsCarousel";
import { SPHttpClient } from "@microsoft/sp-http";
import { DocumentLibrary } from "../DocumentLibrary";

interface ItPageProps {
  spHttpClient: SPHttpClient;
}

const ItPage: React.FC<ItPageProps> = ({ spHttpClient }) => {
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
            src={require("../../assets/img/banner/it.jpg")}
            alt="background image"
          />
          <div className="container">
            {/* <!-- Page Title --> */}
            <h1 className="page-title">INFORMATION TECHNOLOGY</h1>
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
                <h2>IT News Center</h2>
                <NewsCarousel
                  spHttpClient={spHttpClient}
                  pageCategories={["IT", "Information"]}
                />
              </section>
              <section className="document-center">
                <h2>IT Document Center</h2>
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
            {/* <!-- Sidebar --> */}
            <aside>
              <section className="tech-support">
                <h2>Who To Contact</h2>
                <ul className="people-list">
                  <li className="list-head">
                    <h4 className="name">Tech Support</h4>
                    <a
                      href="mailto:techsupport@shepherdins.com"
                      className="info"
                    >
                      techsupport@shepherdins.com
                    </a>
                  </li>
                  <li>
                    <img
                      src={require("../../assets/img/people/people2.png")}
                      alt="people"
                    />
                    <div>
                      <h4 className="name">Brian Witherow</h4>
                      <h5 className="info">IT Director</h5>
                      <a
                        href="mailto:bwitherow@shepherdins.com"
                        className="info"
                      >
                        bwitherow@shepherdins.com
                      </a>
                      <br />
                      <a href="tel:317.808.8876" className="info">
                        317.808.8876
                      </a>
                    </div>
                  </li>
                  <li>
                    <img
                      src={require("../../assets/img/people/people4.png")}
                      alt="people"
                    />
                    <div>
                      <h4 className="name">Gary du Bernard</h4>
                      <h5 className="info">Systems Engineer</h5>
                      <a
                        href="mailto:gdubernard@shepherdins.com"
                        className="info"
                      >
                        gdubernard@shepherdins.com{" "}
                      </a>
                      <br />
                      <a href="tel:317.343.3120" className="info">
                        317.343.3120
                      </a>
                    </div>
                  </li>
                  <li>
                    <img
                      src={require("../../assets/img/people/people3.png")}
                      alt="people"
                    />
                    <div>
                      <h4 className="name">Amanda Randol</h4>
                      <h5 className="info">Systems Engineer</h5>
                      <a href="mailto:arandol@shepherdins.com" className="info">
                        arandol@shepherdins.com{" "}
                      </a>
                      <br />
                      <a href="tel:502.657.2312" className="info">
                        502.657.2312
                      </a>
                    </div>
                  </li>
                </ul>
              </section>
              <section className="training-videos">
                <h2>Training Videos</h2>
                <h3>Office Help Videos</h3>
                <div className="sidebar-links">
                  <a
                    className="btn btn-blue"
                    href="https://support.office.com/en-us/article/Excel-video-training-9bc05390-e94c-46af-a5b3-d7c22f6990bb?ui=en-US&rs=en-US&ad=US"
                    target="_blank"
                  >
                    Excel
                  </a>
                  <a
                    className="btn btn-orange"
                    href="https://support.office.com/en-us/article/Outlook-video-training-8a5b816d-9052-4190-a5eb-494512343cca?ui=en-US&rs=en-US&ad=US://"
                    target="_blank"
                  >
                    Outlook
                  </a>
                  <a
                    className="btn btn-light"
                    href="https://support.office.com/en-us/article/PowerPoint-video-training-40e8c930-cb0b-40d8-82c4-bd53d3398787?ui=en-US&rs=en-US&ad=US://"
                    target="_blank"
                  >
                    PowerPoint
                  </a>
                  <a
                    className="btn btn-blue"
                    href="https://support.office.com/en-us/article/microsoft-teams-video-training-4f108e54-240b-4351-8084-b1089f0d21d7?wt.mc_id=otc_home&ui=en-US&rs=en-US&ad=US://"
                    target="_blank"
                  >
                    Teams
                  </a>
                  <a
                    className="btn btn-orange"
                    href="https://support.office.com/en-us/article/Word-video-training-7bcd85e6-2c3d-4c3c-a2a5-5ed8847eae73?ui=en-US&rs=en-US&ad=US://"
                    target="_blank"
                  >
                    Work
                  </a>
                </div>
                <h3>Office Help Videos</h3>
                <div className="sidebar-links">
                  <a
                    className="btn btn-blue"
                    href="https://support.ringcentral.com/get-started/app.html"
                    target="_blank"
                  >
                    Get Started on MVP
                  </a>
                  <a
                    className="btn btn-orange"
                    href="https://support.ringcentral.com/get-started/message.html"
                    target="_blank"
                  >
                    Get Started on Messaging
                  </a>
                  <a
                    className="btn btn-light"
                    href="https://support.ringcentral.com/get-started/video.html"
                    target="_blank"
                  >
                    Get Started on Video
                  </a>
                  <a
                    className="btn btn-blue"
                    href="https://support.ringcentral.com/get-started/phone.html"
                    target="_blank"
                  >
                    Get Started on Phone
                  </a>
                  <a
                    className="btn btn-orange"
                    href="https://support.ringcentral.com/get-started/fax.html"
                    target="_blank"
                  >
                    Get Started on Fax
                  </a>
                </div>
                <h3>Office Help Videos</h3>
                <div className="sidebar-links">
                  <a
                    className="btn btn-blue"
                    href="https://assets.ringcentral.com/us/guide/quick-guide/yealink-T48U.pdf"
                    target="_blank"
                  >
                    Yeahlink T48U Quick Guide
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

export default ItPage;
