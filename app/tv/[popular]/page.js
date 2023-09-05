"use client"

import { changePage } from "@/store/Reducers/movieReducer";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncTvShows } from "@/store/Actions/tvShowsAction";

const Page = ({ params }) => {
  const [click, setclick] = useState(params.popular);
  const { TvShows } = useSelector((state) => state.tvShowReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAsyncTvShows(params.popular));
  }, [TvShows]);

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
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {TvShows.map((tvShow, index) => (
              <div key={tvShow.id} className="bg-gray-800 rounded-lg overflow-hidden">
                <Link href={`/tvShow/${tvShow.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500//${tvShow.poster_path}?api_key=2a325f825de42d66968dbc58f1703c53`}
                      alt=""
                      className="w-full h-auto"
                    />
                </Link>
                <div className="p-4">
                  <Link href={`/tvShow/${tvShow.id}`}>
                    <div className="text-lg font-semibold text-blue-500 hover:underline">
                      {tvShow.name}
                    </div>
                  </Link>
                  <p className="text-gray-400">
                    {convertNumericToDate(tvShow.first_air_date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <ReactPaginate
            containerClassName="flex justify-center mt-4"
            pageClassName="mx-2"
            previousLabel="< Previous"
            nextLabel="Next >"
            breakLabel="..."
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={10}
            activeClassName="bg-blue-500 px-2 text-white"
          />
        </div>
      </div>
    </>
  );
};

export default Page;
