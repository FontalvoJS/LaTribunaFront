import React, { useMemo } from "react";
import styles from "./matches.module.css";
import { useSession } from "../../context/session";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
interface Match {
  id: number;
  date: string;
  home: {
    name: string;
  };
  away: {
    name: string;
  };
  venue_name: string;
}

const CarouselComponent: React.FC<{ matches: { [key: number]: Match } }> = ({
  matches,
}) => {
  const { teams } = useSession();
  const matchArray = Object.values(matches);

  const normalizeString = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, "")
      .trim();

  const teamLogoMap = useMemo(() => {
    return teams.reduce((acc, team) => {
      const normalizedTeamName = normalizeString(team.text);
      acc[normalizedTeamName] = team.image;
      return acc;
    }, {} as Record<string, string>);
  }, [teams]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "P.M." : "A.M.";

    return `${day} ${month} ${year} - ${hours}:${minutes} ${ampm}`;
  };

  const getTeamLogo = (teamName: string) => {
    const normalizedTeamName = normalizeString(teamName);

    if (teamLogoMap[normalizedTeamName]) {
      return teamLogoMap[normalizedTeamName];
    }

    const matchedLogo = Object.keys(teamLogoMap).find((key) =>
      normalizedTeamName.includes(key)
    );
    return matchedLogo ? teamLogoMap[matchedLogo] : "default.png";
  };

  return (
    <div className={styles.comming_soon + " container-fluid"}>
      <h2 className={styles.coming_soon_title + " pt-4"}>Próximos partidos</h2>
      <div
        id="matchesCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {matchArray.length > 0 &&
            Array.from({ length: Math.ceil(matchArray.length / 4) }, (_, i) => (
              <div
                className={`carousel-item${i === 0 ? " active" : ""}`}
                key={i}
              >
                <div className="row">
                  {matchArray.slice(i * 4, (i + 1) * 4).map((match) => (
                    <div
                      className="col-12 col-md-6 col-lg-3 mb-4"
                      key={match.id}
                    >
                      <div
                        className={`card mx-2 shadow-sm border-0 ${styles.card}`}
                        style={{ height: "250px" }}
                      >
                        <small className={`text-center ${styles.matchDate}`}>
                          <FontAwesomeIcon icon={faCalendarAlt} width={10} style={{marginRight: "5px", position:"relative", bottom:"2px"}} /> 
                          {formatDate(match.date)}
                        </small>
                        <div
                          className={`card-body d-flex flex-column align-items-center justify-content-between p-2`}
                        >
                          <div
                            className={`d-flex justify-content-between w-100 mb-2 ${styles.team}`}
                          >
                            <div className="text-center">
                              <Image
                                src={`/images/clubes/${getTeamLogo(
                                  match.home.name
                                )}`}
                                alt={match.home.name}
                                width={50}
                                height={50}
                              />
                              <p className={`text-light ${styles.teamName}`}>
                                {match.home.name}
                              </p>
                            </div>
                            <div className="text-center">
                              <Image
                                src={`/images/clubes/${getTeamLogo(
                                  match.away.name
                                )}`}
                                alt={match.away.name}
                                width={50}
                                height={50}
                              />
                              <p className={`text-light ${styles.teamName}`}>
                                {match.away.name}
                              </p>
                            </div>
                          </div>
                          <p className={`text-center ${styles.competition} `}>
                           Estadio {match.venue_name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
        <a
          className="carousel-control-prev"
          href="#matchesCarousel"
          role="button"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#matchesCarousel"
          role="button"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>
    </div>
  );
};

export default CarouselComponent;
