import Link from "next/link";
import Layout from "../../components/layout";
import Router from "next/router";
import React, { useState, useEffect } from "react";

function sObjDetail(props) {
  const [sObject, setSObject] = useState();

  useEffect(() => {
    if (typeof props.isLoggedIn == "undefined") {
      return;
    }
    if (!props.isLoggedIn || !props.query.sobjApiName) {
      Router.push("/");
      return;
    }

    if (!props.connection || sObject) {
      return;
    }

    props.connection.describe(props.query.sobjApiName, function (err, meta) {
      if (err) {
        return console.error(err);
      }
      setSObject(meta);
      console.log(meta);
    });
  });

  const renderMetadata = () => {
    return (
      <ul>
        {Object.keys(sObject).map(key => {
          switch(typeof sObject[key]) {
            case 'object' : 
              if(Array.isArray(sObject[key])) {
                return <li key={key}>{key} : {sObject[key].length}</li>
              } else {
                return;
              }
            case 'boolean' :
              return <li key={key}>{key} : {sObject[key] ? 'true' : 'false'}</li>
              default : 
              return <li key={key}>{key} : {sObject[key]}</li>
          }          
        })}
      </ul>
    )
  }

  return (
    <Layout
      isLoggedIn={props.isLoggedIn}
      onLogin={props.login}
      onLogout={props.logout}
    >
      <div>
        <Link href="/sobjects">
          <a>&lt;= Back to list</a>
        </Link>
      </div>
      <h1>{props.query.sobjApiName}</h1>
      {sObject ? renderMetadata() : <h2>Loading...</h2>}
    </Layout>
  );
}

sObjDetail.getInitialProps = ({ query }) => {
  return { query };
};

export default sObjDetail;
