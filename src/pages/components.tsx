import theme from "@/theme";
import { GlobalPageProps } from "@/utils/interface";
import { Layout } from "@/containers";
import {
  Button,
  Checkbox,
  Dropdown,
  Icon,
  Input,
  Modal,
  Radio,
  Select,
  Textarea,
  Toggle,
  Tooltip,
} from "@/components";
import { Content } from "@/theme/styled";

const Components = ({ global }: GlobalPageProps) => {
  const renderTarget = ({ show, close, visible }: any) => {
    const handleShow = () => {
      if (visible) return close();
      if (!visible) return show();
    };
    return (
      <div onClick={handleShow}>
        <p>Lorem ipsum</p>
      </div>
    );
  };

  const renderDropdown = ({ show, close, visible }: any) => {
    const handleShow = () => {
      if (visible) return close();
      if (!visible) return show();
    };
    return (
      <div onClick={handleShow}>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
      </div>
    );
  };

  return (
    <Layout global={global}>
      <Content>
        <h2>Components</h2>
        <hr />
        <h2>Button</h2>
        <div className="flex justify-between">
          <Button kind="primary">Click me</Button>
          <Button kind="success">Click me</Button>
          <Button kind="error">Click me</Button>
          <Button kind="warning">Click me</Button>
        </div>
        <hr />
        <h2>Icon</h2>
        <Icon name="zoom" size="45" />
        <hr />
        <h2>Input</h2>
        <Input placeholder="Input example" topPlaceholder="Nome" name="name" />
        <hr />
        <h2>Modal</h2>
        <Modal
          onClickOther
          title="Test modal"
          render={({ close }) => <div>Modal test</div>}
        >
          <Icon name="zoom" size="45" />
        </Modal>
        <hr />
        <h2>Chcekbox</h2>
        <Checkbox label="Test label checkbox" />
        <hr />
        <h2>Radio</h2>
        <Radio
          name={""}
          options={[
            { label: "First", value: 1 },
            { label: "Second", value: 2 },
          ]}
          onChange={() => {}}
        />
        <hr />
        <h2>Textarea</h2>
        <Textarea placeholder="Testo di test" topPlaceholder="Note"></Textarea>
        <hr />
        <h2>Tooltip</h2>
        <Tooltip content="Lorem ipsum">Lorem</Tooltip>
        <hr />
        <h2>Toggle</h2>
        <Toggle name="theme" />
        <hr />
        <h2>Dropdown</h2>
        <Dropdown
          includeTarget={true}
          showArrow={false}
          renderTarget={renderTarget}
          renderDropdown={renderDropdown}
        />
        <hr />
        <h2>Select</h2>
        <Select
          name="city"
          multiselect
          onChange={() => {}}
          topPlaceholder="Seleziona città"
          placeholder="Città"
          options={[
            { label: "Roma", value: "1" },
            { label: "Milano", value: "2" },
          ]}
        />
      </Content>
    </Layout>
  );
};

export default Components;
