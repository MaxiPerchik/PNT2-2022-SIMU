import MovieList from "./MovieList";
import { useState, useEffect } from "react";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Función para cargar las películas de una página específica.
    const loadMovies = async (page) => {
      try {
        const response = await fetch(`http://localhost:4000/api/movies?pageSize=${pageSize}&page=${page}`);
        if (response.ok) {
          const data = await response.json();
          setMovies(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Función para obtener el número total de páginas.
    const fetchTotalPages = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/movies`);
        if (response.ok) {
          const data = await response.json();
          setTotalPages(Math.ceil(data.length / pageSize));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTotalPages();
    loadMovies(currentPage);
  }, [currentPage, pageSize]);

  // Función para cambiar la página actual.
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Determina el rango de botones de página visibles.
  const VISIBLE_RANGE = 5; 

  return (
    <div>
      <MovieList Movies={movies} />
      <div className="pagination" style={{display:"flex",justifyContent:"center"}}>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          if (page === 1 || page === totalPages || (page >= currentPage - VISIBLE_RANGE && page <= currentPage + VISIBLE_RANGE)) {
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={page === currentPage}
              >
                {page}
              </button>
            );
          } else if (page === currentPage + VISIBLE_RANGE + 1) {
            return (
              <span key="ellipsis">...</span>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default MoviePage;
