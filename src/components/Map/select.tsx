import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Dropdown from "../Dropdown";
import Input from "../Input";
import Checkbox from "../Checkbox";
import { SelectProps } from "../Select/interface";
import theme from "@/theme";
import { Icon } from "..";

const Select: React.FC<SelectProps> = ({
  options = [],
  onChange,
  onInputChange,
  placeholder = "Select...",
  topPlaceholder,
  labelBgColor,
  name,
  showArrow = true,
  iconBefore,
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
  fluid = true,
  width,
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
        let target = options?.find((item: any) => item.value === defaultValues);
        if (target) {
          setState(target.label);
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
    item: { label: string; value: string; disabled?: boolean },
    callback: () => void
  ) => {
    const { label, value } = item;
    if (disable) return false;
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
      onChange({ ...item, label, value: selected, name: name || "" });
    } else {
      onChange({ ...item, label, value, name: name || "" });
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

  const opt = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const getCurrentPosition = async (callback: any) => {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(success, error, opt);
      callback();
    } else {
      alert("Geolocation is not supported");
      setState("Non supportata");
      callback();
    }
  };

  const success = async (position: any) => {
    await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setState(`${data.address.road} ${data.address.county}`);
        onChange({
          label: `${data.address.road} ${data.address.county}`,
          value: "actual",
          name,
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
  };

  const error = (err: any) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
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
      $isError={isError}
    >
      <Input
        type="text"
        autoComplete="off"
        placeholder={placeholder}
        topPlaceholder={topPlaceholder}
        labelBgColor={labelBgColor}
        value={state as string}
        name={name || ""}
        onChange={(data: any) => handleOnChange(data, visible, show)}
        inputSelectAction={{ visible, show, close }}
        iconBefore={iconBefore}
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
      <Option
        onClick={() => getCurrentPosition(close)}
        selected={state === "actual"}
        $hover={hover === -1}
        onMouseEnter={() => setHover(-1)}
        onMouseLeave={() => setHover(-1)}
      >
        <Icon margin="0 10px 0 0" name="map" color={theme.colors.error} />
        POSIZIONE ATTUALE
      </Option>
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
              $active={multiselect ? values.includes(option.value) : false}
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
      fluid={fluid}
      width={width}
    />
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
  color: ${({ theme }) => theme.text};
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Row = styled.div<{ $multiselect: any }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${(p) => p.$multiselect && `padding: 0 ${theme.spaces.space2}`}
`;

export const Option = styled.li<{
  $active?: any;
  selected?: boolean;
  $hover: boolean;
  $multiselect?: boolean;
}>`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  text-align: left;
  padding: ${theme.spaces.space1} ${theme.spaces.space1} ${theme.spaces.space1}
    0;
  list-style-type: none;
  color: ${(p) =>
    p.selected && p.$hover
      ? theme.colors.primary
      : p.selected || p.$active
      ? theme.colors.primary
      : p.$hover
      ? theme.colors.primary
      : theme.colors.black};
  font-weight: ${(p) =>
    p.selected && p.$hover
      ? "bold"
      : p.selected || p.$active
      ? "bold"
      : p.$hover
      ? "bold"
      : "null"};
  font-size: ${theme.font.size.tiny};
  padding: 5px 10px;
  &:last-child {
    border-bottom: 0;
  }
`;

const Target = styled.div<{ $isError?: boolean }>`
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  outline: unset;
`;

const StyledDropdown = styled(Dropdown)<any>`
  width: 100%;
  &:focus {
    outline: 0;
  }
`;
