const client_id = window.clientId;
const tenant_id = window.tenantId;

// Initialize MSAL
const msalInstance = new msal.PublicClientApplication({
  auth: {
    clientId: client_id,
    authority: `https://login.microsoftonline.com/${tenant_id}`,
  },
});

async function login() {
  const loginRequest = {
    scopes: ["https://api.yammer.com/.default"],
  };

  try {
    const loginResponse = await msalInstance.loginPopup(loginRequest);
    console.log("Login successful:", loginResponse);

    // Set the active account after login
    msalInstance.setActiveAccount(loginResponse.account);
  } catch (error) {
    console.error("Login error:", error);
  }
}

async function fetchMSALUserToken() {
  const tokenRequest = {
    scopes: ["https://api.yammer.com/.default"],
    account: msalInstance.getActiveAccount(),
  };

  try {
    const activeAccount = msalInstance.getActiveAccount();

    if (!activeAccount) {
      throw new Error("No active account! The user must log in first.");
    }

    const tokenResponse = await msalInstance.acquireTokenSilent(tokenRequest);

    return tokenResponse.accessToken;
  } catch (error) {
    console.error("Error acquiring token:", error);
  }
  return "";
}

async function getUserToken() {
  const activeAccount = msalInstance.getActiveAccount();

  if (!activeAccount) {
    console.log("No active account found. Logging in...");
    await login();
  }

  const userToken = await fetchMSALUserToken();

  return userToken;
}
