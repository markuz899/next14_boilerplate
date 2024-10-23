import { GlobalPageProps } from "@/utils/interface";
import { WithAuth } from "@/hoc";
import Layout from "@/containers/Layout";
import React, { useEffect, useState } from "react";
import { ContainerFull, Content, ContentMap } from "@/theme/styled";
import styled from "styled-components";
import theme from "@/theme";
import { Card, Map, Markers, Filters } from "@/components";
import { specialist } from "@/utils/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useBreakpoints, useGeolocation } from "@/hooks";

const Professional = ({ global, query }: GlobalPageProps) => {
  const { loading, error, data } = useGeolocation();
  const { isSmall } = useBreakpoints();
  const [view, setView] = useState("list");
  const [activeMarker, setActiveMarker] = useState<any>(null);
  const [position, setPosition] = useState({});
  const [hoverMarker, setHoverMarker] = useState<any>(null);

  useEffect(() => {
    if (query?._position) {
      const p = { label: query.city, position: query?._position };
      setPosition(p);
    } else {
      setPosition({});
    }
  }, [query]);

  const handleView = (data: any) => {
    setView(data?.value);
  };

  const onChangeFilters = async (formData: any) => {
    console.log("onChangeFilters", formData);
  };

  const onChangeMap = ({ position }: { position: [number, number] }) => {
    console.log("La mappa è stata spostata. Nuove coordinate:", position);
  };

  return (
    <Layout global={global} title="Homepage" footer={false}>
      <ContentPage>
        <Content className="filters">
          <SwitchMobile>
            <div className="desktop">
              <ContentFilter>
                <Filters onChange={onChangeFilters} onViewChange={handleView} />
              </ContentFilter>
            </div>
            <div className="mobile">
              <Filters
                onChange={onChangeFilters}
                onViewChange={handleView}
                isMobile={true}
              />
            </div>
          </SwitchMobile>
        </Content>

        <AnimatePresence mode="popLayout">
          {(view == "list" || view == "map") && (
            <Content>
              {view == "list" && (
                <motion.div
                  key="list-view"
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="card-list"
                >
                  {specialist.map((item) => {
                    return <Card key={item.id} option={item} />;
                  })}
                </motion.div>
              )}
              {view == "map" && (
                <motion.div
                  key="map-view"
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="card-map"
                >
                  <Map
                    selection={position}
                    onChange={onChangeMap}
                    className="mapper"
                    gestureHandling={false}
                    center={
                      data?.latitude
                        ? [data?.latitude, data?.longitude]
                        : specialist[0]?.position
                    }
                    zoom={11}
                  >
                    <Markers isSmall={isSmall} options={specialist} zoom={14} />
                  </Map>
                </motion.div>
              )}
            </Content>
          )}

          {view == "mix" && (
            <ContainerFull className="content-full">
              <ContentMap className="between">
                <div className="content content-card">
                  <motion.div
                    layout
                    className="card-list"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    {specialist.map((item) => {
                      return (
                        <Card
                          key={item.id}
                          option={item}
                          onMouseEnter={() => {
                            setHoverMarker(item);
                          }}
                          onMouseLeave={() => {
                            setHoverMarker(null);
                          }}
                        />
                      );
                    })}
                  </motion.div>
                </div>
                <div className="content content-map p-0">
                  <motion.div
                    layout
                    className="card-map"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Map
                      selection={position}
                      onChange={onChangeMap}
                      center={
                        data?.latitude
                          ? [data?.latitude, data?.longitude]
                          : specialist[0]?.position
                      }
                      zoom={12}
                    >
                      <Markers
                        options={specialist}
                        zoom={14}
                        hover={hoverMarker}
                      />
                    </Map>
                  </motion.div>
                </div>
              </ContentMap>
            </ContainerFull>
          )}
        </AnimatePresence>
      </ContentPage>
    </Layout>
  );
};

export async function getServerSideProps(ctx: { req: any; query: any }) {
  // const delay = (s: number) => new Promise((resolve) => setTimeout(resolve, s));
  // await delay(2000);
  const { req, query } = ctx;
  // const customVariable = req.headers["x-custom-variable"];
  return {
    props: { query },
  };
}

export default React.memo(Professional);

const SwitchMobile = styled.div`
  .desktop {
    display: block;
  }
  .mobile {
    display: none;
    width: 100%;
    box-sizing: border-box;
    justify-content: flex-end;
    padding: ${theme.spaces.space2};
  }
  @media only screen and (max-width: ${theme.breakpoints.tablet}) {
    .desktop {
      display: none;
    }
    .mobile {
      display: flex;
    }
  }
`;
const ContentFilter = styled.div``;

const ContentPage = styled.div`
  .wave {
    position: relative;
    z-index: 1;
    &.primary {
      background: ${theme.colors.warning};
      transform: rotate(180deg);
      top: -1px;
    }
    &.warning {
      transform: rotate(180deg);
      top: -2px;
    }
  }
`;
