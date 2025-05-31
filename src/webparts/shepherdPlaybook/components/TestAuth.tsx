import * as React from "react";
import { getUserToken } from "../utils/auth";

const TestAuth: React.FC = () => {
  const [token, setToken] = React.useState("");

  const handleLogin = async () => {
    try {
      const userToken = await getUserToken();
      console.log("Access Token:", userToken);
      setToken(userToken);
    } catch (err) {
      console.error("Auth Error:", err);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login and Fetch Token</button>
      {token && <pre style={{ maxWidth: 600 }}>{token}</pre>}
    </div>
  );
};

export default TestAuth;
