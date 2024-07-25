import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import theme from "@/theme";
import Dropdown from "../Dropdown";
import Input from "../Input";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { it } from "date-fns/locale";
import { DatePickerProps } from "./interface";
import { formatDate } from "@/utils/utils";

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  label,
  placeholder = "Seleziona data",
  topPlaceholder,
  onChange,
  name = "datepicker",
  isError,
  message,
  showTimeSelect = false,
  className,
  maxDate,
  minDate,
}) => {
  const [date, setDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);

  useEffect(() => {
    if (value) {
      const [day, month, year] = value.split("/");
      const data = new Date(`${month}/${day}/${year}`);
      setDate(data);
      setStartDate(data);
    } else {
      setDate(null);
      setStartDate(null);
    }
  }, [value]);

  const select = (value: Date | null, callback?: () => void) => {
    setDate(value);
    onChange &&
      onChange({ name, value: value ? formatDate(value, false, false) : null });
    setStartDate(value);
    if (callback) callback();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    { show, close }: { show: () => void; close: () => void }
  ) => {
    if (e.key === "Tab") close();
    if (e.key === "ArrowUp" || e.key === "ArrowDown") show();
  };

  const renderTarget = ({
    show,
    close,
  }: {
    show: () => void;
    close: () => void;
  }) => (
    <Target
      onClick={show}
      onKeyDown={(e) => handleKeyDown(e, { show, close })}
      isError={isError}
    >
      <Input
        className={className}
        importantDefault
        onChange={(data: any) => select(data.value as Date)}
        readOnly={true}
        topPlaceholder={topPlaceholder}
        type="text"
        name={name}
        placeholder={placeholder}
        defaultValue={
          startDate ? formatDate(startDate, false, showTimeSelect) : ""
        }
        icon={"calendar"}
        iconSize={theme.font.size.medium}
        enableControlledInput
        isError={isError}
        message={message}
        isClearable={true}
        autoComplete="off"
      />
    </Target>
  );

  const ContainerPicker: React.FC<{ className?: string; children: any }> = ({
    className,
    children,
  }) => {
    return (
      <CalendarContainerStyled className={className}>
        {children}
      </CalendarContainerStyled>
    );
  };

  const renderDropdown = ({
    close,
    visible,
  }: {
    close: () => void;
    visible: boolean;
  }) => {
    return (
      <ReactDatePicker
        locale={it}
        calendarContainer={ContainerPicker}
        showTimeSelect={showTimeSelect}
        showMonthDropdown={visible ? true : false}
        showYearDropdown={visible ? true : false}
        scrollableYearDropdown={visible ? true : false}
        yearDropdownItemNumber={100}
        selected={startDate}
        onChange={(value: Date | null) => select(value, close)}
        inline
        maxDate={maxDate}
        minDate={minDate}
      />
    );
  };

  return (
    <>
      {label && <span>{label}</span>}
      <Dropdown
        renderTarget={renderTarget}
        renderDropdown={renderDropdown}
        showArrow={false}
        fluid={false}
        includeTarget
        leftPosition={0}
      />
    </>
  );
};

export default DatePicker;

const Target = styled.div<{ isError?: boolean }>`
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  outline: unset;
  border: ${({ isError }) =>
    isError ? `1px solid ${theme.colors.error}` : "none"};
`;

const CalendarContainerStyled = styled(CalendarContainer)`
  .react-datepicker__header {
    background: ${theme.colors.primary};
    .react-datepicker__current-month {
      color: ${theme.colors.white};
    }
    .react-datepicker__day-names {
      & > div {
        color: ${theme.colors.white};
      }
    }
  }
  .react-datepicker__month-read-view--selected-month {
    color: ${theme.colors.white};
  }
  .react-datepicker__year-read-view--selected-year {
    color: ${theme.colors.white};
  }
  .react-datepicker-time__header {
    color: ${theme.colors.white};
  }
  .react-datepicker__day--selected {
    background: ${theme.colors.primary};
  }
  .react-datepicker__time-list-item--selected {
    background-color: ${theme.colors.primary}!important;
  }
`;
