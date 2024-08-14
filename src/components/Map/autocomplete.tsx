import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "./select";

export interface AutocompleteProps {
  name?: string;
  onChange?: any;
  placeholder?: string;
  value?: string;
  className?: string;
}

const Autocomplete = ({
  name = "city",
  placeholder = "Seleziona città",
  onChange,
  value = "",
  className,
}: AutocompleteProps) => {
  const [provider, setProvider] = useState<any>(null);
  const [address, setAddress] = useState<any>([]);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  let defaultValues: any = {
    city: value,
  };
  const inputForm: any = {
    city: "city",
  };
  const validationCity: any = {
    city: {
      required: "Campo Obbligatorio",
    },
  };

  useEffect(() => {
    const loadProvider = async () => {
      const { OpenStreetMapProvider } = await import("leaflet-geosearch");
      setProvider(
        new OpenStreetMapProvider({
          params: {
            "accept-language": "it",
            countrycodes: "it",
          },
        })
      );
    };

    loadProvider();
    // eslint-disable-next-line
  }, []);

  const getCityFromService = async (query: string) => {
    setAddress([{ label: "Loading...", value: "", disabled: true }]);
    const results = await provider.search({ query });
    // const results = await User.pingo();
    // const data = results.map((item: any) => ({
    //   position: item.userId,
    //   value: item.id,
    //   label: item.title,
    //   raw: item.completed,
    // }));
    const data = results.reduce((acc: any, item: any) => {
      const existingItem = acc.find((i: any) => i.label === item.label);
      if (!existingItem) {
        acc.push({
          position: [item.y, item.x],
          value: item.label,
          label: item.label,
          raw: item.raw,
        });
      }
      return acc;
    }, [] as any[]);
    // const data = results.map((item: any) => ({
    //   position: [item.y, item.x],
    //   value: item.label,
    //   label: item.label,
    //   raw: item.raw,
    // }));
    if (!results?.length) {
      setAddress([{ label: "Nessun risultato...", value: "", disabled: true }]);
    } else {
      setAddress(data);
    }
  };

  const handleChangeCity = async (data: any) => {
    const { name, value } = data;
    setValue(name, value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      if (value.length >= 3) {
        await getCityFromService(value);
      }
    }, 500);

    if (data.position) {
      onChange && onChange(data);
    }
    // trigger(name);
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

  useEffect(() => {
    setValue(name, value);
    // eslint-disable-next-line
  }, [value]);

  return (
    <Select
      className={className}
      enableInput
      name={name}
      onChange={handleChangeCity}
      value={getValues(inputForm.city)}
      iconBefore="search"
      placeholder={placeholder}
      options={address || []}
      isError={!!errors[inputForm.city]}
      // message={errors[inputForm.city]?.message}
    />
  );
};

export default Autocomplete;
