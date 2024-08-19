import Image from "next/image";
import Link from "next/link";
import { GlobalPageProps } from "@/utils/interface";
import { WithAuth } from "@/hoc";
import Counter from "@/utils/redux/example";
import Layout from "@/containers/Layout";
import React, { useState } from "react";
import { ContainerFull } from "@/theme/styled";
import styled from "styled-components";
import theme from "@/theme";
import { Select } from "@/components";
import { mokCategories } from "@/utils/constants";
import { Utils } from "@/services";

const Home = ({ global }: GlobalPageProps) => {
  const [city, setCity] = useState([]);

  const getCityFromService = async (query: string) => {
    let city = await Utils.getCity(query);
    setCity(city);
  };

  const handleSelectChange = (data: any, options: any) => {
    const exists = options.some((cat: any) => cat.value === data?.value);
    if (exists || data?.value == "") {
      console.log("select change", data);
    }
  };

  const handleSelectCity = (data: any) => {
    const { name, value } = data;
    if (value.length >= 3) {
      getCityFromService(value);
    }
  };

  return (
    <Layout global={{ ...global, handleSelectChange }} title="Homepage">
      <ContentPage>
        <ContainerFull className="content-full">
          <div className="content-banner">
            <div className="content-text-banner">
              <h2>
                Connettiti con i migliori professionisti: Soluzioni su misura,
                competenza garantita, risultati senza compromessi.
              </h2>
              <div className="content-row">
                <Select
                  rounded
                  clearable
                  enableInput
                  name="search"
                  showArrow={false}
                  onChange={handleSelectChange}
                  iconBefore="search"
                  placeholder="Di cosa hai bisogno?"
                  options={mokCategories}
                />
                <Select
                  rounded
                  clearable
                  enableInput
                  name="search"
                  showArrow={false}
                  onChange={handleSelectCity}
                  iconBefore="map"
                  placeholder="Dove ne hai bisogno?"
                  options={city}
                />
              </div>
            </div>
          </div>
        </ContainerFull>
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
  .content-full {
    .content-banner {
      height: 400px;
      background: ${theme.colors.primaryLight};
      display: flex;
      align-items: center;
      justify-content: center;
      .content-text-banner {
        max-width: 800px;
        padding: ${theme.spaces.space4};
        h2 {
          color: ${theme.colors.white};
        }
        .content-row {
          display: flex;
          align-items: center;
          gap: ${theme.spaces.space2};
        }
      }
    }
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    .content-full {
      .content-banner {
        .content-text-banner {
          .content-row {
            flex-wrap: wrap;
          }
        }
      }
    }
  }
`;
