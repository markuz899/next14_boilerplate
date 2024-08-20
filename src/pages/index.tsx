import Image from "next/image";
import Link from "next/link";
import { GlobalPageProps } from "@/utils/interface";
import { WithAuth } from "@/hoc";
import Counter from "@/utils/redux/example";
import Layout from "@/containers/Layout";
import React, { useEffect, useState } from "react";
import { ContainerFull, Content } from "@/theme/styled";
import styled from "styled-components";
import theme from "@/theme";
import { Button, Card, Select, WordChanger } from "@/components";
import { mokCategories, specialist } from "@/utils/constants";
import { Utils } from "@/services";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

const Home = ({ global }: GlobalPageProps) => {
  const [city, setCity] = useState([]);

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
    <Layout global={global} title="Homepage">
      <ContentPage>
        <ContainerFull className="content-full">
          <TextBanner color={theme.colors.primaryLight}>
            <div className="content-text-banner">
              <h2>
                Trova il professionista{" "}
                <WordChanger
                  timing={5000}
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
                  kind="action"
                  label="ISCRIVITI GRATIS"
                  onClick={handleSearch}
                />
              </div>
            </div>
            <div className="content-img-banner">
              <img src="/static/img/certificate.svg" />
            </div>
          </TextBanner>
          <TextBanner color={theme.colors.warning}>
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
                  kind="action"
                  label="UNISCITI ALLA RETE"
                  onClick={handleSearch}
                />
              </div>
            </div>
          </TextBanner>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160">
            <path
              fill={theme.colors.warning}
              fillOpacity="1"
              d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,69.3C840,85,960,139,1080,154.7C1200,171,1320,149,1380,138.7L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg>
        </ContainerFull>
        <Content>
          <h2>Specialisti disponibili</h2>
          <motion.div layout className="card-list">
            <AnimatePresence>
              {specialist.map((item) => {
                return <Card key={item.id} option={item} />;
              })}
            </AnimatePresence>
          </motion.div>
          <div className="show-more">
            <Button>Vedi tutti gli specialisti</Button>
          </div>
        </Content>
        <ContainerFull className="content-full">full</ContainerFull>
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

const ContentPage = styled.div``;

const TextBanner = styled.div<{ color: string }>`
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: ${({ color }) => color};
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
    display: flex;
    align-items: center;
    width: 300px;
    height: 350px;
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    height: auto;
    flex-wrap: wrap;
    .content-img-banner {
      display: none;
    }
  }
`;
