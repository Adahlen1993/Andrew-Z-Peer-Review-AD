import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"


export default function MovieDescription (){
    const movies = useSelector(store => store.movieDescriptionReducer);

    const { id } = useParams();

    const history = useHistory();

    const dispatch = useDispatch();

    const backToMain = (event) => {
        history.push('/')
    }

    useEffect(() => {
        dispatch({
            type: 'FETCH_MOVIE_DESCRIPTION',

            payload: id,
        })
        console.log(id)
        console.log('movies dot id: ', movies)
    }, [])


    return (
        <>
        <section id="card" data-testid="movieDetails" >
                <div key={movies.id}>
                <h4>{movies.movie_title}</h4>
                    <img src={movies.movie_poster} alt={movies.movie_title} />
                    <h4>{movies.genres}</h4>
                    <h5  className="movieDescription">Description: {movies.movie_description}</h5>
                </div>
            <button id="toListBtn" data-testid="toList" onClick={backToMain}>Back to Main</button>
            <p></p>
      </section>
        </>
    )
}