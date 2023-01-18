import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React from "react";

type DemoRadioGroupProps<T> = {
  label: string;
  value: T;
  values: T[];
  onChange: (v: T) => void;
};

function DemoRadioGroup<T extends string>(props: DemoRadioGroupProps<T>) {
  return (
    <>
      <FormLabel>{props.label}</FormLabel>
      <RadioGroup
        row
        value={props.value}
        onChange={(_, v) => props.onChange(v as T)}
      >
        {props.values.map((value) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio />}
            label={value}
          />
        ))}
      </RadioGroup>
    </>
  );
}

export default DemoRadioGroup;
