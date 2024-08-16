import React from "react";
import styled from "styled-components";
import theme from "@/theme";
import { Icon } from "@/components";

const BarConnection = () => {
  return (
    <HeadBar>
      <Icon
        margin="0 5px 0 0"
        name="connection"
        color={theme.colors.error}
        size="15"
      />
      <p>Nessuna connessione</p>
    </HeadBar>
  );
};

BarConnection.propTypes = {};

BarConnection.defaultProps = {};

export default React.memo(BarConnection);

const HeadBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spaces.space1};
  font-size: ${theme.font.size.tiny};
  position: fixed;
  background: ${({ theme }) => theme.navbar};
  backdrop-filter: blur(10px);
  z-index: ${theme.zIndex.zIndex1};
  a {
    margin-right: 10px;
  }
`;
