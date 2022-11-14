import moment from "moment";
import * as YUP from "yup";
/******************************************************************************* */
const getUserByIdSchema = YUP.object({
  id: YUP.number().required("User Id is required"),
});

type getUserById = YUP.InferType<typeof getUserByIdSchema>;

export async function validateGetUserById(param: any): Promise<getUserById> {
  return await getUserByIdSchema.validate(param, { abortEarly: false });
}
/******************************************************************************* */

const userSchema = YUP.object({
  id: YUP.number().required(),
  firstname: YUP.string(),
  lastname: YUP.string(),
  email: YUP.string().email(),
  gender: YUP.string(),
  ipAddress: YUP.string(),
  dateJoined: YUP.number().transform(function (value) {
    const datetime = moment.unix(value).utc().startOf("day").valueOf();
    return datetime;
  }),
});

type userSchemaType = YUP.InferType<typeof userSchema>;

export async function validateUserObj(param: any): Promise<userSchemaType> {
  return await userSchema.validate(param, { abortEarly: false });
}
/******************************************************************************* */

var listUserByDateJoinedSchema = YUP.object({
  date: YUP.string()
    .required()
    .test("is-date", "Date should be in format YYYY-MM-DD", function (value) {
      const isDateValid = moment(value, "YYYY-MM-DD", true).isValid();
      return !isDateValid;
    })
    .transform(function (value) {
      return moment(value, "YYYY-MM-DD").utc().startOf("day").valueOf().toString();
    }),
});

type listUserByDateJoinedType = YUP.InferType<typeof listUserByDateJoinedSchema>;

export async function validateListUserByDateJoined(params: any): Promise<listUserByDateJoinedType> {
  return await listUserByDateJoinedSchema.validate(params);
}
/******************************************************************************* */
