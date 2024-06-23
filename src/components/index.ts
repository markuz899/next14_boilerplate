import dynamic from "next/dynamic";

const Icon = dynamic(() => import("./Icon"));
const Loader = dynamic(() => import("./Loader"));
const Modal = dynamic(() => import("./Modal"));

export { Icon, Loader, Modal };
