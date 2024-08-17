"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPoll,
  faUserEdit,
  faSpinner,
  faEdit,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.css"; // Asegúrate de ajustar el path si es necesario
import {
  getPostBySlug,
  getPostReactions,
  postReaction,
} from "@/app/assets/services/posts";
import Matches from "@/app/assets/components/matches/matches";
import { useSession } from "@/app/assets/context/session";
import { Post, Votes, PollOptionsProps } from "@/app/assets/types/types";
import { categories } from "@/app/assets/utils/constants";
import { useThrottle } from "@/app/assets/components/hooks/useThrottle";
import Comments from "@/app/assets/components/comments/comments";
import { formatDate } from "@/app/assets/utils/format_date";
import SocialShare from "@/app/assets/components/socialshare/socialshare";
export default function Page() {
  const { view } = useParams();
  const [vote, setVote] = useState<string | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [pollOptions, setPollOptions] = useState<PollOptionsProps[]>([
    {
      value: "like",
      percentage: 0,
      userVote: false,
    },
    {
      value: "dislike",
      percentage: 0,
      userVote: false,
    },
  ]);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [postLoaded, setPostLoaded] = useState<boolean>(false);
  const [reactionsLoaded, setReactionsLoaded] = useState<boolean>(false);
  const { role, isLoggedIn } = useSession();
  const handleVote = (option: string) => {
    setVote(option);
  };
  const throttledHandleVote = useThrottle(handleVote, 1000);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data: Votes = {
          option: vote,
          article: view as string,
        };
        if (data.option && isLoggedIn) {
          await postReaction(data);
        }
        if (!reactionsLoaded || data.option !== null) {
          if (isLoggedIn) {
            const reactions = await getPostReactions(view as string);
            setTotalVotes(reactions.total);
            const pollData = [
              {
                value: "like",
                percentage: totalVotes > 0 ? reactions.likes : 0,
                userVote: reactions.userVote,
              },
              {
                value: "dislike",
                percentage: totalVotes > 0 ? reactions.dislikes : 0,
                userVote: reactions.userVote,
              },
            ];
            setPollOptions(pollData);
            setVote(reactions.userVote);
            setReactionsLoaded(true);
          }
        }
        if (!postLoaded) {
          const fetchedPost = await getPostBySlug(view as string);
          if (fetchedPost && fetchedPost.Slug) {
            setPost(fetchedPost.Slug);
            setLatestPosts(fetchedPost.More);
            setPostLoaded(true);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (view) {
      fetchPost();
    }
  }, [
    view,
    isLoggedIn,
    postLoaded,
    reactionsLoaded,
    vote,
    post,
    setPost,
    totalVotes,
  ]);

  if (!post) {
    return (
      <div className={styles.loading_container}>
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          width={50}
          className={styles.loading_spinner}
        />
        <div className={styles.loading_text}>Cargando...</div>
      </div>
    );
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
                    src={
                      "http://18.207.127.28/LaTribunaBack/storage/app/public/" +
                      post.image
                    }
                    alt={post.title}
                    layout="responsive"
                    width={1000}
                    height={1000}
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
                      {formatDate(
                        new Date(post.created_at).toLocaleDateString(),
                        true
                      )}
                      <br />
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
              <Comments article={view as string} />
              <Matches />
            </div>
            {/* Sidebar */}
            <div className="col-lg-4 m-15px-tb">
              {/* social share */}
              <SocialShare url={window.location.href} />

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
                          color={vote === option.value ? "#f0903a" : "#535f73"}
                          icon={
                            option.value === "like"
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
                          onChange={() => throttledHandleVote(option.value)}
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
                    <span>
                      {totalVotes > 0
                        ? `${totalVotes} votos en total`
                        : "Vota para ver resultado"}
                    </span>
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
                        src={
                          "http://18.207.127.28/LaTribunaBack/storage/app/public/" +
                          post.image
                        }
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
                          {formatDate(post.created_at, true)}
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

