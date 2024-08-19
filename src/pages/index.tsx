import Image from "next/image";
import Link from "next/link";
import { GlobalPageProps } from "@/utils/interface";
import { WithAuth } from "@/hoc";
import Counter from "@/utils/redux/example";
import Layout from "@/containers/Layout";
import React, { useEffect, useState } from "react";
import { ContainerFull } from "@/theme/styled";
import styled from "styled-components";
import theme from "@/theme";
import { Button, Select } from "@/components";
import { mokCategories } from "@/utils/constants";
import { Utils } from "@/services";
import { useForm } from "react-hook-form";

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

  return (
    <Layout global={global} title="Homepage">
      <ContentPage>
        <ContainerFull className="content-full">
          <div className="content-banner">
            <div className="content-text-banner">
              <h2>
                Connettiti con i migliori professionisti: <br />
                Soluzioni su misura, competenza garantita, risultati senza
                compromessi.
              </h2>
              <div className="content-row">
                <Select
                  rounded
                  clearable
                  enableInput
                  name={inputForm.category}
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
                  name={inputForm.city}
                  showArrow={false}
                  onChange={handleSelectCity}
                  iconBefore="map"
                  placeholder="Dove ne hai bisogno?"
                  options={city}
                />
              </div>
              <div className="content-action">
                <Button kind="action" label="CERCA" onClick={handleSearch} />
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
        display: flex;
        flex-direction: column;
        gap: ${theme.spaces.space4};
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
        .content-action {
          margin-top: 10px;
          text-align: center;
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
