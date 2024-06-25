import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Dropdown from "../Dropdown";
import Input from "../Input";
import Checkbox from "../Checkbox";
import { SelectProps } from "./interface";
import theme from "@/theme";

const Select: React.FC<SelectProps> = ({
  options = [],
  onChange,
  onInputChange,
  placeholder = "Select...",
  topPlaceholder,
  name,
  showArrow = true,
  enableInput = false,
  onClose,
  isError,
  message,
  value = "",
  multiselect,
  defaultValues = [],
  readOnly,
  className,
  withFilter = false,
  disabled,
}) => {
  const [disable, setDisable] = useState(disabled || false);
  const [state, setState] = useState<string | string[]>(value);
  const [values, setValues] = useState<string[]>(defaultValues || []);
  const [hover, setHover] = useState(-1);
  const [filtered, setFiltered] = useState(options);
  const drop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFiltered(options);
  }, [options]);

  useEffect(() => {
    setState(value);
  }, [value]);

  useEffect(() => {
    if (multiselect) {
      let newSelection: string[] = [];
      let selected: string[] = defaultValues ? [...defaultValues] : [];
      setValues(selected);
      options.forEach((el) => {
        if (selected.includes(el.value)) {
          newSelection.push(el.label);
        }
      });
      if (newSelection.length === 0) {
        setState("");
      } else if (newSelection.length === 1) {
        setState(newSelection.toString());
      } else if (newSelection.length === 2) {
        setState(newSelection.toString());
      } else if (newSelection.length > 1) {
        setState(`${newSelection.length} selezionati`);
      }
    } else {
      if (defaultValues) {
        let target = options?.find((item: any) => item.label === defaultValues);
        if (target) {
          setState(defaultValues);
          if (disabled) {
            setDisable(disabled || false);
          }
        } else {
          setDisable(false);
        }
      }
    }
    // eslint-disable-next-line
  }, []);

  const onSelect = (
    item: { label: string; value: string },
    callback: () => void
  ) => {
    const { label, value } = item;
    if (multiselect) {
      let selected = [...values];
      if (!selected.includes(value)) {
        selected.push(value);
      } else {
        selected = selected.filter((item) => item !== value);
      }
      setValues(selected);
      let newSelection: string[] = [];
      options.forEach((el) => {
        if (selected.includes(el.value)) {
          newSelection.push(el.label);
        }
      });
      if (newSelection.length === 0) {
        setState("");
      } else if (newSelection.length === 1) {
        setState(newSelection.toString());
      } else if (newSelection.length === 2) {
        setState(newSelection.toString());
      } else if (newSelection.length > 1) {
        setState(`${newSelection.length} selezionati`);
      }
      onChange({ label, value: selected, name: name || "" });
    } else {
      onChange({ label, value, name: name || "" });
      setState(label);
      callback();
    }
  };

  const handleOnChange = (
    data: { value: string },
    visible: boolean,
    show: () => void
  ) => {
    if (enableInput) {
      setState(data.value);
      if (onInputChange) onInputChange(data);
      if (data.value === "") {
        setFiltered(options);
      } else {
        setFiltered(
          options.filter((item) =>
            item.label.toLowerCase().includes(data.value.toLowerCase())
          )
        );
        if (!visible) show();
      }
      onChange({ name: name || "", value: data.value });
    }
  };

  const handleShowDrop = (
    show: () => void,
    visible: boolean,
    close: () => void
  ) => {
    if (filtered.length > 0) {
      show();
    }
    if (visible) {
      close();
    } else {
      show();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    {
      show,
      visible,
      close,
    }: { show: () => void; visible: boolean; close: () => void }
  ) => {
    if (e.key === "Enter") {
      const { label, value } = filtered[hover];
      setState(label);
      onChange({ label, value, name: name || "" });
      close();
    }
    if (e.key === "Tab") close();
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      const { length } = filtered;
      let i = -1;
      if (!visible) show();
      if (e.key === "ArrowUp") i = (hover + length - 1) % length;
      if (e.key === "ArrowDown") i = (hover + 1) % length;
      setHover(i);
      if (i > 4) {
        if (drop.current) drop.current.scrollTop = (i - 4) * 55;
      } else {
        if (drop.current) drop.current.scrollTop = 0;
      }
    }
  };

  const renderTarget = ({
    show,
    visible,
    close,
  }: {
    show: () => void;
    visible: boolean;
    close: () => void;
  }) => (
    <Target
      onClick={() => (disable ? null : handleShowDrop(show, visible, close))}
      onKeyDown={(e) => handleKeyDown(e, { show, visible, close })}
      isError={isError}
    >
      <Input
        type="text"
        autoComplete="off"
        placeholder={placeholder}
        topPlaceholder={topPlaceholder}
        value={state as string}
        name={name || ""}
        onChange={(data: any) => handleOnChange(data, visible, show)}
        inputSelectAction={{ visible, show, close }}
        icon={showArrow && (visible ? "angle-top" : "angle-down")}
        enableControlledInput
        isError={isError}
        message={message}
        readOnly={readOnly}
        withFilter={withFilter || undefined}
        disabled={disable}
      />
    </Target>
  );

  const renderDropdown = ({ close }: { close: () => void }) => (
    <Options ref={drop}>
      {filtered &&
        filtered.map((option, i) => (
          <Row key={`${option.value}-${i}`} $multiselect={!!multiselect}>
            {multiselect && (
              <Checkbox
                checked={values.includes(option.value)}
                onChange={() => onSelect(option, close)}
                htmlFor={`${name}-${i}`}
              />
            )}
            <Option
              onClick={() => onSelect(option, close)}
              selected={state === option.label}
              $active={values.includes(option.value)}
              $hover={hover === i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(-1)}
              $multiselect={!!multiselect}
            >
              {option.label}
            </Option>
          </Row>
        ))}
    </Options>
  );

  return (
    <StyledDropdown
      leftPosition={0}
      renderTarget={renderTarget}
      renderDropdown={filtered.length > 0 ? renderDropdown : undefined}
      showArrow={false}
      onClose={onClose || (() => {})}
      includeTarget
      className={className}
    >
      {className}
    </StyledDropdown>
  );
};

export default React.memo(Select);

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -13px;
  border: 1px solid ${theme.colors.borderComponent};
  max-height: 300px;
  overflow: hidden;
  overflow-y: scroll;
  border-radius: ${theme.extra.radiusBig};
  background: ${theme.colors.white};
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Row = styled.div<{ $multiselect: any }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${(p) => p.$multiselect && `padding: 0 ${theme.spaces.space2}`}
`;

export const Option = styled.li<{
  $active: any;
  selected: boolean;
  $hover: boolean;
  $multiselect: boolean;
}>`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: ${theme.spaces.space1} ${theme.spaces.space1} ${theme.spaces.space1}
    0;
  list-style-type: none;
  background: ${(p) =>
    p.selected
      ? theme.colors.primary
      : p.$hover
      ? theme.colors.primary
      : "transparent"};
  color: ${(p) =>
    p.selected && p.$hover
      ? theme.colors.white
      : p.selected
      ? theme.colors.white
      : p.$hover
      ? theme.colors.primary
      : theme.colors.black};
  font-size: ${theme.font.size.tiny};
  padding: 5px 10px;
  &:last-child {
    border-bottom: 0;
  }
`;

const Target = styled.div<{ isError?: boolean }>`
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  outline: unset;
`;

const StyledDropdown = styled(Dropdown)<any>`
  width: 100%;
  z-index: 100;
  &:focus {
    outline: 0;
  }
`;
