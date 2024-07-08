"use client";

import styles from "./page.module.css";
import PrincipalSection from "../assets/components/sections/principal_sections";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPassService } from "@/app/assets/services/auth";
import { UpdateProfileService } from "../assets/services/profile";
import { ForgotPass } from "../assets/types/types";
import { useEffect, useState } from "react";
import alertify from "../assets/notifications/toast/alert_service";
import { useThrottle } from "../assets/components/hooks/useThrottle";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/assets/context/session";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(4, "Minimo 4 caracteres")
    .max(30, "Maximo 30 caracteres"),
  email: yup.string().email("Correo electrónico inválido"),
  club: yup
    .string(),
  parche: yup
    .string()
    .min(2, "Minimo 4 caracteres")
    .max(6, "Maximo 6 caracteres"),
});

interface FormValues {
  name?: string;
  email?: string;
  club?: string;
  parche?: string;
}

export default function Page(): JSX.Element {
  const { handleUpdateInfo } = useSession();
  const router = useRouter();
  const { email, name, parche, club } = useSession();
  const [isLoaded, setIsLoaded] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: name,
      email: email,
      club: club,
      parche: parche,
    },
  });

  useEffect(() => {
    if (name && email && parche && club) {
      reset({ name, email, club, parche });
      setIsLoaded(true);
    }
  }, [name, email, parche, club, reset]);

  const onSubmit = async (data: FormValues): Promise<void> => {
    if ((await UpdateProfileService(data)) === "redirect") {
      router.push("/");
      return
    }
    handleUpdateInfo(true);
  };
  const trotthledSubmit = useThrottle(onSubmit, 1000);
  const forgotPass = async (data: ForgotPass): Promise<void> => {
    alertify.info(
      "Enviaremos un email para que cambies tu contraseña, revisa tu bandeja de entrada o spam"
    );
    await forgotPassService({ email: data.email });
  };
  if (!isLoaded) {
    return <></>;
  }

  return (
    <>
      <PrincipalSection />
      <div className={styles.perfil_container + " container"}>
        <div className="row mb-3">
          <div className="col-sm-12 col-md-6">
            <h1 className={styles.title_perfil}>Mi cuenta</h1>
            <br />
            <form onSubmit={handleSubmit(trotthledSubmit)}>
              <div className="form-group">
                <label className={styles.labels}>Nombre de usuario</label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input type="text" className="form-control" {...field} />
                  )}
                />
                {errors.name && (
                  <p className="text-danger">{errors.name.message}</p>
                )}
              </div>
              <div className="form-group">
                <label className={styles.labels + " mt-3"}>
                  Correo electronico
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      {...field}
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>
              <div className="form-group">
                <label className={styles.labels + " mt-3"}>
                  Tu club favorito
                </label>
                <Controller
                  name="club"
                  control={control}
                  render={({ field }) => (
                    <select
                      className="form-control"
                      {...field}
                    >
                      <option value="ignore">
                        Selecciona tu equipo favorito
                      </option>
                      <option value="atletico_nacional">
                        Atlético Nacional
                      </option>
                      <option value="america_de_cali">América de Cali</option>
                      <option value="deportivo_cali">Deportivo Cali</option>
                      <option value="millonarios_fc">Millonarios FC</option>
                      <option value="independiente_santa_fe">
                        Independiente Santa Fe
                      </option>
                      <option value="junior_de_barranquilla">
                        Junior de Barranquilla
                      </option>
                      <option value="deportes_tolima">Deportes Tolima</option>
                      <option value="once_caldas">Once Caldas</option>
                      <option value="independiente_medellin">
                        Independiente Medellín
                      </option>
                      <option value="atletico_bucaramanga">
                        Atlético Bucaramanga
                      </option>
                      <option value="envigado_fc">Envigado FC</option>
                      <option value="alianza_petrolera">
                        Alianza Petrolera
                      </option>
                      <option value="boyaca_chico">Boyacá Chicó</option>
                      <option value="deportivo_pereira">
                        Deportivo Pereira
                      </option>
                      <option value="cucuta_deportivo">Cúcuta Deportivo</option>
                      <option value="real_cartagena">Real Cartagena</option>
                      <option value="union_magdalena">Unión Magdalena</option>
                      <option value="cortulua">Cortuluá</option>
                      <option value="patriotas_boyaca">Patriotas Boyacá</option>
                      <option value="deportivo_pasto">Deportion Pasto</option>
                      <option value="aguilas_doradas">Águilas Doradas</option>
                      <option value="jaguares_de_cordoba">
                        Jaguares de Córdoba
                      </option>
                      <option value="la_equidad">La Equidad</option>
                    </select>
                  )}
                />
                {errors.club && (
                  <p className="text-danger">{errors.club.message}</p>
                )}
              </div>
              <div className="form-group">
                <label className={styles.labels + " mt-3"}>
                  ¿Tienes un parche? Pon las siglas aquí
                </label>
                <Controller
                  name="parche"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      maxLength={6}
                      className="form-control"
                      {...field}
                    />
                  )}
                />
                {errors.parche && (
                  <p className="text-danger">{errors.parche.message}</p>
                )}
              </div>
              <br />
              <button type="submit" className="btn btn-outline-primary">
                Actualizar
              </button>
              <br />
              <button
                type="button"
                className="btn btn-dark btn-block w-100 mt-2"
                onClick={() => forgotPass({ email: email })}
              >
                Cambiar contraseña
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
