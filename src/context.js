import React, { useState, useEffect } from "react";
import axios from "axios";

const Context = React.createContext();

function Provider(props) {
  let initialState = {
    track_list: [],
    heading: "Top 10 tracks"
  };
  const [state, setState] = useState(initialState);
  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=in&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        setState({
          track_list: res.data.message.body.track_list,
          heading: "Top 10 tracks"
        });
      })
      .catch(err => console.log(err));
  }, []);

  return <Context.Provider value={state}>{props.children}</Context.Provider>;
}

export default Provider;

export const Consumer = Context;
