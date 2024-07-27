import React, { useEffect, useMemo, useState } from "react";
import styles from "./matches.module.css";
import { useSession } from "../../context/session";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "@/app/assets/utils/format_date";
import { NewMatch, Match } from "@/app/assets/types/types";

const CarouselComponent: React.FC = () => {
  const { teams } = useSession();
  const [matches, setMatches] = useState<NewMatch[]>([]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://wopta.dimayor.com.co/clausura24?fecha=3"
      );
      const data = await response.json();
      if (data) {
        setMatches(data);
      } else {
        setMatches([]);
      }
    };

    fetchData();
  }, []);

  // Transformamos el nuevo objeto al formato requerido por el componente
  const matchArray: Match[] = matches.flatMap((day) =>
    day.matches.map((match) => ({
      id: match.id,
      date: match.time,
      home: {
        name: match.home,
        logo: match.homeLogo,
      },
      away: {
        name: match.away,
        logo: match.awayLogo,
      },
      venue_name: match.venue,
      isPlayedOrPlaying: match.isPlayedOrPlaying,
      matchStatus: match.matchStatus,
      referee: match.referee,
      goalsHome: match.goalsHome,
      goalsAway: match.goalsAway,
      hasPenalties: match.hasPenalties,
      channelImage: match.channelImage,
      hasVideo: match.hasVideo,
      yellowCardsHome: match.yellowCardsHome,
      redCardsHome: match.redCardsHome,
      yellowCardsAway: match.yellowCardsAway,
      redCardsAway: match.redCardsAway,
      goalscorersHome: match.goalscorersHome,
      goalscorersAway: match.goalscorersAway,
      isPlaying: match.isPlaying,
    }))
  );

  // Normalización de nombres de equipos para los logos
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

  const handleCardClick = (id: string) => {
    setExpandedCard((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className={styles.comming_soon + " container-fluid"}>
  <h2 className={styles.coming_soon_title + " pt-4"}>Próximos partidos</h2>
  <div className={`overflow-auto ${styles.custom_scroll}`}>
    <div className="d-flex">
      {matchArray.length > 0 &&
        matchArray.map((match) => (
          <div
            className="col-12 p-1 col-md-6 col-lg-3 mb-4"
            key={match.id}
          >
            <div
              className={`card mx-2 shadow-sm border-0 ${
                styles.card
              } ${
                match.isPlayedOrPlaying
                  ? styles.played
                  : match.matchStatus === "Fixture"
                  ? styles.notStarted
                  : ""
              }`}
              style={{
                height: expandedCard === match.id ? "auto" : "250px",
              }}
            >
              <small className={`text-center ${styles.matchDate}`}>
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  width={10}
                  style={{
                    marginRight: "5px",
                    position: "relative",
                    bottom: "2px",
                  }}
                />
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
                    <span>1</span>
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
                <p
                  onClick={() => handleCardClick(match.id)}
                  className={`text-center ${
                    match.isPlayedOrPlaying === true
                      ? styles.competition_played
                      : styles.competition
                  }`}
                >
                  {expandedCard === match.id
                    ? "Cerrar"
                    : match.isPlayedOrPlaying
                    ? "Ver resultados"
                    : "Detalles del partido"}
                </p>
                {expandedCard === match.id && (
                  <div className={styles.cardDetails}>
                    {match.isPlayedOrPlaying ? (
                      <>
                        <div className={styles.detailsTable}>
                          <div className={styles.detailsRow}>
                            <div className={styles.detailsKey}>
                              Árbitro:
                            </div>
                            <div className={styles.detailsValue}>
                              {match.referee}
                            </div>
                          </div>
                          <div className={styles.detailsRow}>
                            <div className={styles.detailsKey}>
                              Goles Local:
                            </div>
                            <div className={styles.detailsValue}>
                              {match.goalsHome}
                            </div>
                          </div>
                          <div className={styles.detailsRow}>
                            <div className={styles.detailsKey}>
                              Goles Visitante:
                            </div>
                            <div className={styles.detailsValue}>
                              {match.goalsAway}
                            </div>
                          </div>
                          <div className={styles.detailsRow}>
                            <div className={styles.detailsKey}>
                              Penales:
                            </div>
                            <div className={styles.detailsValue}>
                              {match.hasPenalties ? "Sí" : "No"}
                            </div>
                          </div>
                          {/* <div className={styles.detailsRow}>
                          <div className={styles.detailsKey}>Canal:</div>
                          <div className={styles.detailsValue}>{match.channelImage ? "Disponible" : "No disponible"}</div>
                        </div> */}
                          {/* <div className={styles.detailsRow}>
                          <div className={styles.detailsKey}>Video:</div>
                          <div className={styles.detailsValue}>{match.hasVideo ? "Disponible" : "No disponible"}</div>
                        </div> */}
                          <div className={styles.detailsRow}>
                            <div className={styles.detailsKey}>
                              Tarjetas Amarillas Locales:
                            </div>
                            <div className={styles.detailsValue}>
                              {match.yellowCardsHome?.length
                                ? match.yellowCardsHome
                                    .map((card) => "🟨")
                                    .join(" ")
                                : "Ninguna"}
                            </div>
                          </div>
                          <div className={styles.detailsRow}>
                            <div className={styles.detailsKey}>
                              Tarjetas Rojas Locales:
                            </div>
                            <div className={styles.detailsValue}>
                              {match.redCardsHome?.length
                                ? match.redCardsHome
                                    .map((card) => "🟥")
                                    .join(" ")
                                : "Ninguna"}
                            </div>
                          </div>
                          <div className={styles.detailsRow}>
                            <div className={styles.detailsKey}>
                              Tarjetas Amarillas Visitantes:
                            </div>
                            <div className={styles.detailsValue}>
                              {match.yellowCardsAway?.length
                                ? match.yellowCardsAway
                                    .map((card) => "🟨")
                                    .join(" ")
                                : "Ninguna"}
                            </div>
                          </div>
                          <div className={styles.detailsRow}>
                            <div className={styles.detailsKey}>
                              Tarjetas Rojas Visitantes:
                            </div>
                            <div className={styles.detailsValue}>
                              {match.redCardsAway?.length
                                ? match.redCardsAway
                                    .map((card) => "🟥")
                                    .join(" ")
                                : "Ninguna"}
                            </div>
                          </div>
                          <div className={styles.detailsRow}>
                            <div className={styles.detailsKey}>
                              Goleadores Locales:
                            </div>
                            <div className={styles.detailsValue}>
                              {match.goalscorersHome?.length
                                ? match.goalscorersHome
                                    .map(
                                      (scorer) =>
                                        `${scorer.playerName} (${scorer.minute}')`
                                    )
                                    .join(", ")
                                : "Ninguno"}
                            </div>
                          </div>
                          <div className={styles.detailsRow}>
                            <div className={styles.detailsKey}>
                              Goleadores Visitantes:
                            </div>
                            <div className={styles.detailsValue}>
                              {match.goalscorersAway?.length
                                ? match.goalscorersAway
                                    .map(
                                      (scorer) =>
                                        `${scorer.playerName} (${scorer.minute}')`
                                    )
                                    .join(", ")
                                : "Ninguno"}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={styles.detailsTable}>
                          <div className={styles.detailsRow}>
                            <div className={styles.detailsKey}>
                              Árbitro:
                            </div>
                            <div className={styles.detailsValue}>
                              {match.referee}
                            </div>
                          </div>
                          <div className={styles.detailsRow}>
                            <div className={styles.detailsKey}>
                              Estadio:
                            </div>
                            <div className={styles.detailsValue}>
                              {match.venue_name}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  </div>
</div>

  );
};

export default CarouselComponent;
