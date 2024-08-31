import { useState, useEffect, memo, useRef } from "react";
import styled from "styled-components";
import theme from "@/theme";
import Select from "../Select";
import { Navigation, Utils } from "@/services";
import { useForm } from "react-hook-form";
import {
  mokCategories,
  mokSortPrice,
  mokSortPriceLabel,
} from "@/utils/constants";
import { useRouter } from "next/router";
import Modal from "../Modal";
import Icon from "../Icon";
import Button from "../Button";
import { motion } from "framer-motion";
import Badge from "../Badge";
import Toggle from "../Toggle";
import SliderTabs from "../SliderTabs";
import Autocomplete from "../Map/autocomplete";

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
    _sort: "",
    _view: "",
    _position: {},
  };
  const inputForm: any = {
    city: "city",
    category: "category",
    _sort: "_sort",
    _view: "_view",
    _position: "_position",
  };
  const validationCity: any = {
    city: {},
    category: {},
    _sort: {},
    _view: {},
    _position: {},
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
          if (key == inputForm._view) {
            onViewChange({ name, value });
          }
        }
      }
    }

    const removeUnused = filter.filter(
      (key: any) =>
        key.name !== inputForm._position && key.name !== inputForm._view
    );
    setFilters(removeUnused);
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

    // const exist = city.some((c: any) => c.value === data.value);
    // if (exist) {
    //   let data: any = { label: value };
    //   const c = await Navigation.getPositionCity({ city: value });
    //   if (c) {
    //     const [city] = c;
    //     if (city) {
    //       data = {
    //         position: [city.lat, city.lon],
    //         geojson: city?.geojson?.coordinates,
    //         ...data,
    //       };
    //     }
    //   }
    //   handleChange({ name, value: { data } });
    // }
    handleChange({ name, value: { data } });
  };

  const handleChange = (data: any) => {
    const { name, value } = data;
    if (name == inputForm.city) {
      setValue(name, value.data.label);
      setValue(inputForm._position, value.data.position);
    } else if (name == inputForm._view) {
      setValue(name, value);
      onViewChange(data);
    } else {
      setValue(name, value);
    }
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
    if (name == inputForm.city) {
      setValue(inputForm._position, "");
    }
    setValue(name, "");
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

    const removeUnused = filter.filter(
      (key: any) =>
        key.name !== inputForm._position && key.name !== inputForm._view
    );
    setFilters(removeUnused);
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
      } else if (item.name == inputForm._sort) {
        return (
          <motion.div
            key={item.name}
            className="badges"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            <Badge
              label={`${mokSortPriceLabel[item.value]}`}
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
                  <Autocomplete
                    name={inputForm.city}
                    value={getValues(inputForm.city)}
                    onChange={handleChangeCity}
                    iconBefore="map"
                  />
                  {/* <Select
                    enableInput
                    showArrow={city.length ? true : false}
                    name={inputForm.city}
                    defaultValues={watch(inputForm.city)}
                    onChange={handleChangeCity}
                    iconBefore="map"
                    placeholder="Città"
                    options={city}
                  /> */}
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
                    name={inputForm._sort}
                    defaultValues={watch(inputForm._sort)}
                    onChange={handleChange}
                    iconBefore="sort"
                    placeholder="Ordina per"
                    options={mokSortPrice}
                  />
                  {onViewChange && (
                    <SliderTabs
                      name={inputForm._view}
                      defaultValue={getValues(inputForm._view)}
                      onChange={handleChange}
                      options={optionsView}
                    />
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
              {filters.length ? (
                <div className="content-mobile-badge">{renderBadge()}</div>
              ) : (
                <></>
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
            <p
              className={`text-primary text-bolder ${
                filters?.length ? "bold" : ""
              }`}
            >
              FILTRI
            </p>
          </div>
        </Modal>
      </MobileContainer>
    );
  }

  return (
    <DesktopStyled $filters={filters?.length > 0}>
      <div className="content-filter">
        <div className="filter">
          <Autocomplete
            name={inputForm.city}
            value={getValues(inputForm.city)}
            onChange={handleChangeCity}
            iconBefore="map"
          />
          {/* <Select
            enableInput
            showArrow={city.length ? true : false}
            name={inputForm.city}
            value={getValues(inputForm.city)}
            onChange={handleChangeCity}
            iconBefore="map"
            placeholder="Città"
            options={city}
          /> */}
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
            name={inputForm._sort}
            defaultValues={getValues(inputForm._sort)}
            onChange={handleChange}
            iconBefore="sort"
            placeholder="Ordina per"
            options={mokSortPrice}
          />
          {onViewChange && (
            <SliderTabs
              name={inputForm._view}
              defaultValue={getValues(inputForm._view)}
              onChange={handleChange}
              options={optionsView}
            />
          )}
        </div>
      </div>
      <div className="content-badge">
        <div className="badge">{renderBadge()}</div>
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
