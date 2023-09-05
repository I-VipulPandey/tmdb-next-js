"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const SearchMovie = ({ params }) => {
  const router = useRouter();
  const [search, setsearch] = useState(params.searchMovie);
  const [searchData, setsearchData] = useState([]);

  const searchMovieData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/multi?query=${search}&api_key=11eafabab15fc91d50417227c788a542`
      );
      setsearchData(data.results);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    searchMovieData();
  }, [search]);

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search/${search}`);
  };

  function convertNumericToDate(numericDate) {
    // Parse the numeric date into a Date object
    const dateObj = new Date(numericDate);

    // Define arrays for month names and suffixes
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
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

  return (
    <>
      <div className="bg-gray-900 text-white">
        <form
          onSubmit={submitHandler}
          className="flex items-center px-4 py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 011.414 1.414L12.414 5H14a2 2 0 012 2v8a2 2 0 01-2 2h-1.586l-1.293 1.293a1 1 0 01-1.414-1.414L10.586 14H9a2 2 0 01-2-2V6a2 2 0 012-2zm1.414 2.293a1 1 0 00-1.414 0L6.586 8.293a1 1 0 001.414 1.414L10 7.414l1.293 1.293a1 1 0 001.414-1.414L11.414 4.293z"
              clipRule="evenodd"
            />
          </svg>
          <input
            onChange={(e) => setsearch(e.target.value)}
            value={search.replace(/%20/g, " ")}
            type="text"
            placeholder="Search for a movie, tv show, person..."
            className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 bg-gray-800 text-white"
          />
        </form>
        <div className="container mx-auto py-8 px-4">
          {searchData?.map((movie, index) => (
            <div key={movie.id} className="flex bg-gray-800 rounded-lg p-4 mb-4">
              <div className="w-1/3">
                <Link
                  href={
                    movie.media_type === "movie"
                      ? `/movie/${movie.id}`
                      : `/tvShow/${movie.id}`
                  }
                >
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}?api_key=11eafabab15fc91d50417227c788a542`}
                      alt=""
                      className="w-full h-auto"
                    />
                </Link>
              </div>
              <div className="w-2/3 p-4">
                <h2 className="text-xl font-semibold">
                  {movie.title || movie.name}
                </h2>
                <p className="text-gray-400">
                  {convertNumericToDate(
                    movie.release_date || movie.first_air_date
                  )}
                </p>
                <p className="text-gray-400">{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchMovie;
