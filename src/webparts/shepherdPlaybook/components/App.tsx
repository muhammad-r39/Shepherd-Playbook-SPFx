import * as React from "react";
import SiteNavigation from "./SiteNavigation";
import IndexPage from "./pages/IndexPage";
import CompanyResourcesPage from "./pages/CompanyResourcesPage";
import CommercialPage from "./pages/CommercialPage";
import EmployeeBenefitsPage from "./pages/EmployeeBenefitsPage";
import HumanResourcesPage from "./pages/HumanResourcesPage";
import ItPage from "./pages/ItPage";
import LifeInsurancePage from "./pages/LifeInsurancePage";
import MarketingPage from "./pages/MarketingPage";
import MedicarePage from "./pages/MedicarePage";
import PersonalPage from "./pages/PersonalPage";
import ShepstepPage from "./pages/ShepstepPage";
import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

interface AppProps {
  spHttpClient: SPHttpClient;
  siteUrl: string;
  context: WebPartContext;
}

const App: React.FC<AppProps> = ({ spHttpClient, siteUrl, context }) => {
  const [route, setRoute] = React.useState<string>(window.location.hash);

  React.useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const renderPage = () => {
    switch (route) {
      case "#company-resources":
        return <CompanyResourcesPage spHttpClient={spHttpClient} />;
      case "#human-resources":
        return <HumanResourcesPage spHttpClient={spHttpClient} />;
      case "#it":
        return <ItPage spHttpClient={spHttpClient} />;
      case "#marketing":
        return <MarketingPage spHttpClient={spHttpClient} />;
      case "#shepstep":
        return <ShepstepPage spHttpClient={spHttpClient} />;
      case "#commercial":
        return <CommercialPage spHttpClient={spHttpClient} />;
      case "#employee-benefits":
        return <EmployeeBenefitsPage spHttpClient={spHttpClient} />;
      case "#personal":
        return <PersonalPage spHttpClient={spHttpClient} />;
      case "#life-insurance":
        return <LifeInsurancePage spHttpClient={spHttpClient} />;
      case "#medicare":
        return <MedicarePage spHttpClient={spHttpClient} />;
      case "#index":
      default:
        return <IndexPage spHttpClient={spHttpClient} context={context} />;
    }
  };

  return (
    <>
      <SiteNavigation />
      <main className="page-content force-full-width">{renderPage()}</main>
    </>
  );
};

export default App;
