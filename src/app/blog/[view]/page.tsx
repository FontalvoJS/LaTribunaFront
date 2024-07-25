"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css"; // Asegúrate de que el nombre del archivo CSS/SCSS sea correcto
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faPoll, faList } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getPostBySlug } from "@/app/assets/services/posts";
export default function Page() {
  const { view } = useParams();
  const [vote, setVote] = useState<string | null>(null);
  const handleVote = (option: string) => {
    setVote(option);
  };
  const latestPosts = [
    {
      id: 1,
      title: "Post Title 1",
      date: "July 20, 2024",
      imageUrl: "https://via.placeholder.com/50", // Placeholder image URL
    },
    {
      id: 2,
      title: "Post Title 2",
      date: "July 18, 2024",
      imageUrl: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      title: "Post Title 3",
      date: "July 15, 2024",
      imageUrl: "https://via.placeholder.com/50",
    },
    {
      id: 4,
      title: "Post Title 4",
      date: "July 10, 2024",
      imageUrl: "https://via.placeholder.com/50",
    },
    {
      id: 5,
      title: "Post Title 5",
      date: "July 5, 2024",
      imageUrl: "https://via.placeholder.com/50",
    },
  ];

  const pollOptions = [
    { value: "Si", label: "Si", percentage: 80 },
    { value: "No", label: "No", percentage: 20 },
  ];
  const categories = [
    { name: "Liga Colombiana Betplay", slug: "betplay" },
    { name: "Liga Premier", slug: "premier" },
    { name: "UEFA", slug: "uefa" },
    { name: "Farandula", slug: "farandula" },
    { name: "Rumores", slug: "rumores" },
    // Agrega más categorías según sea necesario
  ];
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostBySlug(view);
        console.log(post);
      } catch (error) {
        console.error(error);
      }
    };
    if (view.length > 0) {
      fetchPost();
    }
  }, [view]);
  return (
    <div className={`${styles.blog_single} gray-bg`}>
      <div className="container">
        <div className="row align-items-start">
          <div className="col-lg-8 m-15px-tb">
            <article className={`${styles.article}`}>
              <div className={`${styles.article_img}`}>
                <Image
                  src="https://placehold.co/600x400"
                  alt="Article Image"
                  layout="responsive"
                  width={600}
                  height={400}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className={`${styles.article_title}`}>
                <h6>
                  <Link href="#">Lifestyle</Link>
                </h6>
                <h2>They Now Bade Farewell To The Kind But Unseen People</h2>
                <div className="media">
                  <div className={styles.calendar_text}>
                    <strong>PUBLICADO:</strong> 26 FEB 2020 <br />
                    <strong>NOTA:</strong> CONTENIDO GENERADO POR INTELIGENCIA
                    ARTIFICIAL <br />
                    <strong>AUTOR:</strong> VALDERRAMA <br />
                    <strong>INFORMACIÓN VERIFICADA:</strong> SÍ
                  </div>
                </div>
              </div>
              <div className={`${styles.article_content}`}>
                <p>
                  Aenean eleifend ante maecenas pulvinar montes lorem et pede
                  dis dolor pretium donec dictum. Vici consequat justo enim.
                  Venenatis eget adipiscing luctus lorem. Adipiscing veni amet
                  luctus enim sem libero tellus viverra venenatis aliquam.
                  Commodo natoque quam pulvinar elit.
                </p>
                <p>
                  Eget aenean tellus venenatis. Donec odio tempus. Felis arcu
                  pretium metus nullam quam aenean sociis quis sem neque vici
                  libero. Venenatis nullam fringilla pretium magnis aliquam nunc
                  vulputate integer augue ultricies cras. Eget viverra feugiat
                  cras ut. Sit natoque montes tempus ligula eget vitae pede
                  rhoncus maecenas consectetuer commodo condimentum aenean.
                </p>
                <h4>What are my payment options?</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <blockquote>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam.
                  </p>
                  <p className="blockquote-footer">
                    Someone famous in{" "}
                    <cite title="Source Title">Dick Grayson</cite>
                  </p>
                </blockquote>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
              <div className={`${styles.nav} ${styles.tag_cloud}`}>
                <Link href="#">Design</Link>
                <Link href="#">Development</Link>
                <Link href="#">Travel</Link>
                <Link href="#">Web Design</Link>
                <Link href="#">Marketing</Link>
                <Link href="#">Research</Link>
                <Link href="#">Managment</Link>
              </div>
            </article>
            <div className={`${styles.contact_form} ${styles.article_comment}`}>
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
          </div>
          <div className="col-lg-4 m-15px-tb">
            {/*  ENCUESTA */}
            <div
              className={`bg_side_color ${styles.widget} ${styles.widget_poll}`}
            >
              <h5 className={styles.widget_title}>
                ¿Te gustó el artículo?
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
              <>Esta breve encuesta nos ayuda a mejorar el contenido.</>
              <form
              // onSubmit={(e) => {
              //   e.preventDefault();
              //   handleVote(vote);
              // }}
              >
                {pollOptions.map((option) => (
                  <div key={option.value} className={styles.poll_option}>
                    <label>
                      <input
                        type="radio"
                        name="vote"
                        value={option.value}
                        checked={vote === option.value}
                        onChange={() => setVote(option.value)}
                      />
                      {option.label}
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
                <button type="button" className="btn btn-outline-success btn-block w-100">
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
                />{" "}
                Valderrama
              </p>
              <hr />
              <p className={styles.small_desc}>
                <strong>Detalles del personaje:</strong> Es un periodista
                deportivo colombiano y ficticio, respetado por sus análisis
                incisivos y contundentes sobre el fútbol nacional e
                internacional. Su criterio es fuerte e imparcial, no tolera las
                mentiras de los periodistas comerciales. Su estilo auténtico y
                directo resuena profundamente con los aficionados, quienes
                valoran su honestidad y compromiso con la verdad.
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
                {latestPosts.map((post) => (
                  <div key={post.id} className={styles.latest_post_item}>
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      width={50}
                      height={50}
                      className={styles.latest_post_image}
                    />
                    <div className={styles.latest_post_content}>
                      <h4 className={styles.latest_post_title}>{post.title}</h4>
                      <p className={styles.latest_post_date}>{post.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/*  CATEGORIAS */}
            <div className={styles.categoriesContainer}>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  className={styles.categoryItem}
                  href={`/category/${category.slug}`}
                >
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
