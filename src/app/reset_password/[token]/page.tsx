"use client";
import { useParams } from "next/navigation";
import form_styles from "@/app/components/authForms/login/login.module.css";
import local_styles from "./page.module.css";
import PrincipalSection from "@/app/components/sections/principal_sections";
import { passwordResetValidator } from "@/app/validations/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
interface ChangePasswordProps {
  password: string;
  password_confirmation: string;
}
export default function Page(): JSX.Element {
  const [data, setData] = useState<ChangePasswordProps>({
    password: "",
    password_confirmation: "",
  });
  const params = useParams();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordResetValidator),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });
  const onSubmit = async (data: ChangePasswordProps) => {
    console.log(data);
  };
  return (
    <>
      <PrincipalSection />
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <h1 className={local_styles.title}>
              Ingresa una nueva contraseña para recuperar tu cuenta
            </h1>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={form_styles.formInp}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Contraseña"
                      type="password"
                      className={form_styles.input}
                    />
                  )}
                />
              </div>
              {errors.password && (
                <p className={form_styles.errors_tags}>
                  {errors.password.message}
                </p>
              )}
              <div className={form_styles.formInp}>
                <Controller
                  name="password_confirmation"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Confirma tu nueva contraseña"
                      type="password"
                      className={form_styles.input}
                    />
                  )}
                />
              </div>
              {errors.password_confirmation && (
                <p className={form_styles.errors_tags}>
                  {errors.password_confirmation.message}
                </p>
              )}
              <div className={form_styles.submitButtonCvr}>
                <button
                  type="submit"
                  className={form_styles.submitButton + " mb-5 mt-3"}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
