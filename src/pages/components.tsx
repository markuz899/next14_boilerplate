import React, { useEffect, useState } from "react";
import theme from "@/theme";
import { GlobalPageProps } from "@/utils/interface";
import { Layout } from "@/containers";
import {
  Accordion,
  AccordionBox,
  Autocomplete,
  Badge,
  Banner,
  Button,
  Calendar,
  Card,
  Checkbox,
  Collapse,
  DatePicker,
  Dropdown,
  Icon,
  Input,
  Map,
  Markers,
  MarkersAppointment,
  Modal,
  Popover,
  QuantitySelect,
  Radio,
  RadioButton,
  RangeSlider,
  Rating,
  Select,
  SliderTabs,
  Tabs,
  Textarea,
  Toggle,
  Tooltip,
} from "@/components";
import QRCode from "react-qr-code";
import icons from "@/components/Icon/icons";
import { Content } from "@/theme/styled";
import styled from "styled-components";
import { WithAuth } from "@/hoc";
import { AnimatePresence, motion } from "framer-motion";
import { useGeolocation } from "@/hooks";
import { moveMarkerLinearly } from "@/utils/utils";

const specialist = [
  {
    id: 1,
    name: "Carlo",
    position: [42.16137759041936, 12.339213749209796],
    range: 20,
    profession: "Musicista",
    rating: 1,
  },
  {
    id: 2,
    name: "Flavio",
    position: [42.142287926630516, 12.540400871218557],
    range: 10,
    profession: "Meccanico",
    rating: 2,
  },
  {
    id: 3,
    name: "Mario",
    position: [42.09288262437151, 12.273639107053354],
    range: 50,
    profession: "Giardiniere",
    rating: 3,
  },
  {
    id: 4,
    name: "Anna",
    position: [42.206914985163685, 12.39517535481974],
    range: 80,
    profession: "Operaio",
    rating: 4,
  },
  {
    id: 5,
    name: "Claudia",
    position: [42.0775948359501, 12.4497636694941],
    range: 10,
    profession: "Nerd",
    rating: 5,
  },
  {
    id: 6,
    name: "Sole",
    position: [42.09950618862456, 12.563746817117186],
    range: 15,
    profession: "Avvocato",
    rating: 3,
  },
  {
    id: 7,
    name: "Falco",
    position: [42.090681921149525, 12.27409778617536],
    range: 15,
    profession: "Studente",
    rating: 2,
  },
];

const special = [
  {
    id: 101,
    name: "Carlo",
    position: [42.16137759041936, 12.339213749209796],
    range: 10,
    profession: "Musicista",
    rating: 1,
  },
];

const user = {
  id: 100,
  type: "user",
  name: "Anna",
  position: [42.206914985163685, 12.39517535481974],
  profession: "Operaio",
  rating: 4,
  label: "Tu sei qui",
};

const seller = {
  id: 101,
  name: "Carlo",
  position: [42.16137759041936, 12.339213749209796],
  range: 10,
  profession: "Musicista",
  rating: 1,
  label: "Posizione venditore",
};

const appointment = [
  {
    id: 0,
    type: "request",
    title: "Giacomo",
    label: "Giacomo",
    allDay: true,
    start: new Date(),
    end: new Date(),
    position: [42.16137759041936, 12.339213749209796],
  },
  {
    id: 1,
    type: "appointment",
    title: "Antonio",
    label: "Antonio",
    start: new Date("2024/08/16 15:30"),
    end: new Date("2024/08/16 15:30"),
    position: [42.206914985163685, 12.39517535481974],
  },
];

