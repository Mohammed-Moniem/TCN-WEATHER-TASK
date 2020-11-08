import Joi from "joi";
import { cityGeneralFormSchema } from "./schemas";
import messages from "./../helpers/messages";

export const validateCityGeneralForm = (city) => {
  const { error } = Joi.validate(city, cityGeneralFormSchema, {
    abortEarly: true,
  });
  if (error) {
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    for (var key in errors) {
      messages.error(errors[key]);
    }
    return error;
  }
};
