import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faWhatsapp,
  faTelegramPlane,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./socialshare.module.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const SocialShare = ({ url }: { url: string }) => {
  const socialLinks = [
    {
      icon: faFacebookF,
      link: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      color: "#4267B2",
    },
    {
      icon: faTwitter,
      link: `https://twitter.com/intent/tweet?url=${url}`,
      color: "#1DA1F2",
    },
    {
      icon: faLinkedinIn,
      link: `https://www.linkedin.com/shareArticle?mini=true&url=${url}`,
      color: "#0077B5",
    },
    {
      icon: faWhatsapp,
      link: `https://api.whatsapp.com/send?text=${url}`,
      color: "#25D366",
    },
    {
      icon: faTelegramPlane,
      link: `https://t.me/share/url?url=${url}`,
      color: "#0088cc",
    },
  ];

  return (
    <>
      <div>
        <h3 className={styles.widget_title}>Comparte</h3>
        <div className={styles.social_share_container}>
          <br />
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              className={styles.social_share_icon}
              style={{ color: social.color }} // Color específico para cada icono
              onMouseOver={(e) => (e.currentTarget.style.color = "whitesmoke")}
              onMouseOut={(e) => (e.currentTarget.style.color = social.color)}
            >
              <FontAwesomeIcon
                icon={social.icon as IconProp}
                width={20}
                cursor={"pointer"}
              />
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default SocialShare;
