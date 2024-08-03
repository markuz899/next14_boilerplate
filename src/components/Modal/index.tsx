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
  size = [800, 600],
  isVisible = false,
  noTitle,
  noCloseIcon,
  className,
  fullScreen,
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
        transition={{ duration: 0.3 }}
      >
        <Root
          fullScreen={fullScreen}
          noTitle={noTitle}
          onClick={handleClickOnOverlay}
          ref={overlay}
        >
          <Content size={size} noTitle={noTitle} fullScreen={fullScreen}>
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
      <Destiny className={className} onClick={open}>
        {Children.toArray(children)}
      </Destiny>
      <AnimatePresence initial={false} mode="wait">
        {visible && (
          <motion.div
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderModal()}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;

const Destiny = styled.div`
  display: inline-block;
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
  min-height: 100vh;
  z-index: 1200;
  overflow: scroll;
  background: ${theme.colors.modalOpacity};
  box-sizing: border-box;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => (props.noTitle ? "none" : theme.spaces.space4)};
  height: 100%;
  ${(p) => p.fullScreen && fullRoot};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
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
  padding: ${(props) => (props.noTitle ? "none" : theme.spaces.space4)};
  background: ${theme.colors.white};
  border-radius: ${theme.spaces.space3};
  height: ${(props) => props.size[1]}px;
  width: ${(props) => props.size[0]}px;
  box-shadow: ${theme.extra.shadow};
  justify-self: center;
  align-self: center;
  flex-basis: auto;
  z-index: ${theme.zIndex.zIndex1};
  overflow: scroll;
  ${(p) => p.fullScreen && fullContent};
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

const fullRoot = css`
  height: 100vh;
  padding: 0;
`;

const fullContent = css`
  height: 100%;
  box-sizing: border-box;
  border-radius: 0;
`;
