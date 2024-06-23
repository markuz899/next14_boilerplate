export interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  render?: (props: { close: () => void }) => React.ReactNode;
  onClickOther?: boolean;
  onClose?: () => void;
  size?: [number, number];
  isVisible?: boolean;
  noTitle?: boolean;
  noCloseIcon?: boolean;
  className?: string;
  fullScreen?: boolean;
}

export interface ModalRootProps {
  fullScreen?: boolean;
  noTitle?: boolean;
}

export interface ModalContentProps {
  size: [number, number];
  noTitle?: boolean;
  fullScreen?: boolean;
}
