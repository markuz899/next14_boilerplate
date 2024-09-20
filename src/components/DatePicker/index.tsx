import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import styled, { useTheme } from "styled-components";
import { it } from "date-fns/locale";
import Dropdown from "../Dropdown";
import Input from "../Input";
import { format, parse, isValid, setHours, setMinutes } from "date-fns";
import Button from "../Button";
import { DatePickerProps } from "./interface";
import Icon from "../Icon";
import theme from "@/theme";

const FORMAT_DATA = "dd/MM/yyyy";

const DatePicker: React.FC<DatePickerProps> = ({
  className,
  disabled,
  mode = "single",
  defaultValue,
  excludeDisabled = true,
  min,
  max,
  readOnly = false,
  name = "datepicker",
  onChange,
  excludeDates,
  hidden,
  startMonth,
  endMonth,
  placeholder = "GG/MM/AAAA",
  isError,
  message,
  hint,
  withTime = true,
}) => {
  const [onlyRead, setOnlyRead] = useState(readOnly);
  const [selected, setSelected] = useState<Date | undefined>(defaultValue);
  const [multiSelected, setMultiSelected] = useState<any>([]);
  const [rangeSelected, setRangeSelected] = useState<any>();
  const [inputValue, setInputValue] = useState<any>("");
  const [month, setMonth] = useState<any>();
  const [timeValue, setTimeValue] = useState<string>();
  const timeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode == "multiple" || mode == "range") {
      setOnlyRead(true);
    }

    if (defaultValue) {
      switch (mode) {
        case "single":
          // eslint-disable-next-line
          const timeOnly = format(defaultValue, "HH:mm");
          setTimeValue(timeOnly);
          setSelected(defaultValue);
          setInputValue(format(defaultValue, FORMAT_DATA));
          break;
        case "multiple":
          setMultiSelected(defaultValue);
          setInputValue(
            defaultValue.length > 1
              ? `${format(defaultValue[0], FORMAT_DATA)} +${
                  defaultValue.length - 1
                }`
              : format(defaultValue[0], FORMAT_DATA)
          );
          break;
        case "range":
          // eslint-disable-next-line
          const [from, to] = defaultValue;
          setRangeSelected({ from, to });
          setInputValue(
            `${format(from, FORMAT_DATA)} - ${
              to ? format(to, FORMAT_DATA) : ""
            }`
          );
          break;
        default:
          break;
      }
    }
  }, [defaultValue, mode]);

  // range handler
  const handleRangeSelection = useCallback(
    (date: { from: Date; to?: Date }) => {
      setRangeSelected(date);
      if (!date) {
        setInputValue(null);
        onChange && onChange({ name, value: null });
        return;
      }
      onChange &&
        onChange({
          name,
          value: {
            start: date.from ? date.from : null,
            end: date.to ? date.to : null,
          },
        });
    },
    []
  );

  // multiple handler
  const handleMultiSelection = useCallback((date: Date[]) => {
    setMultiSelected(date);
    if (!date.length) {
      setInputValue(null);
    }
    if (onChange) {
      onChange({
        name,
        value: date,
      });
    }
  }, []);

  const handleDayPickerSelection = (date: Date, close?: () => void) => {
    if (!date) {
      setSelected(undefined);
      setInputValue(null);
      onChange?.({ name, value: null });
      return;
    }

    const time = timeRef?.current?.defaultValue;
    const formattedDate = format(date, FORMAT_DATA);
    if (!time) {
      setSelected(date);
      setInputValue(formattedDate);
      onChange?.({ name, value: date });
      return;
    }

    const [hours, minutes] = time.split(":").map(Number);
    const newSelectedDate = setHours(setMinutes(date, minutes), hours);

    setSelected(newSelectedDate);
    setMonth(newSelectedDate);
    const formattedDateTime = format(newSelectedDate, `${FORMAT_DATA} HH:mm`);
    setInputValue(formattedDateTime);
    onChange?.({ name, value: date });

    close?.();
  };

  // input handler only single mode
  const handleInputChange = useCallback((data: any) => {
    const { value } = data;
    setInputValue(value);

    if (value) {
      const parsedDate = parse(value, FORMAT_DATA, new Date());
      if (isValid(parsedDate)) {
        setSelected(parsedDate);
        setMonth(parsedDate);
        onChange && onChange({ name, value: parsedDate });
      }
    } else {
      setSelected(undefined);
      onChange && onChange({ name, value: null });
    }
  }, []);

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selected) {
      setTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(selected, minutes), hours);
    setSelected(newSelectedDate);
    setInputValue(format(newSelectedDate, FORMAT_DATA));
    setTimeValue(time);
    onChange &&
      onChange({
        name,
        value: newSelectedDate,
      });
  };

  // traffic gateway
  const handling = useCallback(
    (date: any, close?: () => void) => {
      switch (mode) {
        case "single":
          handleDayPickerSelection(date, close);
          break;
        case "multiple":
          handleMultiSelection(date);
          break;
        case "range":
          handleRangeSelection(date);
          break;
        default:
          break;
      }
    },
    [mode]
  );

  const renderLabel = useMemo(() => {
    if (mode === "range" && rangeSelected?.from) {
      return `${format(rangeSelected.from, FORMAT_DATA)} - ${
        rangeSelected.to ? format(rangeSelected.to, FORMAT_DATA) : ""
      }`;
    }
    if (mode === "multiple" && multiSelected.length) {
      return multiSelected.length > 1
        ? `${format(multiSelected[0], FORMAT_DATA)} +${
            multiSelected.length - 1
          }`
        : format(multiSelected[0], FORMAT_DATA);
    }
    return inputValue;
  }, [mode, selected, rangeSelected, multiSelected, inputValue]);

  const RenderFooter = () => {
    const handleClick = () => {
      handleDayPickerSelection(new Date(), () => {});
    };
    return (
      <Button size="sm" onClick={handleClick}>
        Oggi
      </Button>
    );
  };

  const renderTarget = ({ show }: { show: () => void; close?: () => void }) => (
    <Target className={className} onClick={show}>
      <Input
        clearable
        readOnly={onlyRead}
        type="text"
        autoComplete="off"
        icon={"calendar"}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={renderLabel}
        onChange={handleInputChange}
        isError={isError}
        message={message}
        hint={hint}
      />
    </Target>
  );

  const CustomDropdownNav: React.FC<any> = (props) => {
    const propsMonths = props?.children[0].props;
    const propsYears = props?.children[1].props;

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      propsMonths.onChange(e);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      propsYears.onChange(e);
    };

    const handlePrevMonth = () => {
      const prev = propsMonths.value;
      propsMonths.onChange({ target: { value: prev - 1 } });
    };

    const handleNextMonth = () => {
      const next = propsMonths.value;
      propsMonths.onChange({ target: { value: next + 1 } });
    };

    return (
      <HeaderWrapper>
        <IconButton
          className="datepicker__navigation"
          onClick={handlePrevMonth}
        >
          <Icon
            className="datepicker__navigation-icon"
            name="angle-left"
            size="18px"
            color={theme.colors.primary}
          />
        </IconButton>
        <WrapperMonthYear>
          <Select value={propsMonths.value} onChange={handleMonthChange}>
            {propsMonths?.options?.map((month: any) => (
              <option
                disabled={month.disabled}
                key={month.value}
                value={month.value}
              >
                {month.label}
              </option>
            ))}
          </Select>
          <Select value={propsYears.value} onChange={handleYearChange}>
            {propsYears?.options.map((year: any) => (
              <option
                disabled={year.disabled}
                key={year.value}
                value={year.value}
              >
                {year.label}
              </option>
            ))}
          </Select>
        </WrapperMonthYear>
        <IconButton
          className="datepicker__navigation"
          onClick={handleNextMonth}
        >
          <Icon
            className="datepicker__navigation-icon"
            name="angle-right"
            size="18px"
            color={theme.colors.primary}
          />
        </IconButton>
      </HeaderWrapper>
    );
  };

  const renderDropdown = useCallback(
    ({ close, visible }: { close: () => void; visible: boolean }) => (
      <ContentPicker>
        {mode === "single" && withTime && (
          <ContentClock>
            Orario:{" "}
            <input
              ref={timeRef}
              type="time"
              defaultValue={timeValue}
              onChange={handleTimeChange}
            />
          </ContentClock>
        )}
        <PickerStyle
          locale={it}
          mode={mode}
          disabled={excludeDates}
          captionLayout="dropdown"
          month={month}
          onMonthChange={setMonth}
          excludeDisabled={excludeDisabled}
          min={min}
          max={max}
          hidden={hidden}
          startMonth={startMonth}
          endMonth={endMonth}
          onSelect={(date: any) => handling(date, close)}
          selected={
            mode === "single"
              ? selected
              : mode === "multiple"
              ? multiSelected
              : rangeSelected
          }
          footer={mode === "single" && visible && <RenderFooter />}
          components={{
            DropdownNav: (props) => (
              <CustomDropdownNav
                {...props}
                date={
                  mode === "single"
                    ? selected
                    : mode === "multiple"
                    ? multiSelected
                    : rangeSelected
                }
              />
            ),
            Button: () => <div style={{ display: "none" }} />,
          }}
        />
      </ContentPicker>
    ),
    [
      mode,
      disabled,
      excludeDisabled,
      min,
      max,
      selected,
      rangeSelected,
      multiSelected,
      timeValue,
    ]
  );

  return (
    <>
      <Dropdown
        renderTarget={renderTarget}
        renderDropdown={renderDropdown}
        showArrow={false}
        includeIcon
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

const ContentPicker = styled.div`
  padding: ${theme.spaces.space2};
`;

const PickerStyle = styled(DayPicker)`
  .rdp-range_middle.rdp-selected {
    background-color: ${theme.colors.primaryLight}40;
  }
  .rdp-range_start.rdp-selected {
    background: ${`linear-gradient(90deg, transparent 50%, ${({ theme }: any) =>
      theme.colors.primaryLight}40 50%)`};
  }
  .rdp-range_end.rdp-selected {
    background: ${`linear-gradient(90deg, ${({ theme }: any) =>
      theme.colors.primaryLight}40 50%, transparent 50%)`};
  }
  .rdp-range_start.rdp-selected,
  .rdp-range_end.rdp-selected {
    button {
      border-color: ${theme.colors.primaryLight};
      background-color: ${theme.colors.primary};
    }
  }
  .rdp-selected {
    button {
      border-color: ${theme.colors.primary};
    }
  }
  .rdp-today {
    color: ${theme.colors.primary};
  }
  .rdp-caption_label {
    svg {
      fill: ${theme.colors.primary};
    }
  }
  .rdp-day_button {
    font-weight: 500;
    width: 28px;
    height: 28px;
  }
  .rdp-nav {
    button {
      svg {
        fill: ${theme.colors.primary};
      }
    }
  }
  .rdp-month_grid {
    width: 100%;
    .rdp-weeks {
      .rdp-day {
        width: 28px;
        height: 28px;
      }
    }
  }
`;

const HeaderWrapper = styled.div`
  padding: 0 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spaces.space2};
  width: 100%;
`;

const WrapperMonthYear = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${theme.colors.primaryLight};
  border: 1px solid ${theme.colors.primary};
  border-radius: 16px;
  padding: 8px 16px;
  min-width: 220px;
`;

const Select = styled.select`
  text-transform: capitalize;
  border: none;
  background: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  color: ${theme.colors.white};
  &:focus {
    outline: none;
  }
`;

const IconButton = styled.div`
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const ContentClock = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spaces.space2};
  padding: 0 10px;
  input {
    background: ${theme.colors.primaryLight};
    border: 1px solid ${theme.colors.primary};
    color: ${theme.colors.white};
    border-radius: 16px;
    padding: 5px 10px;
  }
`;
