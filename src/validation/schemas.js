import Joi from "joi";

export const cityGeneralFormSchema = Joi.object()
  .keys({
    name: Joi.string()
      .required()
      .label("City Name")
      .error((errors) => {
        return errors.map((error) => {
          switch (error.type) {
            case "any.empty":
              return { message: "Please select a city!" };
            default:
              return { message: "There's something wrong with city selection" };
          }
        });
      }),
  })
  .unknown(true);
