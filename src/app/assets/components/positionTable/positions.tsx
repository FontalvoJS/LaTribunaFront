import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "./positions.module.css"; // Importamos el archivo de estilos SCSS
import MatchCarousel from "../matches/matches";
// Definimos la interfaz para los datos de la tabla
interface Team {
  id: string;
  name: string;
  teamLogo: string; // Debe ser solo el nombre del archivo sin extensión
  points: number;
  matchesPlayed: number;
  matchesWon: number;
  matchesDrawn: number;
  matchesLost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

// Definimos las props que recibirá nuestro componente
interface LeagueTableProps {}

// Componente para mostrar la tabla de posiciones
const LeagueTable: React.FC<LeagueTableProps> = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Función para obtener los datos de la API
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          "https://wopta.dimayor.com.co/posicionesC24"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();

        // Convertimos los datos de la API al formato esperado
        const formattedTeams: Team[] = data.map((team: any) => ({
          id: team.id, // 'id' as provided
          name: team.name, // 'name' as provided
          points: team.points || 0, // 'points' as provided
          matchesPlayed: team.matchesPlayed || 0, // 'matchesPlayed' as provided
          matchesWon: team.matchesWon || 0, // 'matchesWon' as provided
          matchesDrawn: team.matchesDrawn || 0, // 'matchesDrawn' as provided
          matchesLost: team.matchesLost || 0, // 'matchesLost' as provided
          goalsFor: team.goalsFor || 0, // 'goalsFor' as provided
          goalsAgainst: team.goalsAgainst || 0, // 'goalsAgainst' as provided
          goalDifference: team.goalDifference || 0, // 'goalDifference' as provided
        }));

        setTeams(formattedTeams);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className={styles.table_card}>
            <h2 className={styles.title + " text-center"}>
              POSICIONES LIGA BETPLAY
            </h2>
            <div className={styles.border}> </div>
            <table
              className={`table table-striped table-no-border table-hover`}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Equipo</th>
                  <th></th>
                  <th>PT</th>
                  <th>PJ</th>
                  <th>G</th>
                  <th>E</th>
                  <th>P</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr key={team.id}>
                    <td>{index + 1}</td>
                    <td>
                      <Image
                        src={`https://dimayor.com.co/calendar_soluciones/menuDimayor/l56187c0rh.execute-api.us-east-1.amazonaws.com/Escudos/${team.id}.png`}
                        alt={team.name}
                        height={20}
                        width={20}
                      />
                    </td>
                    <td> {team.name}</td>
                    <td>{team.points}</td>
                    <td>{team.matchesPlayed}</td>
                    <td>{team.matchesWon}</td>
                    <td>{team.matchesDrawn}</td>
                    <td>{team.matchesLost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <MatchCarousel />
        </div>
      </div>
    </div>
  );
};

export default LeagueTable;
