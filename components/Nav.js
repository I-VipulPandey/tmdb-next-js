"use client"
import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { changePage } from "@/store/Reducers/movieReducer";

const Nav = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [tvDropdown, setTvDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Popular");
  const dispatch = useDispatch();

  const handleDropdownToggle = () => {
    setShowDropdown((prevState) => !prevState);
    setTvDropdown(false);
  };

  const handletvDropdownToggle = () => {
    setTvDropdown((prevState) => !prevState);
    setShowDropdown(false);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setShowDropdown(false); // Close the dropdown after selecting an option
  };

  const handletvOptionChange = (event) => {
    // setSelectedOption(event.target.value);
    setTvDropdown(false); // Close the dropdown after selecting an option
  };

  const pageHandler = () => {
    dispatch(changePage(1));
  };

  return (
    <div className="bg-gray-800 py-4 px-6 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt=""
              className="h-10 w-10 cursor-pointer"
            />
          </Link>
          <div className="relative group">
            <p
              onClick={handleDropdownToggle}
              className="cursor-pointer hover:text-white text-gray-300"
            >
              Movies
            </p>
            {showDropdown && (
              <div className="z-10 absolute top-10 left-0 bg-gray-700 text-white py-2 px-4 space-y-2">
                <Link
                  onClick={pageHandler}
                  href="/popular"
                  value="Popular"
                  className="block hover:text-blue-500"
                >
                  Popular
                </Link>
                <Link
                  onClick={pageHandler}
                  href="/now_playing"
                  value="Now Playing"
                  className="block hover:text-blue-500"
                >
                  Now Playing
                </Link>
                <Link
                  onClick={pageHandler}
                  href="/upcoming"
                  value="Upcoming"
                  className="block hover:text-blue-500"
                >
                  Upcoming
                </Link>
                <Link
                  onClick={pageHandler}
                  href="/top_rated"
                  value="Top Rated"
                  className="block hover:text-blue-500"
                >
                  Top Rated
                </Link>
              </div>
            )}
          </div>
          <div className="z-10 relative group">
            <p
              onClick={handletvDropdownToggle}
              className="cursor-pointer hover:text-white text-gray-300"
            >
              TV Shows
            </p>
            {tvDropdown && (
              <div className="absolute top-10 left-0 bg-gray-700 text-white py-2 px-4 space-y-2">
                <Link
                  onClick={pageHandler}
                  href="/tv/popular"
                  value="Popular"
                  className="block hover:text-blue-500"
                >
                  Popular
                </Link>
                <Link
                  onClick={pageHandler}
                  href="/tv/airing_today"
                  value="Now Playing"
                  className="block hover:text-blue-500"
                >
                  Airing Today
                </Link>
                <Link
                  onClick={pageHandler}
                  href="/tv/on_the_air"
                  value="Upcoming"
                  className="block hover:text-blue-500"
                >
                  On TV
                </Link>
                <Link
                  onClick={pageHandler}
                  href="/tv/top_rated"
                  value="Top Rated"
                  className="block hover:text-blue-500"
                >
                  Top Rated
                </Link>
              </div>
            )}
          </div>
          <p className="cursor-pointer hover:text-white text-gray-300">People</p>
          <p className="cursor-pointer hover:text-white text-gray-300">More</p>
        </div>
      </div>
    </div>
  );
};

export default Nav;
