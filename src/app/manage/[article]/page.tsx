"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./page.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { useThrottle } from "../../assets/components/hooks/useThrottle";
import { useParams } from "next/navigation";
import { getPostBySlug, removePostBySlug } from "../../assets/services/posts";
// Dynamic import for Editor component
const DynamicEditor = dynamic(
  () => import("@/app/assets/components/editor/editor"),
  { ssr: false }
);
import { uploadContent, updateContent } from "../../assets/services/posts";
import { FormValues } from "../../assets/types/types";
import alertify from "@/app/assets/notifications/toast/alert_service";
import { useRouter } from "next/navigation";

// Define validation schema with Yup
const schema = yup.object().shape({
  title: yup.string().required("El título es obligatorio"),
  image: yup.mixed(),
  description: yup.string().required("La descripción es obligatoria"),
  tags: yup.string().required("Los tags son obligatorios"),
  author: yup.string().required("El autor es obligatorio"),
  category: yup.string().required("La categoría es obligatoria"),
  editing: yup.boolean().required("El estado de edición es obligatorio"),
});

export default function Page(): JSX.Element {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "Redacta un nuevo articulo",
      image: undefined,
      description: "La descripción del contenido es obligatoria",
      tags: "Aquí puedes escribir tus tags separados por comas",
      author: "FontalvoJS",
      category: "",
      editing: false,
      content: "",
    },
  });
  const { article } = useParams();

  const [previewTitle, setPreviewTitle] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const [previewContent, setPreviewContent] = useState<string>("");

  const watchImage = watch("image");
  const watchContent = watch("content");
  const watchTitle = watch("title");
  const watchDescription = watch("description");
  // const watchTags = watch("tags");
  const watchAuthor = watch("author");
  // const watchCategory = watch("category");
  const changeTitle = article ? (
    <h1 className="text-light">Modifica el artículo</h1>
  ) : (
    <h1 className="text-light">Crea una nueva publicación</h1>
  );
  useEffect(() => {
    setPreviewTitle(watchTitle || "");
  }, [watchTitle]);

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  }, [watchImage]);

  useEffect(() => {
    setPreviewContent(watchContent || "");
  }, [watchContent]);

  useEffect(() => {
    const fetch_data = async () => {
      if (article && article.length > 0 && article.includes("-")) {
        const res = await getPostBySlug(article);
        if (res) {
          const contentForEdit =
            "<b>Portada actual: </b> <br/> <img src='" +
            res.image +
            "' width='500px' height='500px'/><br/>" +
            res.content;
          reset({
            title: res.title,
            description: res.description,
            tags: res.tags,
            image: undefined,
            author: res.author,
            category: res.category,
            content: contentForEdit,
            editing: true,
          });
        }
      }
    };
    if (article) {
      fetch_data();
    }
  }, [article, reset]);
  const deleteArticle = async () => {
    if (article && article.length > 0 && article.includes("-")) {
      await removePostBySlug(article);
      router.push("/");
    }
  };
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    data.content = previewContent;
    const newData = new FormData();
    newData.append("title", data.title);
    newData.append("image", data.image![0]);
    newData.append("description", data.description);
    newData.append("tags", data.tags);
    newData.append("author", data.author);
    newData.append("category", data.category);
    newData.append("content", data.content);
    newData.append("slug", article as string);
    newData.append("editing", data.editing ? "true" : "false");
    if (article && article.length > 0 && article.includes("-")) {
      await updateContent(newData);
    } else {
      await uploadContent(newData);
    }
    reset({
      title: "Redacta un nuevo articulo",
      image: undefined,
      description: "La descripción del contenido es obligatoria",
      tags: "Aquí puedes escribir tus tags separados por comas",
      author: "FontalvoJS",
      category: "",
    });
  };
  const throttledFunction = useThrottle(onSubmit, 1000);
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12">{changeTitle}</div>
      </div>
      <form onSubmit={handleSubmit(throttledFunction)}>
        <div className="row mt-3">
          <div className="col-lg-5">
            <label className="form-label labels">
              Selecciona una imagen de portada
            </label>
            {article && (
              <input type="checkbox" hidden {...register("editing")} />
            )}
            <input
              type="file"
              className="form-control"
              accept="image/*"
              {...register("image")}
            />
            {errors.image && (
              <p className="text-danger">{errors.image.message}</p>
            )}
          </div>
          <div className="col-lg-6">
            <label className="form-label labels">Título</label>
            <input
              type="text"
              className="form-control"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-danger">{errors.title.message}</p>
            )}
          </div>
          <div className="col-lg-1 mt-3">
            <button className="btn btn-primary mt-4">
              <small>{article ? "Guardar" : "Publicar"}</small>
            </button>
            {article && article.includes("-") && (
              <button onClick={deleteArticle} className="btn btn-dark mt-1">
                <small>Eliminar</small>
              </button>
            )}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-lg-5">
            <label className="form-label labels">Descripción</label>
            <input
              type="text"
              className="form-control"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-danger">{errors.description.message}</p>
            )}
          </div>
          <div className="col-lg-5">
            <label className="form-label labels">Tags</label>
            <input type="text" className="form-control" {...register("tags")} />
            {errors.tags && (
              <p className="text-danger">{errors.tags.message}</p>
            )}
          </div>
          <div className="col-lg-2">
            <label className="form-label labels">Autor</label>
            <input
              type="text"
              className="form-control"
              {...register("author")}
            />
            {errors.author && (
              <p className="text-danger">{errors.author.message}</p>
            )}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-lg-5">
            <label className="form-label labels">Categoría</label>
            <select className="form-select" {...register("category")}>
              <option value="">Selecciona una categoría</option>
              <option value="resultados_futbolisticos">
                Analisis de resultados
              </option>
              <option value="farandula">Farándula</option>
              <option value="chismes">Chismes</option>
              <option value="criticas">Críticas</option>
            </select>
            {errors.category && (
              <p className="text-danger">{errors.category.message}</p>
            )}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-lg-6">
            <label className="form-label labels">Contenido</label>
            <DynamicEditor
              setPreviewContent={setPreviewContent}
              previewContent={previewContent}
            />
          </div>
          <div className="col-lg-6">
            <label className="form-label labels">Vista previa</label>
            <div className={styles.preview}>
              <div className="d-flex flex-column">
                <h1 className={styles.preview_title}>{previewTitle}</h1>
                {previewImage && (
                  <Image
                    height={500}
                    width={500}
                    src={previewImage as string}
                    alt="Preview"
                    className="mb-3"
                  />
                )}
                <small
                  className={styles.preview_description + " text-light mb-3"}
                >
                  {watchDescription}
                </small>
                <hr style={{ backgroundColor: "white" }} />
                <div
                  className={styles.preview_content}
                  dangerouslySetInnerHTML={{ __html: previewContent }}
                />
                <p>
                  <span className={styles.preview_author}>
                    <FontAwesomeIcon icon={faUserEdit} width={20} />
                  </span>
                  <small
                    style={{ color: "#898989", textDecoration: "underline" }}
                  >
                    {watchAuthor}
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
