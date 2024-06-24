import theme from "@/theme";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Header = () => {
  const navItems = [
    { id: 1, path: "/", text: "Home" },
    { id: 2, path: "/login", text: "Login" },
    { id: 3, path: "/components", text: "Components" },
    { id: 4, path: "/hoc", text: "Hoc" },
    { id: 5, path: "/hooks", text: "Hooks" },
    { id: 6, path: "/theme", text: "Theme" },
  ];

  return (
    <HeaderStyle className="text-white">
      <h1 className="text-uppercase">NEXT Boilerplate.</h1>

      <ul className="menu-link flex justify-between items-center">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4rounded-xl m-2 cursor-pointer duration-300"
          >
            <Link href={item.path}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </HeaderStyle>
  );
};

export default React.memo(Header);

const HeaderStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spaces.space4};
  .menu-link {
    li {
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        color: ${theme.colors.darkGrey};
      }
    }
  }
`;
