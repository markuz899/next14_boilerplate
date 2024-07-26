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
  start,
  label,
  placeholder = "Seleziona data",
  topPlaceholder,
  onChange,
  isError,
  message,
  showTimeSelect = false,
  className,
  maxDate,
  minDate,
  range = false,
  name = range ? "datepicker-range" : "datepicker",
  end,
  disabled = false,
  includeDates,
  excludeDates,
  includeDateIntervals,
  excludeDateIntervals,
  selectsMultiple = false,
}) => {
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [isWarning, setWarning] = useState<any>(false);
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    if (range) {
      if (start && end) {
        const [day, month, year] = start.split("/");
        const [dayEnd, monthEnd, yearEnd] = end.split("/");
        const dataStart = new Date(`${month}/${day}/${year}`);
        const dataEnd = new Date(`${monthEnd}/${dayEnd}/${yearEnd}`);
        setStartDate(dataStart);
        setEndDate(dataEnd);
      } else {
        setStartDate(null);
        setEndDate(null);
      }
    } else {
      if (start) {
        const [day, month, year] = start.split("/");
        const data = new Date(`${month}/${day}/${year}`);
        setStartDate(data);
      } else {
        setStartDate(null);
      }
    }
  }, [start, end]);

  const select = (value: any, callback?: () => void) => {
    if (onChange) {
      if (range) {
        const [start, end] = value;
        setStartDate(start);
        setEndDate(end);
        if (start && end) {
          onChange({
            name,
            value: {
              start: formatDate(start, false, false),
              end: formatDate(end, false, false),
            },
          });
          setWarning(false);
          if (callback) callback();
        } else {
          setWarning(true);
        }
      } else {
        onChange({
          name,
          value: value ? formatDate(value, false, false) : null,
        });
        setStartDate(value);
        if (callback) callback();
      }
    }
  };

  const onChangeSelection = (dates: any) => {
    setSelectedDates(dates);
    const many = dates.map((el: any) => formatDate(el, false, false));
    onChange &&
      onChange({
        name,
        value: many,
      });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    { show, close }: { show: () => void; close: () => void }
  ) => {
    if (e.key === "Tab") close();
    if (e.key === "ArrowUp" || e.key === "ArrowDown") show();
  };

  const renderValue = () => {
    if (range) {
      const s = startDate ? formatDate(startDate, false, showTimeSelect) : "";
      const e = endDate ? formatDate(endDate, false, showTimeSelect) : "";
      if (!s && !e) return "";
      return `${s} - ${e}`;
    } else if (selectsMultiple) {
      const many = selectedDates?.map((el: any) =>
        formatDate(el, false, false)
      );
      if (many[0]) {
        return `${many[0]} +${many.length}`;
      }
      return "";
    } else {
      const s = startDate ? formatDate(startDate, false, showTimeSelect) : "";
      return s;
    }
  };

  const renderTarget = ({
    show,
    close,
  }: {
    show: () => void;
    close: () => void;
  }) => (
    <Target
      className={className}
      onClick={show}
      onKeyDown={(e) => handleKeyDown(e, { show, close })}
    >
      <Input
        disabled={disabled}
        importantDefault
        onChange={(data: any) => select(data.value as Date)}
        readOnly={true}
        topPlaceholder={topPlaceholder}
        type="text"
        name={name}
        placeholder={placeholder}
        defaultValue={renderValue() || ""}
        icon={"calendar"}
        iconSize={theme.font.size.medium}
        enableControlledInput
        isError={isError}
        isWarning={isWarning}
        message={message}
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
        disabled={disabled}
        locale={it}
        includeDates={includeDates}
        excludeDates={excludeDates}
        excludeDateIntervals={excludeDateIntervals}
        includeDateIntervals={includeDateIntervals}
        calendarContainer={ContainerPicker}
        showTimeSelect={showTimeSelect}
        showMonthDropdown={visible ? true : false}
        showYearDropdown={visible ? true : false}
        scrollableYearDropdown={visible ? true : false}
        yearDropdownItemNumber={100}
        selectsRange={range}
        startDate={startDate}
        selected={startDate}
        endDate={endDate}
        selectsMultiple={selectsMultiple || undefined}
        selectedDates={selectsMultiple ? selectedDates : []}
        onChange={(value: any) =>
          selectsMultiple ? onChangeSelection(value) : select(value, close)
        }
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
        fluid={true}
        includeTarget
        leftPosition={0}
      />
    </>
  );
};

export default DatePicker;

const Target = styled.div`
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  outline: unset;
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
  .react-datepicker__day--today {
    color: ${theme.colors.dark};
    border: 1px solid ${theme.colors.primary};
    border-radius: ${theme.extra.radiusBig};
    &.react-datepicker__day--selected {
      color: ${theme.colors.white};
    }
  }
  .react-datepicker__day--in-range {
    &.react-datepicker__day--today {
      color: ${theme.colors.white};
      font-weight: bold;
    }
  }
  .react-datepicker__day--keyboard-selected {
    color: ${theme.colors.dark};
    &:hover {
      color: ${theme.colors.white};
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