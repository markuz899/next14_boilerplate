import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "./select";

export interface AutocompleteProps {
  name?: string;
  onChange?: any;
  placeholder?: string;
  value?: string;
}

const Autocomplete = ({
  name = "city",
  placeholder = "Seleziona città",
  onChange,
  value = "",
}: AutocompleteProps) => {
  const [provider, setProvider] = useState<any>(null);
  const [address, setAddress] = useState([]);

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
      setProvider(new OpenStreetMapProvider());
    };

    loadProvider();
    // eslint-disable-next-line
  }, []);

  const getCityFromService = async (query: string) => {
    const results = await provider.search({ query });
    // const results = await User.pingo();
    // const data = results.map((item: any) => ({
    //   position: item.userId,
    //   value: item.id,
    //   label: item.title,
    //   raw: item.completed,
    // }));
    const data = results.map((item: any) => ({
      position: [item.y, item.x],
      value: item.label,
      label: item.label,
      raw: item.raw,
    }));
    setAddress(data);
  };

  const handleChangeCity = async (data: any) => {
    const { name, value } = data;
    setValue(name, value);
    if (data.position) {
      onChange && onChange(data);
    }
    if (value.length >= 3) {
      await getCityFromService(value);
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
