import App from 'next/app'
import jsforce from "jsforce";
import React, { useState, useEffect } from "react";
import { oauthClientId, oauthRedirectUri, oauthProxyUrl, oauthLoginUrl } from "../config";

function MyApp({ Component, pageProps }) {

  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const [connection, setConnection] = useState();
  const [sObjects, setSObjects] = useState([]);

  useEffect(() => {
    console.log("use effect _app.js");
    jsforce.browser.init({
      loginUrl: oauthLoginUrl,
      clientId: oauthClientId,
      redirectUri: oauthRedirectUri,
      proxyUrl: oauthProxyUrl
    });

    console.log(jsforce.browser.isLoggedIn());
    setIsLoggedIn(jsforce.browser.isLoggedIn());

    jsforce.browser.on("connect", function (conn) {
      console.log("connected");
      setIsLoggedIn(jsforce.browser.isLoggedIn());
      setConnection(conn);
    });

    jsforce.browser.on("disconnect", function () {
      console.log("disconnected");
      setIsLoggedIn(false);
      setConnection(null);
    });
  }, []);

  const logout = (e) => {
    if (jsforce && jsforce.browser) {
      jsforce.browser.logout();
    }
  };

  const login = (e) => {
    if (jsforce && jsforce.browser) {
      jsforce.browser.login();
    }
  };

  pageProps.login = login;
  pageProps.logout = logout;
  pageProps.sObjects = sObjects;
  pageProps.setSObjects = setSObjects;
  pageProps.isLoggedIn = isLoggedIn;
  pageProps.connection = connection;

  return <Component {...pageProps} />;
}

export default MyApp;
