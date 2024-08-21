import React, { useEffect, useState, useRef } from "react";
import Icon from "../Icon";
import theme from "@/theme";
import styled from "styled-components";

interface Option {
  value: string | number;
  label: string;
  icon?: string;
  iconColor?: string;
  checked?: boolean;
}

interface TabsProps {
  className?: string;
  options: Option[];
  onChange?: (option: Option) => void;
  children?: React.ReactNode;
  isSmall?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  className,
  options,
  onChange = () => {},
  children,
  isSmall,
}) => {
  const tabRef = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);

  const initialValue =
    options?.find((item) => item.checked) || options[0] || [];
  const [selected, setValue] = useState<Option>(initialValue);

  useEffect(() => {
    const list = tabRef.current;
    if (list) {
      const activeTab = list.querySelector(".active") as HTMLButtonElement;
      const boundingWidh = activeTab?.offsetWidth || 0;
      const boundingLeft = activeTab?.offsetLeft || 0;
      if (selectorRef.current) {
        selectorRef.current.style.left = `${boundingLeft}px`;
        selectorRef.current.style.width = `${boundingWidh}px`;
      }
    }
  }, [selected, options]);

  const select = (option: Option, index: number) => {
    if (option.value === selected.value) return;
    setValue(option);
    onChange(option);
  };

  return (
    <Wrapper className={className ? className : null}>
      <Flex>
        <Buttons ref={tabRef}>
          <div className="selector" ref={selectorRef} />
          {options &&
            options.map((option, i) => (
              <Tab
                key={option.value}
                onClick={() => select(option, i)}
                className={option.value === selected.value ? "active" : ""}
                $iconColor={option.iconColor || ""}
              >
                <div className="d-flex">
                  {option.icon && (
                    <Icon
                      name={option.icon}
                      margin={`0 ${isSmall ? "0" : "0"} 0 0`}
                      color={option.iconColor || theme.colors.dark}
                    />
                  )}
                  {!isSmall && <p>{option.label} </p>}
                </div>
              </Tab>
            ))}
        </Buttons>
      </Flex>
      {children && <Box>{children}</Box>}
    </Wrapper>
  );
};

export default React.memo(Tabs);

// Styled Components
const Wrapper = styled.div<any>`
  position: relative;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Buttons = styled.div`
  position: relative;
  display: inline-block;
  border-radius: ${theme.extra.radiusBig};
  border: 2px solid ${theme.colors.greyIcon};
  box-shadow: ${theme.extra.shadow};
  height: ${theme.spaces.space10};
  .selector {
    height: 100%;
    display: inline-block;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 1;
    border-radius: 6px;
    transition-duration: 0.6s;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    box-shadow: ${theme.extra.shadow};
    background: ${theme.colors.primary};
    border: 2px solid ${theme.colors.primaryDark};
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    margin-left: ${theme.spaces.space1};
  }
`;

const Tab = styled.button<{ $iconColor: string }>`
  height: 100%;
  cursor: pointer;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.text};
  padding: ${theme.spaces.space2} ${theme.spaces.space4};
  position: relative;
  z-index: 1;
  transition-duration: 0.6s;
  &.active {
    cursor: default;
    p,
    svg {
      transition-delay: 0.3s;
      color: ${theme.colors.white};
      fill: ${(p) => (p.$iconColor ? p.$iconColor : theme.colors.white)};
    }
  }
  .d-flex {
    display: flex;
    align-items: center;
    p {
      line-height: 1;
      font-size: ${theme.font.size.tiny};
    }
    span {
      margin-left: 5px;
      font-size: ${theme.font.size.minor};
      color: ${theme.colors.white};
    }
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spaces.space2};
  }
`;

const Box = styled.div`
  box-shadow: ${theme.extra.shadow};
  border-radius: ${theme.extra.radiusBig};
  padding: ${theme.spaces.space1} ${theme.spaces.space3} ${theme.spaces.space3};
  background: ${theme.colors.white};
  width: 100%;
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    padding: 0;
    border: 0;
    box-shadow: none;
    height: 100%;
  }
`;
