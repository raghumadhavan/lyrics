import React, { useContext } from "react";
import { Consumer } from "../../context";
import Spinner from "../layout/Spinner";
import Track from "./Track";

function Tracks() {
  const {
    state: { track_list, heading }
  } = useContext(Consumer);

  return (
    <>
      {track_list && track_list.length ? (
        <>
          <h3 className="text-center mb-4">{heading}</h3>
          <div className="row">
            {track_list.map(item => (
              <Track key={item.track.track_id} track={item.track} />
            ))}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Tracks;
