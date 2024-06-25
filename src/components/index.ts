import dynamic from "next/dynamic";

const Button = dynamic(() => import("./Button"));
const Checkbox = dynamic(() => import("./Checkbox"));
const Dropdown = dynamic(() => import("./Dropdown"));
const Icon = dynamic(() => import("./Icon"));
const Input = dynamic(() => import("./Input"));
const Loader = dynamic(() => import("./Loader"));
const Modal = dynamic(() => import("./Modal"));
const Radio = dynamic(() => import("./Radio"));
const Select = dynamic(() => import("./Select"));
const Textarea = dynamic(() => import("./Textarea"));
const Toggle = dynamic(() => import("./Toggle"));
const Tooltip = dynamic(() => import("./Tooltip"));

export {
  Button,
  Checkbox,
  Dropdown,
  Icon,
  Input,
  Loader,
  Modal,
  Radio,
  Select,
  Textarea,
  Toggle,
  Tooltip,
};
