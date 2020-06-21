import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { CORS, TRACK_URI, LYRICS_URI } from "./constants";

import Spinner from "../layout/Spinner";

function Lyrics(props) {
  const [track, setTrack] = useState({});
  const [lyrics, setLyrics] = useState({});

  const getTrack = () => {
    return axios.get(
      `${CORS}${TRACK_URI}${props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
    );
  };

  const getLyrics = () => {
    return axios.get(
      `${CORS}${LYRICS_URI}${props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
    );
  };

  useEffect(() => {
    (async () => {
      const lyricResponse = await getLyrics();
      const trackResponse = await getTrack();

      setLyrics(lyricResponse.data.message.body.lyrics);
      setTrack(trackResponse.data.message.body.track);
    })();
  }, []);

  return (
    <>
      {Object.keys(track).length && Object.keys(lyrics).length ? (
        <>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go back
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by{" "}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>
          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album ID</strong>: {track.album_id}
            </li>
            <li className="list-group-item">
              <strong>Song Genre</strong>:{" "}
              {track.primary_genres.music_genre_list.length
                ? track.primary_genres.music_genre_list[0].music_genre
                    .music_genre_name
                : "Not available"}
            </li>
            <li className="list-group-item">
              <strong>Explicit Words</strong> : {track.explicit ? "Yes" : "No"}
            </li>
            <li className="list-group-item">
              <strong>Release Date </strong>
              <Moment format="DD/MM/YYYY">{track.updated_time}</Moment>
            </li>
          </ul>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Lyrics;
