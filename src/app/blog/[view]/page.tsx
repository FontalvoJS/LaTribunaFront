"use client";
import { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPoll,
  faUserEdit,
  faEdit,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.css"; // Asegúrate de ajustar el path si es necesario
import { getPostBySlug } from "@/app/assets/services/posts";
import Matches from "@/app/assets/components/matches/matches";
import { useSession } from "@/app/assets/context/session";
import { Post } from "@/app/assets/types/types";
const pollOptions = [
  { value: "like", percentage: 60 },
  { value: "dislike", percentage: 40 },
];
const categories = [
  "Analisis",
  "Liga Betplay",
  "Premier League",
  "UEFA",
  "Libertadores",
];
interface Votes {
  option: string,
  article: string
}
export default function Page() {
  const { view } = useParams();
  const [vote, setVote] = useState<string | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const { role } = useSession();
  const handleVote = (option: string) => {
    setVote(option);
  };
  useEffect(() => {
    const data = {
      option: vote,
      article: view,
    };
  }, [vote, view]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPostBySlug(view);
        console.log(fetchedPost);
        setPost(fetchedPost.Slug);
        setLatestPosts(fetchedPost.More);
      } catch (error) {
        console.error(error);
      }
    };

    if (view.length > 0) {
      fetchPost();
    }
  }, [view]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={`${styles.blog_single} gray-bg`}>
        <div className="container">
          <div className="row align-items-start">
            <div className="col-lg-8 m-15px-tb">
              <article className={`${styles.article}`}>
                <div className={`${styles.article_img}`}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    layout="responsive"
                    width={1000}
                    height={1000}
                    quality={100}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className={styles.description}>
                  <small>{post.description}</small>
                </div>
                <div className={`${styles.article_title}`}>
                  <h6>
                    <Link href="#">{post.category}</Link>
                  </h6>
                  <h2>{post.title}</h2>
                  <div className="media">
                    <div className={styles.calendar_text + " text-uppercase"}>
                      <strong>PUBLICADO:</strong>
                      {new Date(post.created_at).toLocaleDateString()} <br />
                      <strong>NOTA:</strong> CONTENIDO GENERADO POR INTELIGENCIA
                      ARTIFICIAL <br />
                      <strong>AUTOR:</strong> {post.author} <br />
                      <strong>
                        INFORMACIÓN VERIFICADA POR PERSONAL HUMANO
                      </strong>
                      <br />
                      {role === "admin" && (
                        <strong>
                          <Link href={"/manage/" + post.slug}>
                            <FontAwesomeIcon
                              icon={faEdit}
                              color="#9ba4b7"
                              className="mt-1"
                              cursor={"pointer"}
                              width={16}
                            />
                          </Link>
                        </strong>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.article_content}`}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
                <div className={`${styles.nav} ${styles.tag_cloud}`}>
                  {post.tags.split(",").map((tag: string, index: number) => (
                    <Link key={index} href="#">
                      {tag.trim()}
                    </Link>
                  ))}
                </div>
              </article>
              <div
                className={`${styles.contact_form} ${styles.article_comment}`}
              >
                <h4>Leave a Reply</h4>
                <form id="contact-form" method="POST">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          name="Name"
                          id="name"
                          placeholder="Name *"
                          className="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          name="Email"
                          id="email"
                          placeholder="Email *"
                          className="form-control"
                          type="email"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          name="message"
                          id="message"
                          placeholder="Your message *"
                          rows={4}
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="send">
                        <button className="px-btn theme">
                          <span>Enviar</span> <i className="arrow"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <Matches />
            </div>
            {/* Sidebar */}
            <div className="col-lg-4 m-15px-tb">
              {/* Encuesta */}
              <div
                className={`bg_side_color ${styles.widget} ${styles.widget_poll}`}
              >
                <h5 className={styles.widget_title}>
                  ¿Te gustó?
                  <span>
                    <FontAwesomeIcon
                      color="#535f73"
                      icon={faPoll}
                      width={30}
                      style={{
                        marginRight: "5%",
                        float: "right",
                        position: "relative",
                        bottom: "5px",
                      }}
                    />
                  </span>
                </h5>
                <form>
                  {pollOptions.map((option) => (
                    <div key={option.value} className={styles.poll_option}>
                      <label>
                        <FontAwesomeIcon
                          color={"#ff953d"}
                          icon={
                            option.value === "yes"
                              ? faArrowAltCircleUp
                              : faArrowAltCircleDown
                          }
                          width={25}
                          cursor={"pointer"}
                        />
                        <input
                          type="radio"
                          name="vote"
                          hidden
                          value={option.value}
                          checked={vote === option.value}
                          onChange={() => setVote(option.value)}
                        />
                      </label>
                      <div className={styles.poll_progress}>
                        <div
                          className={styles.poll_progress_bar}
                          style={{ width: `${option.percentage}%` }}
                        ></div>
                      </div>
                      <span className={styles.poll_percentage}>
                        {option.percentage}%
                      </span>
                    </div>
                  ))}
                  <hr />
                  <button
                    type="button"
                    className="btn btn-outline-success btn-block w-100"
                  >
                    <span>Enviar</span> <i className="arrow"></i>
                  </button>
                </form>
              </div>
              {/*  AUTOR PRESENTACION */}
              <div className={styles.card}>
                <p className={styles.card_title}>
                  <FontAwesomeIcon
                    color="#2d3645"
                    icon={faUserEdit}
                    width={50}
                    style={{ marginRight: "5%" }}
                  />
                  {post.author}
                </p>
                <hr />
                <p className={styles.small_desc}>
                  {post.author.includes("Valderrama") && (
                    <>
                      <strong>Detalles del personaje:</strong> Es un periodista
                      deportivo colombiano y ficticio, respetado por sus
                      análisis incisivos y contundentes sobre el fútbol nacional
                      e internacional. Su criterio es fuerte e imparcial, no
                      tolera las mentiras de los periodistas comerciales. Su
                      estilo auténtico y directo resuena profundamente con los
                      aficionados, quienes valoran su honestidad y compromiso
                      con la verdad.
                    </>
                  )}
                  {post.author.includes("Plebe") && (
                    <>
                      <strong>Detalles del personaje:</strong> Carlos Antonio
                      Plebe es un periodista deportivo colombiano y ficticio,
                      conocido por su estilo crítico y provocador. No teme ser
                      arenoso y a menudo utiliza un lenguaje vulgar que le ha
                      dado tanto seguidores como detractores. Su enfoque sin
                      filtros y su capacidad para señalar las fallas de los
                      equipos y jugadores lo han convertido en una figura odiada
                      y querida. A pesar de su controversia, Plebe es respetado
                      por su conocimiento profundo del fútbol y su compromiso
                      con el periodismo de calidad, aunque su manera de
                      expresarse no siempre sea la más diplomática.
                    </>
                  )}
                </p>
                <div className={styles.go_corner}>
                  <div className="go-arrow">→</div>
                </div>
              </div>
              {/*  LO ULTIMO */}

              <div
                className={`bg_side_color ${styles.widget} ${styles.widget_latest_posts}`}
              >
                <h5 className={styles.widget_title}>
                  Lo último
                  <span>
                    <FontAwesomeIcon
                      color="#535f73"
                      icon={faList}
                      width={30}
                      style={{
                        marginRight: "5%",
                        float: "right",
                        position: "relative",
                        bottom: "5px",
                      }}
                    />
                  </span>
                </h5>
                <hr />
                <div className={styles.latest_posts_list}>
                  {latestPosts.map((post, index) => (
                    <Link
                      key={index}
                      href={`/blog/${post.slug}`}
                      className={styles.latest_post_item}
                    >
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={50}
                        height={50}
                        className={styles.latest_post_image}
                        quality={100} // Establece la calidad al máximo para mantener la fidelidad de la imagen
                        layout="fixed" // Esto garantiza que las dimensiones de la imagen no cambien
                      />
                      <div className={styles.latest_post_content}>
                        <h4 className={styles.latest_post_title}>
                          {post.title}
                        </h4>
                        <small className={styles.latest_post_date}>
                          {new Date(post.created_at).toLocaleDateString()}
                        </small>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/*  CATEGORIAS */}
              <div className={styles.categoriesContainer}>
                {categories.map((category: string) => (
                  <Link
                    key={category}
                    className={styles.categoryItem}
                    href={`/category/${category}`}
                  >
                    <span>{category}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
