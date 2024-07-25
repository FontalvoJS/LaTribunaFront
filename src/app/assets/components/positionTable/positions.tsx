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
const matches = {
  "2463286": {
    id: 2463286,
    date: "2024-08-24 18:00:00",
    minute: {
      timestamp: "2024-07-25 15:13:38",
      value: 0,
      label: "0",
    },
    period: "TBC",
    venue_name: "Atanasio Girardot",
    official: null,
    home: {
      id: 2302,
      name: "Atlético Nacional",
      score: 0,
      pen_score: 0,
    },
    away: {
      id: 2475,
      name: "Deportivo Cali",
      score: 0,
      pen_score: 0,
    },
  },
  "2463287": {
    id: 2463287,
    date: "2024-08-24 18:00:00",
    minute: {
      timestamp: "2024-07-25 15:13:38",
      value: 0,
      label: "0",
    },
    period: "TBC",
    venue_name: "Departamental Libertad",
    official: null,
    home: {
      id: 2287,
      name: "Deportivo Pasto",
      score: 0,
      pen_score: 0,
    },
    away: {
      id: 2669,
      name: "Atlético Bucaramanga",
      score: 0,
      pen_score: 0,
    },
  },
  "2463288": {
    id: 2463288,
    date: "2024-08-24 18:00:00",
    minute: {
      timestamp: "2024-07-25 15:13:38",
      value: 0,
      label: "0",
    },
    period: "TBC",
    venue_name: "Nemesio Camacho (El Campin)",
    official: null,
    home: {
      id: 2681,
      name: "Independiente Santa Fe",
      score: 0,
      pen_score: 0,
    },
    away: {
      id: 2675,
      name: "Deportivo Pereira",
      score: 0,
      pen_score: 0,
    },
  },
  "2463289": {
    id: 2463289,
    date: "2024-08-24 18:00:00",
    minute: {
      timestamp: "2024-07-25 15:13:38",
      value: 0,
      label: "0",
    },
    period: "TBC",
    venue_name: "Manuel Murillo Toro",
    official: null,
    home: {
      id: 2674,
      name: "Deportes Tolima",
      score: 0,
      pen_score: 0,
    },
    away: {
      id: 2678,
      name: "Junior",
      score: 0,
      pen_score: 0,
    },
  },
  "2463290": {
    id: 2463290,
    date: "2024-08-24 18:00:00",
    minute: {
      timestamp: "2024-07-25 15:13:38",
      value: 0,
      label: "0",
    },
    period: "TBC",
    venue_name: "Palogrande",
    official: null,
    home: {
      id: 2286,
      name: "Once Caldas",
      score: 0,
      pen_score: 0,
    },
    away: {
      id: 7683,
      name: "Jaguares de Córdoba",
      score: 0,
      pen_score: 0,
    },
  },
  "2463291": {
    id: 2463291,
    date: "2024-08-24 18:00:00",
    minute: {
      timestamp: "2024-07-25 15:13:38",
      value: 0,
      label: "0",
    },
    period: "TBC",
    venue_name: "Alberto Grisales",
    official: null,
    home: {
      id: 7081,
      name: "Águilas Doradas",
      score: 0,
      pen_score: 0,
    },
    away: {
      id: 2680,
      name: "Millonarios",
      score: 0,
      pen_score: 0,
    },
  },
  "2463292": {
    id: 2463292,
    date: "2024-08-24 18:00:00",
    minute: {
      timestamp: "2024-07-25 15:13:38",
      value: 0,
      label: "0",
    },
    period: "TBC",
    venue_name: "Armando Maestre Pavajeau",
    official: null,
    home: {
      id: 7585,
      name: "Alianza",
      score: 0,
      pen_score: 0,
    },
    away: {
      id: 2671,
      name: "Boyacá Chicó",
      score: 0,
      pen_score: 0,
    },
  },
  "2463293": {
    id: 2463293,
    date: "2024-08-24 18:00:00",
    minute: {
      timestamp: "2024-07-25 15:13:38",
      value: 0,
      label: "0",
    },
    period: "TBC",
    venue_name: "La Independencia",
    official: null,
    home: {
      id: 7082,
      name: "Patriotas Boyacá",
      score: 0,
      pen_score: 0,
    },
    away: {
      id: 2679,
      name: "La Equidad",
      score: 0,
      pen_score: 0,
    },
  },
  "2463294": {
    id: 2463294,
    date: "2024-08-24 18:00:00",
    minute: {
      timestamp: "2024-07-25 15:13:38",
      value: 0,
      label: "0",
    },
    period: "TBC",
    venue_name: "Metropolitano de Techo",
    official: null,
    home: {
      id: 7682,
      name: "Fortaleza CEIF",
      score: 0,
      pen_score: 0,
    },
    away: {
      id: 2677,
      name: "Independiente Medellín",
      score: 0,
      pen_score: 0,
    },
  },
  "2463295": {
    id: 2463295,
    date: "2024-07-25 16:00:00",
    minute: {
      timestamp: "2024-07-25 15:13:38",
      value: 0,
      label: "0",
    },
    period: "PreMatch",
    venue_name: "Francisco Rivera Escobar",
    official: "José Alexander Ortiz Novoa",
    home: {
      id: 2288,
      name: "América de Cali",
      score: 0,
      pen_score: 0,
    },
    away: {
      id: 2676,
      name: "Envigado",
      score: 0,
      pen_score: 0,
    },
  },
};
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
    <div className="container-fluid">
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
          <MatchCarousel matches={Object.values(matches)} />
        </div>
      </div>
    </div>
  );
};

export default LeagueTable;
