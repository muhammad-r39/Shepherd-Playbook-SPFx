import * as msal from "@azure/msal-browser";
import { config } from "../config";

// 1. Create MSAL instance
const msalInstance = new msal.PublicClientApplication({
  auth: {
    clientId: config.clientId,
    authority: `https://login.microsoftonline.com/${config.tenantId}`,
  },
});

// 2. Ensure it’s initialized before any login/token function
let isInitialized = false;

async function ensureInitialized() {
  if (!isInitialized) {
    await msalInstance.initialize();
    isInitialized = true;
  }
}

async function login() {
  await ensureInitialized();

  const loginRequest = {
    scopes: ["https://api.yammer.com/.default"],
  };

  try {
    const loginResponse = await msalInstance.loginPopup(loginRequest);
    console.log("Login successful:", loginResponse);
    msalInstance.setActiveAccount(loginResponse.account);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

async function fetchMSALUserToken(): Promise<string> {
  await ensureInitialized();

  const activeAccount = msalInstance.getActiveAccount();
  if (!activeAccount) throw new Error("No active account. User must login.");

  const tokenRequest: msal.SilentRequest = {
    scopes: ["https://api.yammer.com/.default"],
    account: activeAccount,
  };

  try {
    const tokenResponse = await msalInstance.acquireTokenSilent(tokenRequest);
    return tokenResponse.accessToken;
  } catch (error) {
    console.error("Token fetch error:", error);
    throw error;
  }
}

export async function getUserToken(): Promise<string> {
  await ensureInitialized();

  const activeAccount = msalInstance.getActiveAccount();

  if (!activeAccount) {
    console.log("No active account found. Logging in...");
    await login();
  }

  const userToken = await fetchMSALUserToken();
  return userToken;
}
