import theme from "@/theme";
import { GlobalPageProps } from "@/utils/interface";
import { Layout } from "@/containers";
import { Button, Icon, Input, Modal } from "@/components";
import { Content } from "@/theme/styled";

const Components = ({ global }: GlobalPageProps) => {
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
      </Content>
    </Layout>
  );
};

export default Components;
