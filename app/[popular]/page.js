"use client"

import { asyncGetMovies } from "@/store/Actions/moviesAction";
import { changePage } from "@/store/Reducers/movieReducer";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

const Page = ({ params }) => {
  const [click, setclick] = useState(params.popular);
  const { Movies, page } = useSelector((state) => state.movieReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetMovies(params.popular));
  }, [page, Movies]);

  function convertNumericToDate(numericDate) {
    // Parse the numeric date into a Date object
    const dateObj = new Date(numericDate);

    // Define arrays for month names and suffixes
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
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

  const handlePageClick = (e) => {
    dispatch(changePage(e.selected + 1));
  };

  return (
    <>
      <div className="bg-white  text-gray-900"> {/* Changed background and text color */}
        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Movies.map((movie, index) => (
              <div key={movie.id} className="bg-gray-100 rounded-lg shadow-md">
                <Link href={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500//${movie.poster_path}?api_key=11eafabab15fc91d50417227c788a542`}
                    alt=""
                    className="w-full h-auto"
                  />
                </Link>
                <div className="p-4">
                  <Link href={`/movie/${movie.id}`}>
                    <div className="text-lg font-semibold text-blue-500 hover:underline">
                      {movie.title}
                    </div>
                  </Link>
                  <p className="text-gray-600"> {/* Changed text color */}
                    {convertNumericToDate(movie.release_date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <ReactPaginate
            activeClassName="bg-blue-500 px-2  text-white"
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={10}
            previousLabel="< Previous"
            containerClassName="flex justify-center mt-4"
            pageClassName="mx-2"
          />
        </div>
      </div>
    </>
  );
};

export default Page;
