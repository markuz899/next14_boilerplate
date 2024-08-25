import Image from "next/image";
import Link from "next/link";
import { GlobalPageProps } from "@/utils/interface";
import { WithAuth } from "@/hoc";
import Counter from "@/utils/redux/example";
import Layout from "@/containers/Layout";
import React, { useEffect, useState } from "react";
import { ContainerFull, Content, ContentMap } from "@/theme/styled";
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

const Home = ({ global }: GlobalPageProps) => {
  const { isSmall } = useBreakpoints();
  const [city, setCity] = useState([]);
  const [view, setView] = useState("list");
  const [activeMarker, setActiveMarker] = useState<any>(null);

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
        <ContainerFull className="content-full">
          <TextBanner className="primary" color={theme.colors.primaryLight}>
            <div className="content-text-banner">
              <h2>
                Trova il professionista{" "}
                <WordChanger
                  color={theme.colors.warning}
                  options={words}
                  uppercase
                />{" "}
                per ogni tua esigenza, senza compromessi!
              </h2>
              <p>
                Il nostro portale ti offre accesso immediato a una rete di
                esperti altamente qualificati, pronti a soddisfare le tue
                richieste in modo rapido, efficiente e sicuro. Non importa quale
                sia la tua necessità, qui troverai sempre la persona giusta.
              </p>
              <div className="content-action">
                <Button
                  kind="inverse-warning"
                  label="ISCRIVITI GRATIS"
                  onClick={handleSearch}
                />
              </div>
            </div>
            <div className="content-img-banner">
              <img src="/static/img/certificate.svg" />
            </div>
          </TextBanner>
          <svg className="wave primary" viewBox="0 0 1440 190" version="1.1">
            <defs>
              <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                <stop stopColor={theme.colors.primaryLight} offset="20%" />
                <stop stopColor={theme.colors.primaryDark} offset="100%" />
              </linearGradient>
            </defs>
            <path
              style={{ transform: "translate(0, 0px)", opacity: 1 }}
              fill="url(#sw-gradient-0)"
              d="M0,19L48,15.8C96,13,192,6,288,25.3C384,44,480,89,576,104.5C672,120,768,108,864,95C960,82,1056,70,1152,79.2C1248,89,1344,120,1440,114C1536,108,1632,63,1728,63.3C1824,63,1920,108,2016,107.7C2112,108,2208,63,2304,60.2C2400,57,2496,95,2592,98.2C2688,101,2784,70,2880,47.5C2976,25,3072,13,3168,6.3C3264,0,3360,0,3456,19C3552,38,3648,76,3744,98.2C3840,120,3936,127,4032,129.8C4128,133,4224,133,4320,110.8C4416,89,4512,44,4608,34.8C4704,25,4800,51,4896,66.5C4992,82,5088,89,5184,88.7C5280,89,5376,82,5472,69.7C5568,57,5664,38,5760,44.3C5856,51,5952,82,6048,104.5C6144,127,6240,139,6336,129.8C6432,120,6528,89,6624,72.8C6720,57,6816,57,6864,57L6912,57L6912,190L6864,190C6816,190,6720,190,6624,190C6528,190,6432,190,6336,190C6240,190,6144,190,6048,190C5952,190,5856,190,5760,190C5664,190,5568,190,5472,190C5376,190,5280,190,5184,190C5088,190,4992,190,4896,190C4800,190,4704,190,4608,190C4512,190,4416,190,4320,190C4224,190,4128,190,4032,190C3936,190,3840,190,3744,190C3648,190,3552,190,3456,190C3360,190,3264,190,3168,190C3072,190,2976,190,2880,190C2784,190,2688,190,2592,190C2496,190,2400,190,2304,190C2208,190,2112,190,2016,190C1920,190,1824,190,1728,190C1632,190,1536,190,1440,190C1344,190,1248,190,1152,190C1056,190,960,190,864,190C768,190,672,190,576,190C480,190,384,190,288,190C192,190,96,190,48,190L0,190Z"
            />
          </svg>
          <TextBanner className="warning" color={theme.colors.warning}>
            <div className="content-img-banner">
              <img src="/static/img/experts.svg" />
            </div>
            <div className="content-text-banner">
              <h2>Perchè i professionisti si iscrivono</h2>
              <p>
                Il nostro portale offre ai professionisti nuove opportunità per
                espandere la loro carriera, lavorando con clienti di diversi
                settori e su progetti stimolanti, il tutto comodamente dalla
                propria area di residenza. I nostri iscritti continuano a
                utilizzare la piattaforma perché rappresenta un modo flessibile
                e gratificante per guadagnare, crescere professionalmente e fare
                la differenza nella vita delle persone e delle aziende con cui
                collaborano.
              </p>
              <div className="content-action">
                <Button
                  kind="inverse-primary"
                  label="UNISCITI ALLA RETE"
                  onClick={handleSearch}
                />
              </div>
            </div>
          </TextBanner>
          <svg className="wave warning" viewBox="0 0 1440 190" version="1.1">
            <defs>
              <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
                <stop stopColor={theme.colors.warning} offset="0%" />
                <stop stopColor={theme.colors.warningDark} offset="100%" />
              </linearGradient>
            </defs>
            <path
              style={{ transform: "translate(0, 0px)", opacity: 1 }}
              fill="url(#sw-gradient-1)"
              d="M0,19L48,15.8C96,13,192,6,288,25.3C384,44,480,89,576,104.5C672,120,768,108,864,95C960,82,1056,70,1152,79.2C1248,89,1344,120,1440,114C1536,108,1632,63,1728,63.3C1824,63,1920,108,2016,107.7C2112,108,2208,63,2304,60.2C2400,57,2496,95,2592,98.2C2688,101,2784,70,2880,47.5C2976,25,3072,13,3168,6.3C3264,0,3360,0,3456,19C3552,38,3648,76,3744,98.2C3840,120,3936,127,4032,129.8C4128,133,4224,133,4320,110.8C4416,89,4512,44,4608,34.8C4704,25,4800,51,4896,66.5C4992,82,5088,89,5184,88.7C5280,89,5376,82,5472,69.7C5568,57,5664,38,5760,44.3C5856,51,5952,82,6048,104.5C6144,127,6240,139,6336,129.8C6432,120,6528,89,6624,72.8C6720,57,6816,57,6864,57L6912,57L6912,190L6864,190C6816,190,6720,190,6624,190C6528,190,6432,190,6336,190C6240,190,6144,190,6048,190C5952,190,5856,190,5760,190C5664,190,5568,190,5472,190C5376,190,5280,190,5184,190C5088,190,4992,190,4896,190C4800,190,4704,190,4608,190C4512,190,4416,190,4320,190C4224,190,4128,190,4032,190C3936,190,3840,190,3744,190C3648,190,3552,190,3456,190C3360,190,3264,190,3168,190C3072,190,2976,190,2880,190C2784,190,2688,190,2592,190C2496,190,2400,190,2304,190C2208,190,2112,190,2016,190C1920,190,1824,190,1728,190C1632,190,1536,190,1440,190C1344,190,1248,190,1152,190C1056,190,960,190,864,190C768,190,672,190,576,190C480,190,384,190,288,190C192,190,96,190,48,190L0,190Z"
            />
          </svg>
        </ContainerFull>

        <Content>
          <div className="title">
            <h2>Specialisti disponibili</h2>
            <div className="component">
              <div className="toggle-mobile">
                {view == "list" ? (
                  <span onClick={() => handleView({ value: "map" })}>
                    Mostra mappa
                  </span>
                ) : (
                  <span onClick={() => handleView({ value: "list" })}>
                    Mostra lista
                  </span>
                )}
              </div>
            </div>
          </div>
          {view == "list" ? (
            <AnimatePresence>
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
          ) : (
            <AnimatePresence>
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

        {/* <ContainerFull className="content-full">
          <div className="title">
            <h2>Specialisti disponibili</h2>
          </div>
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
            <div className="show-more">
              <Button>MOSTRA ALTRI</Button>
            </div>
          </ContentMap>
        </ContainerFull> */}
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

export default WithAuth(React.memo(Home));

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
