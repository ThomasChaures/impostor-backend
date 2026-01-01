import yup from "yup";

export const userSchema = yup.object({
  nickname: yup.string().required,
  annonId: yup.string().required,
});
