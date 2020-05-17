import Link from "next/link";
import Layout from "../../components/layout";
import Router from "next/router";
import React, { useState, useEffect } from "react";

function sObjList(props) {

  useEffect(() => {
    console.log(props.sObjects.length);
    if (typeof props.isLoggedIn == "undefined") {
      return;
    }
    if (!props.isLoggedIn) {
      Router.push("/");
      return;
    }

    if (!props.connection || props.sObjects.length > 0) {
      return;
    }
    props.connection.describeGlobal(function (err, res) {
      if (err) {
        return console.error(err);
      }
      console.log(res.sobjects);
      props.setSObjects(res.sobjects);
    });
  });

  return (
    <Layout
      isLoggedIn={props.isLoggedIn}
      onLogin={props.login}
      onLogout={props.logout}
    >
      <h1>sObjects</h1>
      <h2>
        {props.sObjects.length == 0 ? (
          <span>Loading...</span>
        ) : (
          <span>{props.sObjects.length} objects</span>
        )}
      </h2>
      <ul>
        {props.sObjects.map((sobj) => {
          return (
            <li key={sobj.name}>
              <Link href={`/sobjects/${sobj.name}`}>
                <a>{sobj.name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}

export default sObjList;
