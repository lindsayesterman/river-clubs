import React from "react";

function SelectSchool(props) {
  return (
    <div>
      <input
        type="text"
        name="userSchool"
        id="userSchool"
        autoComplete="on"
        onChange={props.setUserInput}
      ></input>
      <button onClick={props.clickSubmit} type="submit">
        Submit
      </button>
      <div className="school-options">
        {props.schools.map((obj, i) => (
          <button key={i} onClick={props.clickSchool}>
            {obj.schoolName}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SelectSchool;
