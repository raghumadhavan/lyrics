import React, { useState, useEffect } from "react";
import axios from "axios";
import { CORS, TOP_10_URI } from "./components/Tracks/constants";

const Context = React.createContext();

function Provider(props) {
  let initialState = {
    track_list: [],
    heading: "Top 10 tracks"
  };
  const [state, setState] = useState(initialState);
  useEffect(() => {
    axios
      .get(`${CORS}${TOP_10_URI}${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        setState({
          track_list: res.data.message.body.track_list,
          heading: "Top 10 tracks"
        });
      });
  }, []);

  return (
    <Context.Provider value={{ state, setState }}>
      {props.children}
    </Context.Provider>
  );
}

export default Provider;

export const Consumer = Context;
