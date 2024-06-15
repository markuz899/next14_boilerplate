import dynamic from "next/dynamic";

const Layout = dynamic(() => import("./Layout"));

export { Layout };
