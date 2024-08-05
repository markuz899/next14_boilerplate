import dynamic from "next/dynamic";

const Accordion = dynamic(() => import("./Accordion"), { loading: () => null });
const AccordionBox = dynamic(() => import("./AccordionBox"), { loading: () => null });
const Autocomplete = dynamic(() => import("./Map/autocomplete"), { loading: () => null, ssr: false });
const Badge = dynamic(() => import("./Badge"), { loading: () => null });
const Banner = dynamic(() => import("./Banner"), { loading: () => null });
const Button = dynamic(() => import("./Button"), { loading: () => null });
const Card = dynamic(() => import("./Card"), { loading: () => null });
const Checkbox = dynamic(() => import("./Checkbox"), { loading: () => null });
const Collapse = dynamic(() => import("./Tabs/collapse"), { loading: () => null });
const DatePicker = dynamic(() => import("./DatePicker"), { loading: () => null });
const Dropdown = dynamic(() => import("./Dropdown"), { loading: () => null });
const Icon = dynamic(() => import("./Icon"), { loading: () => null });
const Input = dynamic(() => import("./Input"), { loading: () => null });
const Loader = dynamic(() => import("./Loader"), { loading: () => null });
const Map = dynamic(() => import("./Map"), { loading: () => null, ssr:false });
const Markers = dynamic(() => import("./Map/markers"), { loading: () => null, ssr:false });
const Modal = dynamic(() => import("./Modal"), { loading: () => null });
const QuantitySelect = dynamic(() => import("./QuantitySelect"), { loading: () => null });
const Radio = dynamic(() => import("./Radio"), { loading: () => null });
const RadioButton = dynamic(() => import("./RadioButton"), { loading: () => null });
const Rating = dynamic(() => import("./Rating"), { loading: () => null });
const ScrollToTop = dynamic(() => import("./ScrollToTop"), { loading: () => null });
const Select = dynamic(() => import("./Select"), { loading: () => null });
const Tabs = dynamic(() => import("./Tabs/intex"), { loading: () => null });
const Textarea = dynamic(() => import("./Textarea"), { loading: () => null });
const Toggle = dynamic(() => import("./Toggle"), { loading: () => null });
const Tooltip = dynamic(() => import("./Tooltip"), { loading: () => null });

export {
  Accordion,
  AccordionBox,
  Autocomplete,
  Badge,
  Banner,
  Button,
  Card,
  Checkbox,
  Collapse,
  DatePicker,
  Dropdown,
  Icon,
  Input,
  Loader,
  Map,
  Markers,
  Modal,
  QuantitySelect,
  Radio,
  RadioButton,
  Rating,
  ScrollToTop,
  Select,
  Tabs,
  Textarea,
  Toggle,
  Tooltip,
};
