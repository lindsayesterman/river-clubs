import React, { Component } from 'react';

class SchoolsSelector extends Component {

  changeSelection(value) {
    if(value === "None") {
      this.props.changeHandler(null);
    } else {
      // find the  selected
      const school = this.props.schools.find(schools => school.name === value);
      this.props.changeHandler(school);
    }
  }

  render() {
    const options = this
          .props
          .schools
          .map(
            (school, i) => <option value={school.name} key={i}>{school.name}</option>
          );
    return (
      <div className="school_selector">
        <form>
          <label htmlFor="school">Select a school:</label>
          <select
            id="school"
            name="school"
            onChange={e => this.changeSelection(e.target.value)}>
            <option value="None">Select one...</option>
            {options}
          </select>
        </form>
      </div>
    );      
  }
}

export default SchoolsSelector;