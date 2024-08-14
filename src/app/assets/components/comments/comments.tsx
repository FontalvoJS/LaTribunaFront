"use client";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import styles from "./comments.module.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useThrottle } from "../hooks/useThrottle";
import { useEffect, useState, useMemo } from "react";
import alertify from "../../notifications/toast/alert_service";
import {
  getComments,
  removeComment,
  uploadComments,
} from "../../services/posts";
import { CommentsTypes, Teams } from "../../types/types";
import { useSession } from "../../context/session";
import { formatDate } from "../../utils/format_date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
// Esquema de validación con Yup
const commentSchema = yup.object().shape({
  message: yup
    .string()
    .required("Debes escribir un mensaje de minimo 10 caracteres")
    .min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export default function Comments({ article }: { article: string }) {
  const [comments, setComments] = useState<any[]>([]);
  const [content, setContent] = useState<string>("");
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const { isLoggedIn, name, teams } = useSession();
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(commentSchema),
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    if (article && article.length > 0 && article.includes("-")) {
      const fetchComments = async () => {
        try {
          const res = await getComments(article);
          setComments(res.comments);
        } catch (error) {
          alertify.error("Error al cargar los comentarios");
        }
      };
      fetchComments();
    } else {
      alertify.error("Artículo inválido");
    }
  }, [article]);

  const onSubmit = async (data: CommentsTypes) => {
    if (!isLoggedIn) {
      alertify.info("Debes iniciar sesión para comentar");
      return;
    }
    try {
      data.article = article;
      await uploadComments(data);
      const res = await getComments(article);
      setComments(res.comments);
      reset({
        message: "",
      });
    } catch (error) {
      alertify.error("Error al enviar el comentario");
    }
  };
  const deleteComment = (id: string) => (
    <div>
      <small>¿Quieres borrar este comentario?</small>
      <div className="mt3 mb-3" />
      <div className="form-group">
        <div
          className="btn btn-primary alert_button"
          onClick={() => {
            removeComments(id);
          }}
        >
          Sí, continuar
        </div>
      </div>
    </div>
  );
  const throttledSubmit = useThrottle((data) => {
    onSubmit(data);
  }, 1000);
  const removeComments = async (id: string) => {
    try {
      await removeComment(id);
      const res = await getComments(article);
      setComments(res.comments);
    } catch (error) {
      alertify.error("Error al borrar el comentario: " + error);
    }
  };
  const setImageUserComment = (club: string, teams: Teams[]) => {
    if (club) {
      const clubSelected = teams.find((team: { value: string }) => team.value === club);
      if (clubSelected) {
        return clubSelected.image;
      }
    }
  };
  return (
    <div className={styles.commentsSection}>
      <h4 className={styles.title}>
        Escribe un comentario
        <div
          className={
            showPicker
              ? `${styles.emojiPickerContainer}`
              : `${styles.emojiPickerContainer + " " + styles.float_right}`
          }
        >
          {!showPicker && (
            <FontAwesomeIcon
              icon={faSmile}
              width={20}
              className={styles.emojiIcon}
              onClick={() => setShowPicker(!showPicker)}
              cursor={"pointer"}
            />
          )}
          {showPicker && (
            <div className={styles.emojiPicker}>
              <Picker
                data={data}
                onEmojiSelect={(e: { native: string }) =>
                  setContent(content + e.native)
                }
                previewPosition="none"
                emojiSize={16}
                onClickOutside={() => setShowPicker(false)}
                emojiButtonSize={30}
                locale="es"
              />
            </div>
          )}
        </div>
      </h4>
      <form
        onSubmit={handleSubmit(throttledSubmit)}
        id="contact-form"
        method="POST"
      >
        <div className="row">
          <div className="col-md-12">
            <div className={styles.formGroup}>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="message"
                    placeholder="¿Tienes algo qué decir?"
                    rows={4}
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                      field.onChange(e.target.value);
                    }}
                    className={styles.textarea}
                  ></textarea>
                )}
              />
              {errors.message && (
                <p className={styles.errorsTags}>{errors.message.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-12 text-right">
            <button
              type="submit"
              className={`btn btn-light mt-1 ${styles.submitButton}`}
            >
              Enviar
            </button>
          </div>
        </div>
      </form>
      <div className={styles.commentsList}>
        {comments.map((comment) => (
          <div key={comment.created_at} className={styles.commentItem}>
            <div className={styles.commentHeader}>
              <span className={styles.userName}>
                {comment.club && (
                  <Image
                    src={`/images/clubes/${setImageUserComment(comment.club, teams)}`}
                    width={20}
                    alt=""
                    quality={50}
                    height={20}
                  />
                )}
                {comment.user_name}
                
                <b className={styles.commentParche}>
                  {comment.parche ? `[${comment.parche}] ` : ""}
                </b>
              </span>
              <br />
              <span className={styles.commentDate}>
                {formatDate(comment.created_at)}
              </span>
            </div>
            <pre className={styles.commentContent}>{comment.content}</pre>
            {isLoggedIn && comment.user_name === name && (
              <div>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  width={10}
                  className={styles.commentRemove}
                  cursor={"pointer"}
                  onClick={() => alertify.info(deleteComment(comment.id))}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
