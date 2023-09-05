"use client"

import {
  asyncGetPopularMovies,
  asyncGetTrendingMovies,
  asyncGetMoviesDetails,
} from "@/store/Actions/moviesAction";
import { removeerrors } from "@/store/Reducers/movieReducer";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getAsyncTvShows } from "@/store/Actions/tvShowsAction";

const Page = () => {
  const [search, setsearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { Movies, TrendingMovies, errors } = useSelector(
    (state) => state.movieReducer
  );
  const { TvShows } = useSelector((state) => state.tvShowReducer);
  const dispatch = useDispatch();
  const router = useRouter();

  if (errors.length > 0) {
    errors.map((e, i) => {
      toast.error(e);
    });
    dispatch(removeerrors());
  }

  // convert numeric date into alphanumeric function starts
  function convertNumericToDate(numericDate) {
    // Parse the numeric date into a Date object
    const dateObj = new Date(numericDate);

    // Define arrays for month names and suffixes
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const suffixes = ["st", "nd", "rd", "th"];

    // Get the day, month, and year components
    const day = dateObj.getDate();
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    // Determine the day suffix (st, nd, rd, th)
    let suffix;
    if (day >= 11 && day <= 13) {
      suffix = "th";
    } else {
      const index = Math.min(day % 10, 3);
      suffix = suffixes[index];
    }

    // Construct the alphanumeric date string
    const alphanumericDate = `${month} ${day}${suffix}, ${year}`;
    return alphanumericDate;
  }

  const togglerDiv = useRef(null);
  const togglerText = useRef(null);

  let flag = 0;
  const toggleHandler = () => {
    if (flag === 0) {
      flag = 1;
      togglerDiv.current.style.width = "9vmax";
      togglerDiv.current.style.left = "48%";
      togglerText.current.textContent = "This Week";
    } else {
      flag = 0;
      togglerDiv.current.style.width = "8vmax";
      togglerDiv.current.style.left = "0%";
      togglerText.current.textContent = "Today";
    }
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(asyncGetTrendingMovies()).then(() => {
      setIsLoading(false);
    });
    // dispatch(getAsyncTvShows())
  }, []);

  // search function
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search/${search}`);
  };

  return (
    <>
      <div
        className="bg-cover bg-center bg-no-repeat h-96 relative"
        style={{
          backgroundImage:
            `url(https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/hoVj2lYW3i7oMd1o7bPQRZd1lk1.jpg)`,
        }}
      >
        <div className="bg-black bg-opacity-70 h-full flex flex-col justify-center items-center">
          <div className="container mx-auto text-center py-8 px-4">
            <h1 className="text-4xl font-bold text-white">Welcome.</h1>
            <h4 className="text-xl text-white">
              Millions of movies, TV shows, and people to discover. Explore now.
            </h4>
            <div className="mt-4">
              <form onSubmit={submitHandler} className="flex">
                <input
                  onChange={(e) => setsearch(e.target.value)}
                  value={search}
                  type="text"
                  placeholder="Search for a movie, TV show, person....."
                  className="w-full px-4 py-2 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-500 text-black"
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-12 p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Trending</h2>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {!isLoading ? TrendingMovies.map((movie, index) => {
            return (
              <div key={movie.id} className="space-y-2">
                <Link href={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}?api_key=11eafabab15fc91d50417227c788a542`}
                    alt=""
                    className="w-full h-auto rounded-lg cursor-pointer"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-blue-500 font-semibold">
                      {Math.floor(movie.vote_average * 10)}%
                    </span>
                    <span className="text-gray-400 text-sm">
                      {convertNumericToDate(movie.release_date)}
                    </span>
                  </div>
                  <h1 className="text-lg font-semibold leading-tight cursor-pointer hover:text-blue-500">
                    {movie.title}
                  </h1>
                </Link>
              </div>

            );
          }) : (
              <div  className="pt-5 columns-1 md:columns-4 w-screen px-5">
                <div class="animate-pulse space-y-2 h-64 ">
                  <div class="bg-gray-200  h-72 "></div>
                </div>

              </div>
          )




          }
        </div>
      </div>
    </>
  );
};

export default Page;
