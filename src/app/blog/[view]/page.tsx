"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css"; // Asegúrate de que el nombre del archivo CSS/SCSS sea correcto

export default function Page() {
  const { view } = useParams();
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
                  {/* <div className="avatar">
                    <Image
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt="Avatar"
                      width={50}
                      height={50}
                    />
                  </div> */}
                  {/* <label className={styles.calendar}><FontAwesomeIcon icon={faCalendarAlt} width={12} /></label> */}
                  <div className={styles.calendar_text}>
                    <strong>PUBLICADO:</strong> 26 FEB 2020 <br />
                    <strong>NOTA:</strong> CONTENIDO GENERADO POR INTELIGENCIA
                    ARTIFICIAL
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
                        <span>Submit</span> <i className="arrow"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-4 m-15px-tb blog-aside">
            <div className={`${styles.widget} ${styles.widget_author}`}>
              <div className={`${styles.widget_title}`}>
                <h3>Author</h3>
              </div>
              <div className={`${styles.widget_body}`}>
                <div className="media align-items-center">
                  <div className="avatar">
                    <Image
                      src="https://bootdey.com/img/Content/avatar/avatar6.png"
                      alt="Author Avatar"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="media-body">
                    <h6>
                      Hello, Im
                      <br /> Rachel Roth
                    </h6>
                  </div>
                </div>
                <p>
                  I design and develop services for customers of all sizes,
                  specializing in creating stylish, modern websites, web
                  services and online stores
                </p>
              </div>
            </div>
            <div className={`${styles.widget} ${styles.widget_post}`}>
              <div className={`${styles.widget_title}`}>
                <h3>Trending Now</h3>
              </div>
              <div className={`${styles.widget_body}`}>
                {/* Add trending posts here */}
              </div>
            </div>
            <div className={`${styles.widget} ${styles.widget_latest_post}`}>
              <div className={`${styles.widget_title}`}>
                <h3>Latest Post</h3>
              </div>
              <div className={`${styles.widget_body}`}>
                <div className={`${styles.latest_post_aside} media`}>
                  <div className="lpa-left media-body">
                    <div className={`${styles.lpa_title}`}>
                      <h5>
                        <Link href="#">
                          Prevent 75% of visitors from google analytics
                        </Link>
                      </h5>
                    </div>
                    <div className={`${styles.lpa_meta}`}>
                      <Link className="name" href="#">
                        Rachel Roth
                      </Link>
                      <Link className="date" href="#">
                        26 FEB 2020
                      </Link>
                    </div>
                  </div>
                  <div className="lpa-right">
                    <Link href="#">
                      <Image
                        src="https://www.bootdey.com/image/400x200/FFB6C1/000000"
                        alt="Latest Post Image"
                        width={400}
                        height={200}
                      />
                    </Link>
                  </div>
                </div>
                <div className={`${styles.latest_post_aside} media`}>
                  <div className="lpa-left media-body">
                    <div className={`${styles.lpa_title}`}>
                      <h5>
                        <Link href="#">
                          Prevent 75% of visitors from google analytics
                        </Link>
                      </h5>
                    </div>
                    <div className={`${styles.lpa_meta}`}>
                      <Link className="name" href="#">
                        Rachel Roth
                      </Link>
                      <Link className="date" href="#">
                        26 FEB 2020
                      </Link>
                    </div>
                  </div>
                  <div className="lpa-right">
                    <Link href="#">
                      <Image
                        src="https://www.bootdey.com/image/400x200/FFB6C1/000000"
                        alt="Latest Post Image"
                        width={400}
                        height={200}
                      />
                    </Link>
                  </div>
                </div>
                <div className={`${styles.latest_post_aside} media`}>
                  <div className="lpa-left media-body">
                    <div className={`${styles.lpa_title}`}>
                      <h5>
                        <Link href="#">
                          Prevent 75% of visitors from google analytics
                        </Link>
                      </h5>
                    </div>
                    <div className={`${styles.lpa_meta}`}>
                      <Link className="name" href="#">
                        Rachel Roth
                      </Link>
                      <Link className="date" href="#">
                        26 FEB 2020
                      </Link>
                    </div>
                  </div>
                  <div className="lpa-right">
                    <Link href="#">
                      <Image
                        src="https://www.bootdey.com/image/400x200/FFB6C1/000000"
                        alt="Latest Post Image"
                        width={400}
                        height={200}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.widget} ${styles.widget_tags}`}>
              <div className={`${styles.widget_title}`}>
                <h3>Tags</h3>
              </div>
              <div className={`${styles.widget_body}`}>
                <Link href="#">Lifestyle</Link>
                <Link href="#">Travel</Link>
                <Link href="#">Fashion</Link>
                <Link href="#">Design</Link>
                <Link href="#">Web Design</Link>
                <Link href="#">Marketing</Link>
                <Link href="#">Business</Link>
                <Link href="#">News</Link>
                <Link href="#">Events</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
