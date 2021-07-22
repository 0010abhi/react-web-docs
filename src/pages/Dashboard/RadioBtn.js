import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useState } from "react";

export default function RadioBtn() {
  const [value, setValue] = useState(" ");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <RadioGroup value={value} onChange={handleChange}>
        <FormControlLabel value="Type-1" control={<Radio />} label="Type-1" />
        <FormControlLabel value="Type-2" control={<Radio />} label="Type-2" />
      </RadioGroup>
    </div>
  );
}
