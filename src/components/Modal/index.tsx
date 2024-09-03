import React, { useEffect, useState, useRef, Children } from "react";
import styled, { css, keyframes } from "styled-components";
import { createPortal } from "react-dom";
import { Icon } from "..";
import theme from "@/theme";
import { ModalProps, ModalRootProps, ModalContentProps } from "./interface";
import { motion, AnimatePresence } from "framer-motion";

const Modal: React.FC<ModalProps> = ({
  title = "Default title",
  children,
  render,
  onClickOther,
  onClose,
  size = [800, null],
  isVisible = false,
  noTitle,
  noCloseIcon,
  className,
  fullScreen,
  rightScreen,
  fluid,
  disableOverflow = false
}) => {
  const [visible, setVisible] = useState(isVisible);
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  const open = () => {
    setVisible(true);
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    setVisible(false);
    document.body.style.overflow = "scroll";
    if (onClose) onClose();
  };

  const closeOnClick = (e: React.MouseEvent) => {
    if (e.target === overlay.current) {
      setVisible(false);
      document.body.style.overflow = "scroll";
      if (onClose) onClose();
    }
  };

  const renderModal = () => {
    const ROOT_ID = "root-modal";
    const ROOT_NODE = document.getElementById(ROOT_ID);
    const handleClickOnOverlay = onClickOther ? closeOnClick : () => {};
    const ROOT = (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0 }}
      >
        <Root
          rightScreen={rightScreen}
          $fullScreen={fullScreen}
          $noTitle={noTitle}
          onClick={handleClickOnOverlay}
          ref={overlay}
        >
          <Content
            size={size}
            $noTitle={noTitle}
            rightScreen={rightScreen}
            $fullScreen={fullScreen}
            $disableOverflow={disableOverflow}
          >
            {!noTitle && (
              <Header>
                <h2 className="text-primary">{title}</h2>
                {!noCloseIcon && (
                  <div className="iconClose" onClick={close}>
                    <Icon name="close" color={theme.colors.primary} />
                  </div>
                )}
              </Header>
            )}
            {render && render({ close })}
          </Content>
        </Root>
      </motion.div>
    );
    return ROOT_NODE ? createPortal(ROOT, ROOT_NODE) : null;
  };

  return (
    <>
      <Destiny className={className} onClick={open} $fluid={fluid}>
        {Children.toArray(children)}
      </Destiny>
      {visible && renderModal()}
    </>
  );
};

export default Modal;

const Destiny = styled.div<{ $fluid?: boolean }>`
  display: ${(p) => (p.$fluid ? "block" : "inline-block")};
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
  }
`;

const Root = styled.div<ModalRootProps>`
  cursor: auto;
  transition: 1s;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  min-height: 100svh;
  z-index: 2100;
  overflow: scroll;
  background: ${theme.colors.primary}8a;
  box-sizing: border-box;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spaces.space4};
  height: 100%;
  ${(p) => p.$fullScreen && fullRoot};
  ${(p) => (p.rightScreen ? right : normal)};
`;

const normal = css`
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const right = css`
  padding: 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spaces.space4};
  h2 {
    text-align: center;
    font-size: ${theme.font.size.medium};
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }
  .iconClose {
    position: absolute;
    right: 30px;
    cursor: pointer;
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    h2 {
      font-size: ${theme.font.size.normal};
    }
  }
`;

const Content = styled.div<ModalContentProps>`
  position: relative;
  transition: 1s;
  padding: ${(props) => (props.$noTitle ? "none" : theme.spaces.space4)};
  background: ${theme.colors.white};
  border-radius: ${theme.spaces.space3};
  height: ${(props) => props.size[1]}px;
  width: ${(props) => `${props.size[0]}px` || "auto"};
  box-shadow: ${theme.extra.shadow};
  justify-self: center;
  align-self: center;
  flex-basis: auto;
  z-index: ${theme.zIndex.zIndex1};
  overflow: ${(props) => (props.$disableOverflow ? "none" : "scroll")};
  ${(p) => p.$fullScreen && fullContent};
  ${(p) => (p.rightScreen ? rightMode : normalMode)};
  .img {
    width: 100%;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const normalMode = css`
  box-shadow: ${theme.extra.shadow};
`;

const rightMode = css`
  height: 100%;
  box-shadow: -10px 0px 4px #0000001a;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const fullRoot = css`
  height: 100svh;
  padding: 0;
`;

const fullContent = css`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 0;
`;
