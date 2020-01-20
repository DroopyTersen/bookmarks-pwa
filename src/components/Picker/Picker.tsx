import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { useDebounce } from "react-use";
import styled from "styled-components";
export function PickerSingle(props: PickerSingleProps) {
  let SelectComponent = props.creatable === true ? CreatableSelect : Select;
  let [selected, setSelected] = useState(props.value || "");

  useDebounce(
    () => {
      props.onChange(selected);
    },
    100,
    [selected]
  );
  useEffect(() => {
    setSelected(props.value);
  }, [props.value]);
  // console.log(props.options, props.value);

  return (
    <StyledPicker>
      <SelectComponent
        // menuIsOpen={true}
        className="react-select"
        classNamePrefix="react-select"
        value={
          props.options.find((o) => o.value === selected) || { value: selected, label: selected }
        }
        onChange={(option) => setSelected(option.value)}
        options={props.options}
        name={props.name}
      />
    </StyledPicker>
  );
}

export function PickerMulti(props: PickerMultiProps) {
  let SelectComponent = props.creatable === true ? CreatableSelect : Select;
  let [selected, setSelected] = useState(props.value || []);

  useDebounce(
    () => {
      props.onChange(selected);
    },
    300,
    [selected]
  );
  let selectedOptions = selected.map((val: string) => {
    return props.options.find((o) => o.value === val) || { value: val, label: val };
  });
  console.log(props.options, props.value);
  return (
    <SelectComponent
      className="react-select"
      classNamePrefix="react-select"
      value={selectedOptions}
      onChange={(options) => setSelected(options.map((o) => o.value))}
      options={props.options}
      name={props.name}
      isMulti={true}
      // menuIsOpen={true}
      isClearable={true}
    />
  );
}
const StyledPicker = styled.div`
  width: 100%;
  .react-select__menu {
    z-index: 3;
    .react-select__option--is-focused {
      background: var(--accent-100);
    }
    .react-select__option--is-selected {
      background: var(--primary-300);
    }
  }
  /* .react-select__control {
    font-size: 0.8rem;
    background: var(--black);
    color: var(--white);
    border: 1px solid var(--light);
    border-radius: 3px;
    box-shadow: none;
    font-family: Montserrat, sans-serif;
    .react-select__input {
      color: var(--light);
      font-weight: 200;
    }
    &.react-select__control--menu-is-open,
    &:hover {
      border-color: var(--primary);
    }
    .react-select__dropdown-indicator {
      color: var(--light);
      padding: 5px;
    }
    &:hover {
      .react-select__dropdown-indicator {
        color: var(--white);
      }
    }
    .react-select__single-value {
      color: var(--white);
    }
    .react-select__multi-value {
      color: var(--white);
      font-size: 0.9rem;
      background: var(--dark);
      padding: 3px;
      .react-select__multi-value__label {
        color: var(--white);
      }
    }
  }
  .react-select__menu {
    z-index: 2;
    font-size: 0.8rem;
    font-family: Montserrat, sans-serif;
    border: 1px solid var(--primary-ligher);
    background: var(--black);
    color: var(--white);
    .react-select__option--is-focused {
      background: var(--dark);
    }
    .react-select__option--is-selected {
      background: var(--primary);
    }
  } */
`;
export interface PickerOption {
  value: string;
  label: string;
}

export interface PickerProps {
  creatable?: boolean;
  options: PickerOption[];
  name: string;
}

export interface PickerSingleProps extends PickerProps {
  value: string;
  onChange: (newValue: string) => void;
}
export interface PickerMultiProps extends PickerProps {
  value: string[];
  onChange: (newValues: string[]) => void;
}
