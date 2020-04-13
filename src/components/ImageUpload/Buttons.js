import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faImage } from "@fortawesome/free-solid-svg-icons";

export default (props) => (
  <div className="buttons fadein">
    <div className="button">
      <label htmlFor="single">
        <FontAwesomeIcon icon={faImage} color="#555555" size="3x" />
      </label>
      <input type="file" id="single" onChange={props.onChange} />
    </div>

    <div className="button">
      <label htmlFor="multi">
        <FontAwesomeIcon icon={faImages} color="#555555" size="3x" />
      </label>
      <input type="file" id="multi" onChange={props.onChange} multiple />
    </div>
  </div>
);
