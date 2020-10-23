import React, { useState, useEffect } from "react";

const Checkbox = ({ categories }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (c) => () => {
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];

    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    console.log(newCheckedCategoryId)
    setChecked(newCheckedCategoryId)
    
  };

  return categories.map((c, i) => (
    <li key={i}>
      <input type="checkbox" onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} />
      <label>{c.name}</label>
    </li>
  ));
};

export default Checkbox;
