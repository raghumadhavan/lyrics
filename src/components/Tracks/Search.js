import React, { useContext, useState } from "react";
import axios from "axios";
import { Consumer } from "../../context";
import { CORS, SEARCH_URI, SEARCH_PARAMS } from "./constants";

const fetchResult = title => {
  return axios.get(
    `${CORS}${SEARCH_URI}${title}${SEARCH_PARAMS}${process.env.REACT_APP_MM_KEY}`
  );
};

function Search() {
  const [title, setTitle] = useState("");
  const { setState } = useContext(Consumer);

  const findTrack = async event => {
    event.preventDefault();
    const result = await fetchResult(title);
    setState({
      track_list: result.data.message.body.track_list,
      heading: `Search Results`
    });
  };

  return (
    <div className="card card-body mb-4 p-4">
      <h1 className="display-4 text-center">
        <i className="fas fa-music"> Search For A Song</i>
      </h1>
      <p className="lead text-center">Get the lyrics for any song</p>
      <form onSubmit={findTrack} autoComplete="off">
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Song title.."
            name="title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">
          Get Lyrics
        </button>
      </form>
    </div>
  );
}

export default Search;
