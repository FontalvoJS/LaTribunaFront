"use client";
import { useParams } from "next/navigation";
import form_styles from "@/app/assets/components/authForms/login/login.module.css";
import local_styles from "./page.module.css";
import PrincipalSection from "@/app/assets/components/sections/principal_sections";
import { passwordResetValidator } from "@/app/assets/validations/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useThrottle } from "@/app/assets/components/hooks/useThrottle";
import { resetPassService } from "@/app/assets/services/auth";
import { ChangePasswordProps } from "@/app/assets/types/types";
export default function Page(): JSX.Element {
  const params = useParams();
  const [data, setData] = useState<ChangePasswordProps>({
    password: "",
    password_confirmation: "",
    token: String(params.token),
    email: decodeURIComponent(String(params.email)),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordResetValidator),
    defaultValues: {
      password: "",
      password_confirmation: "",
      token: String(params.token),
      email: decodeURIComponent(String(params.email)),
    },
  });
  const throttledSubmit = useThrottle((data: ChangePasswordProps): void => {
    onSubmit(data);
  }, 5000);
  const onSubmit = async (data: ChangePasswordProps) => {
    setData(data);
    await resetPassService(data);
  };
  return (
    <>
      <PrincipalSection />
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <h1 className={local_styles.title}>
              Ingresa una nueva contraseña
            </h1>
            <hr />
            <form onSubmit={handleSubmit(throttledSubmit)}>
              <div className={form_styles.formInp}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Ingresa tu correo"
                      type="email"
                      className={form_styles.input}
                    />
                  )}
                />
              </div>
              {errors.email && (
                <p className={form_styles.errors_tags}>
                  {errors.email.message}
                </p>
              )}
              <div className={form_styles.formInp}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Nueva contraseña"
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
