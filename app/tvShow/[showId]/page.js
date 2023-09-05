"use client"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetTvShowsDetails } from "@/store/Actions/tvShowsAction";

const Page = (props) => {
  const [crew, setcrew] = useState([]);
  const [cast, setcast] = useState([]);

  const video = useRef(null);
  const iframeVideo = useRef(null);

  const { showId } = props.params;
  const { TvShowsDetails } = useSelector((state) => state.tvShowReducer);
  const trailer = TvShowsDetails.videos?.results.find(
    (video) => video.type === "Trailer"
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetTvShowsDetails(showId));
    castNcrew();
  }, []);

  const imgErrorHandler = (e) => {
    e.target.style.display = "none";
  };

  // crew and cast data

  const castNcrew = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${showId}/credits?api_key=11eafabab15fc91d50417227c788a542`
    );
    setcrew(data.crew.filter((crew) => crew.known_for_department === "Creator"));
    setcast(data.cast);
  };

  return (
    <>
    <div
      className="bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${TvShowsDetails.backdrop_path}?api_key=11eafabab15fc91d50417227c788a542)`,
      }}
    >
      <div className="bg-black bg-opacity-75 text-white py-8 px-4 md:py-16 md:px-24 lg:px-32 xl:px-48 relative">
        <div className="container mx-auto flex flex-col lg:flex-row">
          <div className="lg:w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500/${TvShowsDetails.poster_path}?api_key=11eafabab15fc91d50417227c788a542`}
              alt=""
              className="w-full rounded-lg shadow-md"
              onError={imgErrorHandler}
            />
          </div>
          <div className="lg:w-2/3 lg:ml-8">
            <h1 className="text-4xl font-semibold mb-4">
              {TvShowsDetails.name || "Loading..."}
            </h1>
            <p className="text-gray-400 text-sm mb-2">
              {TvShowsDetails.genres?.map((elem) => elem.name).join(", ")}
            </p>
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-2xl font-semibold">
                {Math.floor(TvShowsDetails.vote_average * 10)}
                <sup className="text-xs">%</sup>
              </div>
              <h3 className="text-sm">User Score</h3>
              <div className="flex space-x-4">
                <div>
                  {/* Add your icons here */}
                </div>
              </div>
            </div>
            <div className="text-gray-300 text-sm mb-4">
              {TvShowsDetails.tagline}
            </div>
            <div className="text-gray-400">
              <h3 className="text-xl font-semibold mb-2">Overview</h3>
              <p>{TvShowsDetails.overview}</p>
            </div>
            <div className="space-y-4 mt-4">
              {crew.map((crew, index) => (
                <div key={crew.id}>
                  <h4 className="text-lg font-semibold">{crew.name}</h4>
                  <p className="text-gray-400">
                    {crew.known_for_department}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-gray-900 text-white py-8 px-4 md:py-16 md:px-24 lg:px-32 xl:px-48">
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
    </div>
  </>
  );
};

export default Page;
