import theme from "@/theme";
import { GlobalPageProps } from "@/utils/interface";
import { Layout } from "@/containers";
import {
  Accordion,
  Badge,
  Banner,
  Button,
  Checkbox,
  Collapse,
  Dropdown,
  Icon,
  Input,
  Modal,
  Radio,
  Select,
  Tabs,
  Textarea,
  Toggle,
  Tooltip,
} from "@/components";
import { Content } from "@/theme/styled";
import styled from "styled-components";
import { ReactNode } from "react";
import React from "react";
import { WithAuth } from "@/hoc";

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
      <div>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
      </div>
    );
  };

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => {
    return (
      <Compose>
        <hr />
        <h2>{title}</h2>
        {children}
      </Compose>
    );
  };

  return (
    <Layout global={global} title="Components">
      <Content>
        <h3>Components</h3>
        <Section title="Accordion">
          <Accordion
            options={[
              {
                question: "Lorem Ipsum is simply dummy text?",
                answer:
                  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
              },
              {
                question: "Lorem Ipsum is simply dummy text?",
                answer:
                  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
              },
            ]}
          />
        </Section>
        <Section title="Collapse">
          <Tabs
            title="Click to collapse element"
            isOpen={false}
            renderContent={() => <Collapse text={"Collapsable"} />}
          />
        </Section>
        <Section title="Badge">
          <Badge
            label={"Badge no close"}
            iconClose={false}
            kind="ghost"
            onClick={() => {}}
          />
          <Badge
            label={"Badge standard"}
            kind="ghost"
            onClick={() => alert("Close click")}
          />
          <Badge
            label={"Badge success"}
            kind="success"
            onClick={() => alert("Close click")}
          />
          <Badge
            label={"Badge warning"}
            kind="warning"
            onClick={() => alert("Close click")}
          />
          <Badge
            label={"Badge error"}
            kind="error"
            onClick={() => alert("Close click")}
          />
          <Badge
            label={"Badge info"}
            kind="info"
            onClick={() => alert("Close click")}
          />
        </Section>
        <Section title="Banner">
          <Banner active={true} kind={"info"} title={"Info banner"} />
          <Banner active={true} kind={"success"} title={"Success banner"} />
          <Banner active={true} kind={"warning"} title={"Warning banner"} />
          <Banner active={true} kind={"error"} title={"Error banner"} />
        </Section>
        <Section title="Buttons">
          <div className="flex flex-wrap gap-3">
            <Button kind="primary">Primary</Button>
            <Button kind="success">Success</Button>
            <Button kind="error">Error</Button>
            <Button kind="warning">Warning</Button>
            <Button kind="inverse-primary">Inverse primary</Button>
            <Button kind="inverse-success">Inverse Success</Button>
            <Button kind="inverse-error">Inverse Error</Button>
            <Button kind="inverse-warning">Inverse Warning</Button>
            <Button kind="ghost">Ghost</Button>
            <Button kind="minimal">Minimal</Button>
            <Button kind="action">Action</Button>
          </div>
        </Section>
        <Section title="Icon">
          <Icon name="zoom" size="45" />
        </Section>
        <Section title="Input">
          <Input
            labelBgColor={theme.colors.softWhite}
            placeholder="Input example"
            name="name"
          />
        </Section>
        <Section title="Modal">
          <Modal
            onClickOther
            title="Test modal"
            render={({ close }) => (
              <div style={{ color: theme.colors.dark }}>Modal test</div>
            )}
          >
            <Icon name="zoom" size="45" />
          </Modal>
        </Section>
        <Section title="Chcekbox">
          <Checkbox label="Test label checkbox" />
        </Section>
        <Section title="Radio">
          <Radio
            name={""}
            options={[
              { label: "First", value: 1 },
              { label: "Second", value: 2 },
            ]}
            onChange={() => {}}
          />
        </Section>
        <Section title="Textarea">
          <Textarea
            placeholder="Testo di test"
            labelBgColor={theme.colors.softWhite}
            topPlaceholder="Note"
          ></Textarea>
        </Section>
        <Section title="Tooltip">
          <Tooltip content="Lorem ipsum">Lorem</Tooltip>
        </Section>
        <Section title="Toogle">
          <Toggle name="theme" />
        </Section>
        <Section title="Dropdown">
          <Dropdown
            includeTarget={true}
            showArrow={false}
            renderTarget={renderTarget}
            renderDropdown={renderDropdown}
          />
        </Section>
        <Section title="Select">
          <Select
            name="city"
            onChange={() => {}}
            topPlaceholder="Seleziona città"
            labelBgColor={theme.colors.softWhite}
            placeholder="Città"
            options={[
              { label: "Roma", value: "1" },
              { label: "Milano", value: "2" },
            ]}
          />
        </Section>
        <Section title="Select - multiselect">
          <Select
            name="city"
            multiselect
            onChange={() => {}}
            topPlaceholder="Seleziona città"
            labelBgColor={theme.colors.softWhite}
            placeholder="Città"
            options={[
              { label: "Roma", value: "1" },
              { label: "Milano", value: "2" },
            ]}
          />
        </Section>
      </Content>
    </Layout>
  );
};

// export default Components;
export default WithAuth(React.memo(Components));

const Compose = styled.div`
  margin: ${theme.spaces.space4} 0;
`;
