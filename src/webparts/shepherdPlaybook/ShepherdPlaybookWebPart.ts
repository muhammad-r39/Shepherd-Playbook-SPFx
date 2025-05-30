import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";
import "./assets/css/style";
import "./assets/css/calendar";
import "./assets/css/viva-feed";

export interface IShepherdPlaybookWebPartProps {}

export default class ShepherdPlaybookWebPart extends BaseClientSideWebPart<IShepherdPlaybookWebPartProps> {
  public render(): void {
    try {
      const element = React.createElement(App, {
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        context: this.context,
      });
      ReactDOM.render(element, this.domElement);
    } catch (err) {
      console.error("Webpart render error:", err);
      this.domElement.innerHTML = `
      <div style="padding: 1rem; color: red;">
        <h2>Something went wrong</h2>
        <pre>${err?.message || JSON.stringify(err, null, 2)}</pre>
      </div>
    `;
    }
  }

  protected onDispose(): void {
    ReactDOM.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }
}
