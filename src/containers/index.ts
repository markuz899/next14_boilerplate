import dynamic from "next/dynamic";

const Layout = dynamic(() => import("./Layout"), { loading: () => null });
const Header = dynamic(() => import("./Header"), { loading: () => null });
const Sidebar = dynamic(() => import("./Sidebar"), { loading: () => null });

export { Layout, Header, Sidebar };
