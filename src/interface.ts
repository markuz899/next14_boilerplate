import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
  global?: any;
  title?: string;
  background?: string;
  className?: string;
}

export interface GlobalPageProps {
  global: {};
}
