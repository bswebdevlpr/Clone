import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);

  const handleToggle = (val) => {
    const curIdx = Checked.indexOf(val);

    const newChecked = [...Checked];

    if (curIdx === -1) {
      newChecked.push(val);
    } else {
      newChecked.splice(curIdx, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckboxLists = () =>
    props.list &&
    props.list.map((val, idx) => (
      <React.Fragment key={idx}>
        <Checkbox
          onChange={() => handleToggle(val._id)}
          checked={Checked.indexOf(val._id) === -1 ? false : true}
        />
        <span>{val.name}</span>
      </React.Fragment>
    ));

  return (
    <Collapse defaultActiveKey={["1"]}>
      <Panel header="Items" key="1">
        {renderCheckboxLists()}
      </Panel>
    </Collapse>
  );
}

export default CheckBox;
