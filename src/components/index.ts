import dynamic from "next/dynamic";

const Button = dynamic(() => import("./Button"));
const Icon = dynamic(() => import("./Icon"));
const Input = dynamic(() => import("./Input"));
const Loader = dynamic(() => import("./Loader"));
const Modal = dynamic(() => import("./Modal"));

export { Button, Icon, Input, Loader, Modal };
