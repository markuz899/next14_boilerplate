import { useState, useEffect, memo, useRef } from "react";
import styled from "styled-components";
import theme from "@/theme";
import Select from "../Select";
import { Utils } from "@/services";
import { useForm } from "react-hook-form";
import { mokCategories, mokSortPrice } from "@/utils/constants";
import { useRouter } from "next/router";
import Modal from "../Modal";
import Icon from "../Icon";
import Button from "../Button";
import { motion } from "framer-motion";
import Badge from "../Badge";
import Toggle from "../Toggle";
import SliderTabs from "../SliderTabs";

interface FiltersProps {
  onChange?: any;
  isMobile?: boolean;
  onViewChange?: any;
}

const Filters = ({
  onChange,
  isMobile = false,
  onViewChange,
}: FiltersProps) => {
  const router = useRouter();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [city, setCity] = useState<any>([]);
  const [filters, setFilters] = useState([]);

  let optionsView = [
    {
      label: "Lista",
      value: "list",
    },
    {
      label: "Mappa",
      value: "mix",
    },
  ];

  if (isMobile) {
    optionsView = [
      {
        label: "Lista",
        value: "list",
      },
      {
        label: "Mappa",
        value: "map",
      },
    ];
  }

  let defaultValues: any = {
    city: "",
    category: "",
    _sortPrice: "",
  };
  const inputForm: any = {
    city: "city",
    category: "category",
    _sortPrice: "_sortPrice",
  };
  const validationCity: any = {
    city: {},
    category: {},
    _sortPrice: {},
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
  }, [router.query]);

  useEffect(() => {
    let filter: any = [];
    if (Object.keys(router.query).length) {
      for (const [key, value] of Object.entries(router.query)) {
        if (key == inputForm.city) {
          getCityFromService(value as any);
        }
        if (value) {
          setValue(key, value);
          filter.push({ name: key, value });
        }
      }
    }

    setFilters(filter);
    // eslint-disable-next-line
  }, [router.query]);

  const getCityFromService = async (query: string) => {
    let city = await Utils.getCity(query);
    setCity(city);
  };

  const handleChangeCity = async (data: any) => {
    const { name, value } = data;
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      if (value.length >= 3) {
        await getCityFromService(value);
      }
    }, 500);

    const exist = city.some((c: any) => c.value === data.value);
    if (exist) {
      handleChange({ name, value });
    }
  };

  const handleChange = (data: any) => {
    const { name, value } = data;
    setValue(name, value);
    handleSubmit();
  };

  const handleRemoveAll = () => {
    let data = getValues();
    Object.keys(data).forEach((k) => {
      if (k !== "pageSize") {
        setValue(k, "");
      }
    });
    setFilters([]);
    handleSubmit();
  };

  const handleRemoveOne = ({ name, value, selected }: any) => {
    if (value) {
      if (value.length === 0) {
        setValue(name, "");
      } else {
        let newVal = value.filter((el: any) => el !== selected);
        setValue(name, newVal);
      }
    } else {
      setValue(name, "");
    }
    let data = getValues();
    let filter: any = [];
    if (Object.keys(data).length) {
      for (const [key, value] of Object.entries(data)) {
        if (value) {
          filter.push({ name: key, value });
        }
      }
    }
    setFilters(filter);
    handleSubmit();
  };

  const handleSubmit = () => {
    const data = getValues();
    let filter: any = [];
    let query: any = {};
    console.log("handleSubmit", data);

    if (Object.keys(data).length) {
      for (const [key, value] of Object.entries(data)) {
        if (value) {
          query[key] = value;
          filter.push({ name: key, value });
        }
      }
    }

    setFilters(filter);
    router.push({ query });
    onChange && onChange({ data, query });
  };

  const renderBadge = () =>
    filters &&
    filters?.map((item: any) => {
      if (item.name === "canon") {
        return (
          <motion.div
            key={item.name}
            className="badges"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            <Badge
              label={`${item.value.min}-${item.value.max}`}
              onClick={() => handleRemoveOne({ name: item.name })}
            />
          </motion.div>
        );
      } else if (Array.isArray(item.value)) {
        return item.value.map((el: any, i: any) => {
          return (
            <motion.div
              key={i}
              className="badges"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
            >
              <Badge
                label={el}
                onClick={() =>
                  handleRemoveOne({
                    name: item.name,
                    value: item.value,
                    selected: el,
                  })
                }
              />
            </motion.div>
          );
        });
      }
      return (
        <motion.div
          key={item.name}
          className="badges"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
        >
          <Badge
            label={item.value}
            onClick={() => handleRemoveOne({ name: item.name })}
          />
        </motion.div>
      );
    });

  if (isMobile) {
    return (
      <MobileContainer>
        <Modal
          onClickOther
          size={[500, 500]}
          title="Filtri"
          fullScreen={true}
          render={({ close }) => (
            <MobileStyled>
              <div className="content-filter-mobile">
                <div className="filter">
                  <Select
                    enableInput
                    name={inputForm.city}
                    defaultValues={watch(inputForm.city)}
                    onChange={handleChangeCity}
                    iconBefore="map"
                    placeholder="Città"
                    options={city}
                  />
                  <Select
                    enableInput
                    name={inputForm.category}
                    defaultValues={watch(inputForm.category)}
                    onChange={handleChange}
                    iconBefore="list"
                    placeholder="Categoria"
                    options={mokCategories}
                  />
                </div>
                <div className="more">
                  <Select
                    name={inputForm._sortPrice}
                    defaultValues={watch(inputForm._sortPrice)}
                    onChange={handleChange}
                    placeholder="Ordina per"
                    options={mokSortPrice}
                  />
                  {onViewChange && (
                    <SliderTabs onChange={onViewChange} options={optionsView} />
                  )}
                </div>
              </div>
              {filters.length ? (
                <div className="remove" onClick={handleRemoveAll}>
                  <Icon
                    name="trash"
                    color={theme.colors.error}
                    size={theme.spaces.space4}
                  />
                </div>
              ) : (
                ""
              )}
              <div className="content-filter-mobile-action">
                <Button
                  onClick={close}
                  fluid
                  kind={filters.length ? "primary" : "ghost"}
                >
                  Chiudi
                </Button>
              </div>
            </MobileStyled>
          )}
        >
          <div className="d-flex cursor-pointer">
            <Icon
              name="filter"
              size={theme.spaces.space5}
              color={theme.colors.primary}
              margin="0 10px 0 0"
            />
            <p className="text-primary text-bolder">FILTRI</p>
          </div>
        </Modal>
        {filters.length ? (
          <div className="content-mobile-badge">{renderBadge()}</div>
        ) : (
          <></>
        )}
      </MobileContainer>
    );
  }

  return (
    <DesktopStyled $filters={filters?.length > 0}>
      <div className="content-filter">
        <div className="filter">
          <Select
            enableInput
            name={inputForm.city}
            value={getValues(inputForm.city)}
            onChange={handleChangeCity}
            iconBefore="map"
            placeholder="Città"
            options={city}
          />
          <Select
            enableInput
            name={inputForm.category}
            value={getValues(inputForm.category)}
            onChange={handleChange}
            iconBefore="list"
            placeholder="Categoria"
            options={mokCategories}
          />
        </div>
        <div className="more">
          <Select
            name={inputForm._sortPrice}
            value={getValues(inputForm._sortPrice)}
            onChange={handleChange}
            placeholder="Ordina per"
            options={mokSortPrice}
          />
          {onViewChange && (
            <SliderTabs onChange={onViewChange} options={optionsView} />
          )}
        </div>
      </div>
      <div className="content-badge">
        <div className="badge">
          {filters.map((item: any) => {
            if (item.name === "canon") {
              return (
                <Badge
                  key={item.name}
                  label={`${item.value.min}-${item.value.max}`}
                  onClick={() => handleRemoveOne({ name: item.name })}
                />
              );
            } else if (Array.isArray(item.value)) {
              return item.value.map((el: any, i: number) => {
                return (
                  <Badge
                    key={el.name}
                    label={el}
                    onClick={() =>
                      handleRemoveOne({
                        name: item.name,
                        value: item.value,
                        selected: el,
                      })
                    }
                  />
                );
              });
            }
            return (
              <Badge
                key={item.name}
                label={item.value}
                onClick={() => handleRemoveOne({ name: item.name })}
              />
            );
          })}
        </div>
        {filters.length ? (
          <div className="remove" onClick={handleRemoveAll}>
            <Icon
              name="trash"
              color={theme.colors.error}
              size={theme.spaces.space4}
            />{" "}
            <span className="text-error">SVUOTA</span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </DesktopStyled>
  );
};

export default memo(Filters);

const MobileContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: column;
  .content-mobile-badge {
    width: 100%;
    display: flex;
    gap: ${theme.spaces.space2};
    margin-top: ${theme.spaces.space3};
    overflow: hidden;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .button-filters {
    font-size: ${theme.font.size.small};
    min-height: ${theme.spaces.space7};
  }
`;
const MobileStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .content-filter-mobile {
    margin-bottom: ${theme.spaces.space2};
    .filter,
    .more {
      & > * {
        margin-bottom: 15px;
      }
    }
  }
  .content-filter-mobile-action {
    position: fixed;
    bottom: 0px;
    height: ${theme.spaces.space12};
    left: ${theme.spaces.space4};
    right: ${theme.spaces.space4};
  }
  .remove {
    position: absolute;
    top: 25px;
  }
`;
const DesktopStyled = styled.div<{ $filters: boolean }>`
  width: 100%;
  .content-filter {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-bottom: ${theme.spaces.space4};
    border-bottom: 1px solid ${theme.colors.greyIcon};
    .chebox_box {
      margin-bottom: 0px;
    }
    .filter {
      display: flex;
      flex-wrap: wrap;
      & > * {
        text-align: left;
        max-width: 180px;
        margin-right: ${theme.spaces.space2};
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .more {
    display: flex;
    align-items: center;
    & > * {
      max-width: 170px;
      margin-right: ${theme.spaces.space2};
      &:last-child {
        margin-right: 0;
      }
      &.pageSize {
        max-width: 70px;
      }
    }
  }
  .content-badge {
    display: ${({ $filters }) => ($filters ? "flex" : "none")};
    align-items: flex-start;
    justify-content: space-between;
    margin: ${theme.spaces.space4} 0 0;
    .badge {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      gap: ${theme.spaces.space4};
    }
    .remove {
      cursor: pointer;
      padding: ${theme.spaces.space2};
      background: ${theme.colors.cardLight};
      border: 1px solid ${theme.colors.error};
      border-radius: 8px;
      margin-bottom: ${theme.spaces.space2};
      display: flex;
      align-items: center;
      span {
        font-size: ${theme.font.size.mini};
        margin-left: ${theme.spaces.space1};
      }
    }
  }
`;
