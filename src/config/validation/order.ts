import { messages } from ".";

export const defaultValues: any = {
  service: "",
  data: "",
};
export const inputForm: any = {
  service: "service",
  data: "data",
};
export const validation: any = {
  service: {
    required: messages.required,
  },
  data: {
    required: messages.required,
  },
};
