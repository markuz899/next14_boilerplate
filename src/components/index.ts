import dynamic from "next/dynamic";

const Button = dynamic(() => import("./Button"));
const Checkbox = dynamic(() => import("./Checkbox"));
const Icon = dynamic(() => import("./Icon"));
const Input = dynamic(() => import("./Input"));
const Loader = dynamic(() => import("./Loader"));
const Modal = dynamic(() => import("./Modal"));
const Radio = dynamic(() => import("./Radio"));
const Textarea = dynamic(() => import("./Textarea"));

export { Button, Checkbox, Icon, Input, Loader, Modal, Radio, Textarea };
