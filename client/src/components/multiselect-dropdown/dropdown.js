import React from "react";
import ReactDOM from "react-dom";
import { Multiselect } from "multiselect-react-dropdown";
import "./styles.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plainArray: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
      objectArray: [
        { key: "Option 1", cat: "Group 1" },
        { key: "Option 2", cat: "Group 1" },
        { key: "Option 3", cat: "Group 1" },
        { key: "Option 4", cat: "Group 2" },
        { key: "Option 5", cat: "Group 2" },
        { key: "Option 6", cat: "Group 2" },
        { key: "Option 7", cat: "Group 2" }
      ],
      selectedValues: [
        { key: "Option 1", cat: "Group 1" },
        { key: "Option 2", cat: "Group 1" }
      ]
    };
    this.style = {
      chips: {
        background: "red"
      },
      searchBox: {
        border: "none",
        "border-bottom": "1px solid blue",
        "border-radius": "0px"
      },
      multiselectContainer: {
        color: "red"
      }
    };
    this.addItem = this.addItem.bind(this);
  }
  addItem() {
    this.selectedValues.push({ key: "Option 3", cat: "Group 1" });
  }

  render() {
    const { plainArray, objectArray, selectedValues } = this.state;
    return (
      <div className="App">
        
        <div className="col-12 d-md-flex">
          
          <div className="examples col-12 col-md-5">
            <h4 id="checkbox" className="mt40">
              5. Multiselect with checkbox
            </h4>
            <Multiselect
              options={objectArray}
              displayValue="key"
              showCheckbox={true}
            />
            {/* <code className="displayBlock mt10">
              &lt;Multiselect
              <br />
              &nbsp;&nbsp;options=&#123;objectArray}
              <br />
              &nbsp;&nbsp;displayValue="key"
              <br />
              &nbsp;&nbsp;showCheckbox=&#123;true}
              <br />
              />
            </code> */}
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);







// import Multiselect from 'multiselect-react-dropdown';

// this.state = {
//   options: [{name: 'Option 1️⃣', id: 1},{name: 'Option 2️⃣', id: 2}]
// };

// <Multiselect
//   options={this.state.options} // Options to display in the dropdown
//   selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
//   onSelect={this.onSelect} // Function will trigger on select event
//   onRemove={this.onRemove} // Function will trigger on remove event
//   displayValue="name" // Property name to display in the dropdown options
// />

// onSelect(selectedList, selectedItem) {
//     ...
// }

// onRemove(selectedList, removedItem) {
//     ...
// }