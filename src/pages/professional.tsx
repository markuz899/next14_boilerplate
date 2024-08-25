import Image from "next/image";
import Link from "next/link";
import { GlobalPageProps } from "@/utils/interface";
import { WithAuth } from "@/hoc";
import Counter from "@/utils/redux/example";
import Layout from "@/containers/Layout";
import React, { useEffect, useState } from "react";
import {
  ContainerFull,
  Content,
  ContentMap,
  ContentTitle,
} from "@/theme/styled";
import styled from "styled-components";
import theme from "@/theme";
import {
  Button,
  Card,
  Select,
  SliderTabs,
  WordChanger,
  Map,
  Markers,
} from "@/components";
import { mokCategories, specialist } from "@/utils/constants";
import { Utils } from "@/services";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { useBreakpoints } from "@/hooks";

const Professional = ({ global }: GlobalPageProps) => {
  const { isSmall } = useBreakpoints();
  const [city, setCity] = useState([]);
  const [view, setView] = useState("list");
  const [activeMarker, setActiveMarker] = useState<any>(null);

  let optionsView = [
    {
      label: "",
      value: "list",
      icon: "list",
      checked: view == "list",
    },
    {
      label: "",
      value: "mix",
      icon: "grid",
    },
  ];

  if (isSmall) {
    optionsView = [
      {
        label: "",
        value: "list",
        icon: "list",
        checked: view == "list",
      },
      {
        label: "",
        value: "map",
        icon: "map",
        checked: view == "map",
      },
    ];
  }

  let defaultValues: any = {
    city: "",
    category: "",
  };
  const inputForm: any = {
    city: "city",
    category: "category",
  };
  const validationCity: any = {
    city: {},
    category: {},
  };

  const {
    register,
    setValue,
    getValues,
    trigger,
    unregister,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    Object.keys(inputForm).forEach((k: any) => {
      register(k, validationCity[k]);
    });
    return () => {
      Object.keys(inputForm).forEach((k: any) => {
        unregister(k);
      });
    };
    // eslint-disable-next-line
  }, []);

  const handleSearch = () => {
    const data = getValues();
    console.log("formdata", data);
  };

  const getCityFromService = async (query: string) => {
    let city = await Utils.getCity(query);
    setCity(city);
  };

  const handleView = (data: any) => {
    setView(data?.value);
  };

  const handleSelectChange = (data: any, options: any) => {
    const { name, value } = data;
    const exists = options.some((cat: any) => cat.value === value);
    if (exists || value == "") {
      setValue(name, value);
      console.log("select change", data);
    }
  };

  const handleSelectCity = (data: any) => {
    const { name, value } = data;
    if (value.length >= 3) {
      setValue(name, value);
      getCityFromService(value);
    }
  };

  const words = [
    "perfetto",
    "qualificato",
    "giusto",
    "specializzato",
    "professionale",
    "efficiente",
    "certificato",
  ];

  return (
    <Layout global={global} title="Homepage" footer={false}>
      <ContentPage>
        <ContentTitle>
          <div className="title">
            <h2>Specialisti</h2>
            <div className="component">
              <div className="toggle-mobile">
                <SliderTabs onChange={handleView} options={optionsView} />
              </div>
            </div>
          </div>
        </ContentTitle>

        {(view == "list" || view == "map") && (
          <Content>
            {view == "list" && (
              <AnimatePresence mode="popLayout">
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
              </AnimatePresence>
            )}
            {view == "map" && (
              <AnimatePresence mode="popLayout">
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
                    gestureHandling={false}
                    center={specialist[0]?.position}
                    zoom={12}
                    height={"800px"}
                  >
                    <Markers isSmall={isSmall} options={specialist} zoom={14} />
                  </Map>
                </motion.div>
              </AnimatePresence>
            )}
          </Content>
        )}

        {view == "mix" && (
          <ContainerFull className="content-full">
            <ContentMap className="between">
              <div className="content content-card">
                <motion.div layout className="card-list">
                  <AnimatePresence>
                    {specialist.map((item) => {
                      return <Card key={item.id} option={item} />;
                    })}
                  </AnimatePresence>
                </motion.div>
              </div>
              <div className="content content-map p-0">
                <motion.div layout className="card-map">
                  <AnimatePresence>
                    <Map center={specialist[0]?.position} zoom={12}>
                      <Markers options={specialist} zoom={14} />
                    </Map>
                  </AnimatePresence>
                </motion.div>
              </div>
            </ContentMap>
          </ContainerFull>
        )}
      </ContentPage>
    </Layout>
  );
};

export async function getServerSideProps(ctx: { req: any }) {
  // const delay = (s: number) => new Promise((resolve) => setTimeout(resolve, s));
  // await delay(2000);
  const { req } = ctx;
  // const customVariable = req.headers["x-custom-variable"];
  return {
    props: {},
  };
}

export default WithAuth(React.memo(Professional));

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

const TextBanner = styled.div<{ color: string }>`
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: ${({ color }) => color};
  z-index: 2;
  .content-text-banner {
    display: flex;
    flex-direction: column;
    gap: ${theme.spaces.space4};
    max-width: 800px;
    padding: ${theme.spaces.space4};
    h2 {
      font-weight: bold;
      color: ${theme.colors.dark};
      text-transform: uppercase;
    }
    p {
      color: ${theme.colors.dark};
      line-height: 1.3;
    }
    .content-action {
      margin-top: 10px;
    }
  }
  .content-img-banner {
    padding: ${theme.spaces.space4};
    display: flex;
    align-items: center;
    width: 300px;
    height: 350px;
  }
  &.warning {
    top: -2px;
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    height: auto;
    flex-wrap: wrap;
    .content-img-banner {
      display: none;
    }
  }
`;
