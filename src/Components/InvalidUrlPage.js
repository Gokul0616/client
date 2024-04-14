// components/InvalidUrlPage.js

import React from "react";
import { Link, useParams } from "react-router-dom";

const InvalidUrlPage = () => {
  const id = useParams().id;
  console.log(id);
  return (
    <div>
      <h2>Invalid URL</h2>
      <p>The URL you entered is invalid.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default InvalidUrlPage;
