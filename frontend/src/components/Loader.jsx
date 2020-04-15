import React from "react";

export const Loader = ({ loading, children }) => (
  <React.Fragment>
      {loading && <span>loading</span>}
      {!loading && children}
  </React.Fragment>
);
