"use client"
import axios from "axios";
import { asyncGetMoviesDetails } from "@/store/Actions/moviesAction";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import YouTubeIframeLoader from "youtube-iframe";

const Page = (props) => {
  const [crew, setcrew] = useState([]);
  const [cast, setcast] = useState([]);

  const video = useRef(null);
  const iframeVideo = useRef(null);

  const { movieId } = props.params;
  const { MovieDetails } = useSelector((state) => state.movieReducer);
  const trailer = MovieDetails.videos?.results.find((video) => video.type === "Trailer");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetMoviesDetails(movieId));
    castNcrew();
  }, []);

  // convert minutes into hours

  const convertToHoursMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  };

  const trailerOpenHandler = () => {
    video.current.style.display = "flex";
    iframeVideo.current.src = `https://www.youtube.com/embed/${trailer?.key}`;
  };

  const trailerCloseHandler = () => {
    video.current.style.display = "none";
    iframeVideo.current.src = "#";
  };

  const errorHandler = () => {
    iframeVideo.current.style.display = "none";
  };

  const imgErrorHandler = (e) => {
    e.target.style.display = "none";
  };

  // crew and cast data

  const castNcrew = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=11eafabab15fc91d50417227c788a542`
    );
    setcrew(
      data.crew.filter((crew) => crew.job === "Writer" || crew.job === "Director")
    );
    setcast(data.cast);
  };

  return (
    <>
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${MovieDetails.backdrop_path}?api_key=11eafabab15fc91d50417227c788a542')`,
        }}
      >
        <div className="bg-black bg-opacity-70 text-white py-4">
          <div className="container mx-auto flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4">
              <img
                src={`https://image.tmdb.org/t/p/w500//${MovieDetails.poster_path}?api_key=11eafabab15fc91d50417227c788a542`}
                alt=""
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="md:w-3/4">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {MovieDetails.title}
              </h1>
              <div className="text-gray-400 text-sm mb-4">
                {MovieDetails.release_date} <span className="mx-2">&#183;</span>{" "}
                {MovieDetails.genres?.map((elem) => elem.name).join(", ")}{" "}
                <span className="mx-2">&#183;</span>{" "}
                {convertToHoursMinutes(MovieDetails.runtime)}
              </div>
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 text-white py-2 px-4 rounded-md font-semibold mr-4">
                  {Math.floor(MovieDetails.vote_average * 10)} <sup>%</sup>
                </div>
                {/* Rest of the icons */}
              </div>
              <div className="mb-4">{MovieDetails.tagline}</div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Overview</h3>
                <p>{MovieDetails.overview}</p>
              </div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Crew</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {crew.map((crew, index) => (
                    <div key={crew.id}>
                      <h4 className="font-semibold">{crew.name}</h4>
                      <p>{crew.job}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref={video} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50 hidden">
        <div className="relative w-full h-0 pb-9/16">
          {/* Rest of the code for the video player */}
        </div>
      </div>
      <div className="bg-gray-900 p-5 overflow-x-auto flex flex-wrap text-white py-8">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl py-5 font-semibold">Top Billed Cast</h2>
            <div className="flex flex-nowrap overflow-x-auto">
              {cast.map((casts, i) => (
                <div key={cast.id} className="flex-shrink-0 mr-4">
                  <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <img
                      onError={imgErrorHandler}
                      src={`https://image.tmdb.org/t/p/w200/${casts.profile_path}?api_key=11eafabab15fc91d50417227c788a542`}
                      alt=""
                      className="w-32 h-40 object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <h4 className="text-lg font-semibold">{casts.name}</h4>
                    <h5 className="text-gray-400 text-sm">{casts.character}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-4 sm:mb-0">
              <div className="font-semibold">Original Title</div>
              <p>{MovieDetails.original_title}</p>
            </div>
            <div className="mb-4 sm:mb-0">
              <div className="font-semibold">Status</div>
              <p>{MovieDetails.status}</p>
            </div>
            <div className="mb-4 sm:mb-0">
              <div className="font-semibold">Budget</div>
              <p>{"$ " + MovieDetails.budget}</p>
            </div>
            <div className="mb-4 sm:mb-0">
              <div className="font-semibold">Revenue</div>
              <p>{"$ " + MovieDetails.revenue}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
