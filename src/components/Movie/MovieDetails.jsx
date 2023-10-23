import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/movies`);
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        const selectedMovie = data.find((m) => m._id === id);
        if (!selectedMovie) {
          setError("La película no se encontró.");
        } else {
          setMovie(selectedMovie);
        }
      } catch (error) {
        setError("Ocurrió un error al cargar la película.");
      }
    };

    loadMovie();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <img src={movie.poster} alt={movie.poster} style={{ height: "350px" }} />
      <h3>{movie.title}</h3>
    </>
  );
};

export default MovieDetails;
