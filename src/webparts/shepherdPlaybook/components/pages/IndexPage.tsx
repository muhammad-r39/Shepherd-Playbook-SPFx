import * as React from "react";
import { NewsCarousel } from "../NewsCarousel";
import { SPHttpClient } from "@microsoft/sp-http";
import { BirthdayAnniversary } from "../BirthdayAnniversary";
import CalendarEvents from "../CalendarEvents/CalendarEvents";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import VivaFeed from "../VivaFeed";

interface IndexPageProps {
  spHttpClient: SPHttpClient;
  context: WebPartContext;
}

const IndexPage: React.FC<IndexPageProps> = ({ spHttpClient, context }) => {
  React.useEffect(() => {
    const handleLoad = () => {};

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
        <div className="hero-banner home">
          <img
            className="background-image"
            src={require("../../assets/img/banner/home.jpg")}
            alt="background image"
          />
          <div className="container">
            {/* <!-- Page Title --> */}
            <h1 className="page-title"></h1>
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
              <section className="news-center">
                <h2>News Center</h2>
                <NewsCarousel spHttpClient={spHttpClient} pageCategories={[]} />
              </section>
              <section className="shep-social">
                <h2>ShepSocial</h2>
                <VivaFeed />
              </section>
              <section className="events-holidays">
                <h2>Events & Holidays</h2>
                <div className="events-holidays-wrapper">
                  <CalendarEvents spHttpClient={spHttpClient} />
                </div>
              </section>
            </main>
            {/* <!-- Sidebar --> */}
            <aside>
              <section className="internal-forms">
                <h2>Internal Forms</h2>
                <div className="internal-forms-list">
                  <a
                    className="btn btn-blue"
                    href="https://forms.office.com/r/5DX6X8jhpJ"
                    target="_blank"
                  >
                    Carrier Login Request Form
                  </a>
                  <a
                    className="btn btn-orange"
                    href="https://forms.office.com/r/wVV1RhPfHS"
                    target="_blank"
                  >
                    Marketing Request Form
                  </a>
                  <a
                    className="btn btn-light strip-padding"
                    href="https://forms.office.com/r/WqcnwJb6ur"
                    target="_blank"
                  >
                    Stationary & Business Card Request Form
                  </a>
                  <a
                    className="btn btn-blue"
                    href="https://forms.office.com/r/qa7mrFEVSq?origin=lprLink"
                    target="_blank"
                  >
                    Volunteer Hours Tracking
                  </a>
                  <a
                    className="btn btn-orange strip-padding"
                    href="https://forms.office.com/r/ZqprcRzSKw"
                    target="_blank"
                  >
                    Carmel Visitor Registration Form
                  </a>
                  <a
                    className="btn btn-light strip-padding"
                    href="#"
                    target="_blank"
                  >
                    Stationary & Business Card Request Form
                  </a>
                </div>
              </section>
              <section className="birthdays">
                <h2>BIRTHDAYS & ANNIVERSARIES</h2>
                <BirthdayAnniversary />
              </section>
            </aside>
          </div>
        </div>
      </div>
      <div className="popup-container"></div>
    </>
  );
};

export default IndexPage;