const Components = ({ global }: GlobalPageProps) => {
  let allIcon = Object.keys(icons);
  const [column, setColumn] = useState(true);
  const [inline, setInline] = useState(true);
  const [inlineAcc, setInlineAcc] = useState(false);
  const [multipleAcc, setMultipleAcc] = useState(false);
  const [view, setView] = useState<any>(true);
  const [grid, setGrid] = useState<any>(true);
  const [activeMarker, setActiveMarker] = useState<any>(null);
  const [centerMap, setCenterMap] = useState(specialist[0]?.position);
  const [currentPosition, setCurrentPosition] = useState<any>(null);
  const [checkPosition, setCheckPosition] = useState<any>(false);
  const { loading, error, data } = useGeolocation();

  const handleCheckPosition = () => {
    setCheckPosition(true);
  };

  const handleCurrentPos = () => {
    if (data?.latitude && data?.longitude) {
      const pos = {
        label: "TU SEI QUI",
        position: [data?.latitude, data?.longitude],
      };
      setCurrentPosition(pos);
    } else {
      alert("Posizione non abilitata");
    }
  };

  useEffect(() => {
    if (checkPosition) {
      handleCurrentPos();
    }
  }, [data, checkPosition]);

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

  const handleView = (data: any) => {
    const { value } = data;
    setView(value);
  };

  const handleGrid = (data: any) => {
    const { value } = data;
    setGrid(value);
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
        <Section title="Accordion Box">
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
          <AccordionBox
            multipleOpen={multipleAcc}
            inline={inlineAcc}
            withTruncate={false}
            options={[
              {
                renderIcon: (
                  <Rating rate={4} disable size={theme.spaces.space3} />
                ),
                question: "Lorem Ipsum is simply dummy text?",
                answer:
                  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
              },
              {
                renderIcon: (
                  <Rating rate={3} disable size={theme.spaces.space3} />
                ),
                question: "Lorem Ipsum is simply dummy text?",
                answer:
                  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
              },
              {
                renderIcon: (
                  <Rating rate={5} disable size={theme.spaces.space3} />
                ),
                question: "Lorem Ipsum is simply dummy text?",
                answer:
                  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
              },
              {
                renderIcon: (
                  <Rating rate={2} disable size={theme.spaces.space3} />
                ),
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
            placeholder="Input search"
            name="name"
          />
          <Input
            className="mb-6"
            icon="search"
            placeholder="Input example"
            name="name"
          />
          <Input
            className="mb-6"
            iconBefore="search"
            defaultValue="Ciccio"
            topPlaceholder="Ricerca"
            placeholder="Input example"
            name="name"
          />
          <Input
            className="mb-6"
            placeholder="Input example"
            name="name"
            isError={true}
            message="Field error"
          />
          <Input className="mb-6" placeholder="Input example" name="name" />
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
          <DatePicker
            onChange={(d: any) => console.log(d)}
            topPlaceholder="With selection"
            selectsMultiple
          />
          <DatePicker
            withPortal
            topPlaceholder="With portal"
            onChange={(d: any) => console.log(d)}
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
        <Section title="Radio slider">
          <SliderTabs
            onChange={(data) => console.log(data)}
            options={[
              { label: "Cloud", value: 3, icon: "cloud" },
              {
                label: "moon",
                value: 4,
                icon: "moon",
                iconColor: theme.colors.warning,
              },
              {
                label: "Sun",
                value: 5,
                icon: "sun",
                iconColor: theme.colors.warning,
              },
            ]}
          />
        </Section>
        <Section title="Textarea">
          <Textarea
            maxLength={300}
            placeholder="Testo di test"
            topPlaceholder="Note"
          ></Textarea>
        </Section>
        <Section title="Tooltip">
          <Tooltip content="Lorem ipsum">TOOLTIP</Tooltip>
        </Section>
        <Section title="Popover">
          <Popover
            renderTarget={({ visible }: any) => {
              return (
                <Button kind={visible ? "primary" : "action"}>Action</Button>
              );
            }}
            renderContent={({ close }: any) => {
              return (
                <div>
                  <div className="flex mb-2">Sicuro di voler accettare?</div>
                  <div className="flex align-middle justify-center gap-2">
                    <Button size="sm" kind="error" onClick={close}>
                      NO
                    </Button>
                    <Button size="sm">SI</Button>
                  </div>
                </div>
              );
            }}
          />
        </Section>
        <Section title="Toogle">
          <Toggle name="theme" />
        </Section>
        <Section title="Dropdown">
          <Dropdown
            fullWidth={false}
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
            placeholder="Città"
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
            placeholder="Città"
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
        <Section title="Range slider">
          <RangeSlider />
        </Section>
        <Section title="Posizione">
          <p>
            Latitudine: <span>{data?.latitude}</span>
          </p>
          <p>
            Longitudine: <span>{data?.longitude}</span>
          </p>
          <Button onClick={handleCheckPosition}>POSIZIONE CORRENTE</Button>
        </Section>
        <Section title="Current position">
          <Map
            dinamic
            center={centerMap}
            zoom={12}
            selection={currentPosition}
          />
        </Section>
        <ContentMapper center={centerMap} specialist={specialist} />
        <Section title="Card">
          <motion.div layout className="card-list">
            <AnimatePresence>
              {specialist.map((item) => {
                return <Card key={item.id} option={item} />;
              })}
            </AnimatePresence>
          </motion.div>
        </Section>
        <Section title="Divide">
          <Checkbox label="Card / Map" checked={view} onChange={handleView} />
          <ContentMap className="between">
            <div className="content content-map">
              <Map center={centerMap} zoom={12}>
                <Markers
                  options={specialist}
                  zoom={14}
                  setActive={setActiveMarker}
                  active={activeMarker}
                />
              </Map>
            </div>
            <div className="content content-card">
              <motion.div layout className="card-list">
                <AnimatePresence>
                  {specialist.map((item) => {
                    return (
                      <Card
                        key={item.id}
                        option={item}
                        mini
                        active={activeMarker?.id == item?.id}
                        onClick={() => {
                          setActiveMarker(item);
                        }}
                      />
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </div>
          </ContentMap>
        </Section>
        <ContentAppointment
          options={special}
          center={special[0].position}
          selection={user}
          selectionSeller={seller}
        />
        <Section title="QR Code">
          <QRCode value="https;//marameo.com" fgColor={theme.colors.primary} />
        </Section>
        <Section title="Calendario appuntamenti">
          <Calendar appointment={appointment} />
        </Section>
      </Content>
    </Layout>
  );
};

// export default Components;
export default React.memo(Components);

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

const ContentMapper = ({ center, specialist }: any) => {
  const [selectionMap, setSelectionMap] = useState<any>();
  const [mapZoom, setMapZoom] = useState<any>(12);
  const [mapRange, setMapRange] = useState<any>(20);

  const handleSelection = (data: any) => {
    setSelectionMap(data);
  };

  const handleZoom = (data: any) => {
    setMapZoom(data.value);
  };

  const handleRange = (data: any) => {
    setMapRange(data.value);
  };

  return (
    <Section title="Map">
      <Autocomplete
        className="mb-3"
        onChange={handleSelection}
        value={selectionMap?.label}
      />
      <p className="mb-1">Zoom</p>
      <RangeSlider
        min={4}
        max={18}
        defaultValue={mapZoom}
        className="mb-3"
        onChange={handleZoom}
      />
      <p className="mb-1">Raggio</p>
      <RangeSlider
        min={1}
        max={300}
        defaultValue={mapRange}
        className="mb-3"
        onChange={handleRange}
      />
      <Map
        withRadius
        center={center}
        selection={selectionMap}
        zoom={mapZoom}
        radius={mapRange}
      >
        <Markers options={specialist} zoom={14} />
      </Map>
    </Section>
  );
};

const ContentAppointment = ({
  options,
  center,
  selection,
  selectionSeller,
}: any) => {
  const [markerUserPosition, setMarkerUserPosition] = useState<any>(selection);
  const [markerSellerPosition, setMarkerSellerPosition] =
    useState<any>(selectionSeller);

  useEffect(() => {
    if (selection || selectionSeller) {
      const interval = setInterval(() => {
        if (selection) {
          setMarkerUserPosition((prevUser: any) => {
            const newPosition = moveMarkerLinearly(
              prevUser.position,
              specialist[0].position
            );
            return {
              ...prevUser,
              position: newPosition,
            };
          });
        }

        if (selectionSeller) {
          setMarkerSellerPosition((prevSeller: any) => {
            const newPosition = moveMarkerLinearly(
              prevSeller.position,
              selection?.position || specialist[3].position
            );
            return {
              ...prevSeller,
              position: newPosition,
            };
          });
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <Section title="Map appuntamento">
      <Map
        height={"300px"}
        dinamic
        center={center}
        selection={markerUserPosition}
        selectionSeller={markerSellerPosition}
        zoom={18}
      >
        <MarkersAppointment options={options} zoom={14} />
      </Map>
    </Section>
  );
};

const ContentMap = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  &.between {
    justify-content: space-between;
  }
  .content {
    padding: ${theme.spaces.space2};
    &.content-map {
      flex: 1 0 70%;
    }
    &.content-card {
      flex: 1 0 30%;
      max-height: 700px;
      overflow-y: scroll;
      .card-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        .card {
          width: 100%;
        }
      }
    }
  }
  @media only screen and (max-width: ${theme.breakpoints.tablet}) {
    .content {
      &.content-card {
        flex: 1 0 100%;
        max-height: 300px;
      }
    }
  }
`;

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
