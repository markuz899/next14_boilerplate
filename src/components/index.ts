import dynamic from "next/dynamic";

const Button = dynamic(() => import("./Button"));
const Icon = dynamic(() => import("./Icon"));
const Loader = dynamic(() => import("./Loader"));
const Modal = dynamic(() => import("./Modal"));

export { Button, Icon, Loader, Modal };
