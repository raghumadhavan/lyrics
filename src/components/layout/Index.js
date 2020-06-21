import React from "react";
import Tracks from "../Tracks/Tracks";
import Search from "../Tracks/Search";

function Index() {
  return (
    <React.Fragment>
      <Search />
      <Tracks />
    </React.Fragment>
  );
}

export default Index;
