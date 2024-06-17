import dynamic from "next/dynamic";

const Layout = dynamic(() => import("./Layout"));
const Header = dynamic(() => import("./Header"));

export { Layout, Header };
