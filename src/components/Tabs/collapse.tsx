import theme from "@/theme";
import React from "react";
import styled from "styled-components";

const Collapse = ({
  text,
  colorText,
}: {
  text: string;
  colorText?: string;
}) => {
  return (
    <ContainerTab $colorText={colorText}>
      <div className="content">
        <p>{text}</p>
      </div>
    </ContainerTab>
  );
};

export default React.memo(Collapse);

export const ContainerTab = styled.div<{ $colorText?: string }>`
  max-width: 1440px;
  margin: 0 auto;
  .content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    line-break: anywhere;
    p {
      color: ${(p) => (p.$colorText ? p.$colorText : theme.colors.darkGrey)};
      white-space: pre-wrap;
    }
  }
`;
