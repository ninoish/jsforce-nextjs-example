import Link from "next/link";
import Layout from "../components/layout";

function Home(props) {
  const renderHome = () => {
    return (
    <main>
      <h1>You are logged in!</h1>
      <Link href="/sobjects">
        <a>sObjects</a>
      </Link>
    </main>);
  };

  const renderLogin = () => {
    return (
    <div>
      <h1>You haven't logged in</h1>
      </div>
    );
  };

  return (
    <Layout
      isLoggedIn={props.isLoggedIn}
      onLogin={props.login}
      onLogout={props.logout}
    >
      {props.isLoggedIn ? renderHome() : renderLogin()}
    </Layout>
  );
}

export default Home;
