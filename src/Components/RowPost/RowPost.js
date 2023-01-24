import { useEffect, useState } from "react";
import Youtube from "react-youtube";
import "./RowPost.css";
import axios from "../axios";
import { API_KEY, imageUrl } from "../../constants/constants";
function RowPost(props) {
    const [movies, setMovies] = useState([]);
    const [urlId, setId] = useState("");

    useEffect(() => {
        axios
            .get(props.url)
            .then((res) => {
                // console.log(res.data)
                setMovies(res.data.results);
            })
            .catch((err) => {
                alert("Network Error");
            });
    }, []);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };
    const handleMovie = (id) => {
        console.log(id);
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
            if (response.data.results.length !== 0) {
                setId(response.data.results[0].key);
            } else {
                console.log("Array is not empty");
            }
        });
    };
    return (
        <div className="row">
            <h2 className="rowtitle">{props.title}</h2>
            <div className="posters">
                {movies.map((Obj) => (
                    <div>
                        <img
                            onClick={() => handleMovie(Obj.id)}
                            className={props.isSize ? "smallPoster" : "poster"}
                            src={`${imageUrl + Obj.backdrop_path}`}
                            alt="images"
                        />
                        {Obj.title}
                    </div>
                ))}
            </div>
            {urlId && (
                <div className="youtube" onClick={()=>{setId('')}}>
                    <Youtube className="youtubeModule" opts={opts} videoId={urlId} />
                </div>
            )}
        </div>
    );
}

export default RowPost;
