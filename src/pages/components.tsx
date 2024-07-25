import React, { useState } from "react";
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
  DatePicker,
  Dropdown,
  Icon,
  Input,
  Modal,
  QuantitySelect,
  Radio,
  RadioButton,
  Rating,
  Select,
  Tabs,
  Textarea,
  Toggle,
  Tooltip,
} from "@/components";
import { Content } from "@/theme/styled";
import styled from "styled-components";
import { WithAuth } from "@/hoc";
import icons from "@/components/Icon/icons";

const Components = ({ global }: GlobalPageProps) => {
  let allIcon = Object.keys(icons);
  const [column, setColumn] = useState(true);
  const [inline, setInline] = useState(true);
  const [inlineAcc, setInlineAcc] = useState(true);
  const [multipleAcc, setMultipleAcc] = useState(false);

  const handleColumn = (data: any) => {
    const { value } = data;
    setColumn(value);
  };

  const handleInline = (data: any) => {
    const { value } = data;
    setInline(value);
  };

  const handleInlineAcc = (data: any) => {
    const { value } = data;
    setInlineAcc(value);
  };

  const handleMultipleAcc = (data: any) => {
    const { value } = data;
    setMultipleAcc(value);
  };

  const renderTarget = ({ show, close, visible }: any) => {
    const handleShow = () => {
      if (visible) return close();
      if (!visible) return show();
    };
    return (
      <Button kind={visible ? "primary" : "action"} onClick={handleShow}>
        Action
      </Button>
    );
  };

  const renderDropdown = ({ show, close, visible }: any) => {
    const handleShow = () => {
      if (visible) return close();
      if (!visible) return show();
    };
    return (
      <RenderDrop>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
      </RenderDrop>
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
          <div className="flex gap-2 justify-center mb-2">
            <Checkbox
              label="In linea"
              checked={inlineAcc}
              onChange={handleInlineAcc}
            />
            <Checkbox
              label="Multi open"
              checked={multipleAcc}
              onChange={handleMultipleAcc}
            />
          </div>
          <Accordion
            multipleOpen={multipleAcc}
            inline={inlineAcc}
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
          <div className="flex flex-col gap-3">
            <div className="text-left">
              <Button className="mr-3" size="sm" kind="primary">
                Default
              </Button>
              <Button className="mr-3" kind="primary">
                Default
              </Button>
              <Button className="mr-3" size="lg" kind="primary">
                Default
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button kind="primary" icon="search" label="Default" />
              <Button kind="primary">Default</Button>
              <Button kind="success">Success</Button>
              <Button kind="error">Error</Button>
              <Button kind="warning">Warning</Button>
              <Button kind="primary" disabled>
                Disabled
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button kind="inverse-primary" icon="search" label="Default" />
              <Button kind="inverse-primary">Inverse</Button>
              <Button kind="inverse-success">Success</Button>
              <Button kind="inverse-error">Error</Button>
              <Button kind="inverse-warning">Warning</Button>
              <Button kind="inverse-primary" disabled>
                Disabled
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button kind="minimal">Minimal</Button>
              <Button kind="minimal-success">Success</Button>
              <Button kind="minimal-error">Error</Button>
              <Button kind="minimal-warning">Warning</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button kind="ghost">Ghost</Button>
              <Button kind="action">Action</Button>
            </div>
          </div>
        </Section>
        <Section title="Icon">
          <div className="flex gap-5 flex-wrap icon-wrap">
            {allIcon.map((el) => (
              <Tooltip key={el} content={el}>
                <Icon
                  name={el}
                  size={theme.spaces.space3}
                  color={theme.colors.primary}
                />
              </Tooltip>
            ))}
          </div>
        </Section>
        <Section title="Input">
          <Input
            type="search"
            className="mb-6"
            labelBgColor={theme.colors.softWhite}
            placeholder="Input search"
            name="name"
          />
          <Input
            className="mb-6"
            icon="search"
            labelBgColor={theme.colors.softWhite}
            placeholder="Input example"
            name="name"
          />
          <Input
            className="mb-6"
            iconBefore="search"
            defaultValue="Ciccio"
            labelBgColor={theme.colors.softWhite}
            placeholder="Input example"
            name="name"
          />
          <Input
            className="mb-6"
            labelBgColor={theme.colors.softWhite}
            placeholder="Input example"
            name="name"
            isError={true}
            message="Field error"
          />
          <Input
            className="mb-6"
            labelBgColor={theme.colors.softWhite}
            placeholder="Input example"
            name="name"
          />
          <Input
            className="mb-6"
            topPlaceholder="Address"
            placeholder="Input example"
            name="name"
          />
        </Section>
        <Section title="Datepicker">
          <DatePicker onChange={(d: any) => console.log(d)} />
          <DatePicker
            range
            onChange={(d: any) => console.log(d)}
            topPlaceholder="With range"
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
            <Icon name="grid" size="45" color={theme.colors.primary} />
          </Modal>
        </Section>
        <Section title="Chcekbox">
          <Checkbox label="Test label checkbox" />
        </Section>
        <Section title="Radio">
          <Checkbox label="In linea" checked={inline} onChange={handleInline} />
          <Radio
            name={""}
            inline={inline}
            options={[
              { label: "One", value: 1 },
              { label: "Two", value: 2 },
              { label: "Three", value: 3 },
            ]}
            onChange={() => {}}
          />
        </Section>
        <Section title="Radio button">
          <Checkbox label="In linea" checked={column} onChange={handleColumn} />
          <RadioButton
            name={""}
            inline={column}
            options={[
              { label: "One", value: 1 },
              { label: "Two", value: 2 },
              { label: "Three", value: 3 },
            ]}
            onChange={() => {}}
          />
        </Section>
        <Section title="Textarea">
          <Textarea
            maxLength={300}
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
            iconBefore="search"
            topPlaceholder="Seleziona città"
            labelBgColor={theme.colors.softWhite}
            placeholder="Città"
            defaultValues={"1"}
            options={[
              { label: "Roma", value: "1" },
              { label: "Ancora", value: "2" },
              { label: "Milano", value: "3" },
            ]}
          />
          <Select
            name="city"
            onChange={() => {}}
            iconBefore="search"
            labelBgColor={theme.colors.softWhite}
            placeholder="Città"
            defaultValues={"1"}
            options={[
              { label: "Roma", value: "1" },
              { label: "Ancora", value: "2" },
              { label: "Milano", value: "3" },
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
            defaultValues={["2"]}
            options={[
              { label: "Roma", value: "1" },
              { label: "New York", value: "2" },
              { label: "Milano", value: "3" },
            ]}
          />
          <Select
            name="city"
            multiselect
            onChange={() => {}}
            labelBgColor={theme.colors.softWhite}
            placeholder="Città"
            defaultValues={["2"]}
            options={[
              { label: "Roma", value: "1" },
              { label: "New York", value: "2" },
              { label: "Milano", value: "3" },
            ]}
          />
        </Section>
        <Section title="Rating">
          <Rating onChange={(data: number) => alert(`Select: ${data} star`)} />
        </Section>
        <Section title="Quantity select">
          <QuantitySelect value={5} />
        </Section>
      </Content>
    </Layout>
  );
};

// export default Components;
export default React.memo(Components);

const Compose = styled.div`
  margin: ${theme.spaces.space4} 0;
  .icon-wrap {
    svg {
      &:hover {
        transition: all 0.5s;
        transform: scale(2);
      }
    }
  }
`;

const RenderDrop = styled.div`
  padding: ${theme.spaces.space4};
  overflow: hidden;
  overflow-y: scroll;
  border-radius: ${theme.extra.radiusBig};
  background: ${theme.colors.white};
  p {
    margin-bottom: ${theme.spaces.space2};
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
