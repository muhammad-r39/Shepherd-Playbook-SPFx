import * as React from "react";
import { SPHttpClient } from "@microsoft/sp-http";
import { DocumentLibrary } from "../DocumentLibrary";

interface CompanyResourcesPageProps {
  spHttpClient: SPHttpClient;
}

const CompanyResourcesPage: React.FC<CompanyResourcesPageProps> = ({
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
            src={require("../../assets/img/banner/home.jpg")}
            alt="background image"
          />
          <div className="container">
            <h1 className="page-title">COMPANY RESOURCES</h1>
          </div>
        </div>
        <div className="header-logos">
          <div className="container">
            <ul className="full-width">
              <li>
                <a href="https://www.ams360.com/" target="_blank">
                  <img
                    src={require("../../assets/img/brands/brand1.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://benefitpoint.vertafore.com/login.do"
                  target="_blank"
                >
                  <img
                    src={require("../../assets/img/brands/brand2.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://shepherdins.sharepoint.com/:x:/s/ShepSocial/EYwN8hnL28BNke6Ttjxbt7UB0GQyYuq2PU8oOHy3dKgL5A?e=lMCaZs"
                  target="_blank"
                >
                  <img
                    src={require("../../assets/img/brands/brand3.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://login.apps.vertafore.com/as/authorization.oauth2?client_id=imageright-web-ui&redirect_uri=https%3a%2f%2fwebclient.worksmartonline.vertafore.com%2fimageright.web.client71%2f&response_type=code&scope=profile%20email&state=ed2492e8-8ed9-4e08-9ebe-a6e1398ebd04&code_challenge=oTD-j6XvobicxvV03dLRmK2FNr3d9xsGI3Q2rzzgGnc&code_challenge_method=S256&response_mode=query"
                  target="_blank"
                >
                  <img
                    src={require("../../assets/img/brands/brand4.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a
                  href="http://exp-informer.shepherdins.local/"
                  target="_blank"
                >
                  <img
                    src={require("../../assets/img/brands/brand5.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://shepherdins.insuredmine.com/agent/session/loginone"
                  target="_blank"
                >
                  <img
                    src={require("../../assets/img/brands/brand6.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a href="http://paylocity.com/" target="_blank">
                  <img
                    src={require("../../assets/img/brands/brand7.png")}
                    alt="Brand"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://auth.zywave.com/username/login?ReturnUrl=https%3A%2F%2Fauth.zywave.com%2Flogin%3FReturnUrl%3D%252Fconnect%252Fauthorize%252Fcallback%253Fclient_id%253DZywave.Content.CMS.App%2526redirect_uri%253Dhttps%25253A%25252F%25252Fcms.zywave.com%25252Fsignin-oidc%2526response_type%253Dcode%2526scope%253Dopenid%252520profile%252520email%252520api.profiles%252520api.shell%2526code_challenge%253D_2Js42GS0qJii74YOGWMPA0fuI1PP5bVXqKFFyl4MXs%2526code_challenge_method%253DS256%2526nonce%253D638610048802162968.NTQ0Y2I0OGEtYzJmYi00ZjVkLTk4OGUtYjkwZTBiMjgwZGNhNzZhNjE1MzktMjg1Yy00YTQ0LWI4MTItOWUwMDFlODM1Nzkx%2526state%253DCfDJ8BoyvVqTDq1LjhXB4q0J1e_--okmSQvT0WWslNbYKLxHfeut0Tq8nl9fe05acWPHssSwND-eifSH9raDZ9oc98yU7uDtYU3Cg0yonEIYGSOiKFRblqCxOJ7wMENShI-5UNp9nkgTJ-iRrRxFZpkOc-n8f-GrQ_3nGTbS48IWbCiO%2526x-client-SKU%253DID_NET8_0%2526x-client-ver%253D7.1.2.0"
                  target="_blank"
                >
                  <img
                    src={require("../../assets/img/brands/brand8.png")}
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
              <section className="document-center">
                <h2>Document Center</h2>
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
              <section className="birthdays">
                <h2>Employee Directory</h2>
                <ul className="people-list">
                  <li>
                    <img
                      src={require("../../assets/img/people/people1.png")}
                      alt="people"
                    />
                    <div>
                      <h4 className="name">Leo Giles</h4>
                      <span className="info">Today</span>
                    </div>
                  </li>
                  <li>
                    <img
                      src={require("../../assets/img/people/people2.png")}
                      alt="people"
                    />
                    <div>
                      <h4 className="name">Jermaine Higgins</h4>
                      <span className="info">November 11</span>
                    </div>
                  </li>
                  <li>
                    <img
                      src={require("../../assets/img/people/people3.png")}
                      alt="people"
                    />
                    <div>
                      <h4 className="name">Pauline Glenn</h4>
                      <span className="info">November 23</span>
                    </div>
                  </li>
                  <li>
                    <img
                      src={require("../../assets/img/people/people4.png")}
                      alt="people"
                    />
                    <div>
                      <h4 className="name">Eve Barton</h4>
                      <span className="info">November 28</span>
                    </div>
                  </li>
                  <li>
                    <img
                      src={require("../../assets/img/people/people5.png")}
                      alt="people"
                    />
                    <div>
                      <h4 className="name">Al Donaldson</h4>
                      <span className="info">December 1</span>
                    </div>
                  </li>
                  <li>
                    <img
                      src={require("../../assets/img/people/people4.png")}
                      alt="people"
                    />
                    <div>
                      <h4 className="name">Eve Barton</h4>
                      <span className="info">November 28</span>
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

export default CompanyResourcesPage;
