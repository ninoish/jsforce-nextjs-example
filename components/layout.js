import React from "react";
import Head from "next/head";

const Layout = props => {

  const renderLogout = () => {
    return <button onClick={props.onLogout}>Logout</button>
  }

  const renderLogin = () => {
    return <button onClick={props.onLogin}>Login</button>
  }

    return (
      <>
        <Head>
          <title>nextjs-jsforce-example</title>
        </Head>
        <style jsx global>{`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            color: #333;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              "Helvetica Neue", Arial, Noto Sans, sans-serif,
              "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
              "Noto Color Emoji";
          }
          .container {
            max-width: 65rem;
            margin: 1.5rem auto;
            padding-left: 1rem;
            padding-right: 1rem;
          }
        `}</style>
        <header>
          {props.isLoggedIn ? renderLogout() : renderLogin() }
        </header>

        <main>
          <div className="container">{props.children}</div>
        </main>
      </>
    );
}

export default Layout;
