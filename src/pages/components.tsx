import theme from "@/theme";
import { GlobalPageProps } from "@/utils/interface";
import { Layout } from "@/containers";
import {
  Accordion,
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
        <Section title="Buttons">
          <div className="flex justify-between">
            <Button kind="primary">Click me</Button>
            <Button kind="success">Click me</Button>
            <Button kind="error">Click me</Button>
            <Button kind="warning">Click me</Button>
          </div>
        </Section>
        <Section title="Icon">
          <Icon name="zoom" size="45" />
        </Section>
        <Section title="Input">
          <Input
            labelBgColor={theme.colors.lightWhite}
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
            labelBgColor={theme.colors.lightWhite}
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
            labelBgColor={theme.colors.lightWhite}
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
            labelBgColor={theme.colors.lightWhite}
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
