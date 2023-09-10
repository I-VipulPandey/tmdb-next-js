"use client"
import {

  asyncGetTrendingMovies

} from "@/store/Actions/moviesAction";
import { removeerrors } from "@/store/Reducers/movieReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import MovieCard from "@/components/MovieCard";


const Page = () => {
  const [search, setsearch] = useState("");
  const { TrendingMovies, errors } = useSelector(
    (state) => state.movieReducer
  );

  const dispatch = useDispatch();
  const router = useRouter();

  if (errors.length > 0) {
    errors.map((e, i) => {
      toast.error(e);
    });
    dispatch(removeerrors());
  }




  useEffect(() => {

    dispatch(asyncGetTrendingMovies()).then(() => {

    });

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
          backgroundImage: `url("https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/hoVj2lYW3i7oMd1o7bPQRZd1lk1.jpg")`,
        }}
      >
        <div className="bg-black bg-opacity-50 h-full overflow-hidden flex flex-col justify-center items-center">
          <div className="container px-10 mx-auto text-start py-8 flex flex-col gap-6">
            <div >
              <h1 className="text-6xl font-bold text-white">Welcome.</h1>
              <h4 className="text-2xl text-white">
                Millions of movies, TV shows, and people to discover. Explore now.
              </h4>
            </div>
            <div className="mt-4">
              <form onSubmit={submitHandler} className="flex ">
                <input
                  onChange={(e) => setsearch(e.target.value)}
                  value={search}
                  type="text"
                  placeholder="Search for a movie, TV show, person....."
                  className=" w-[90vw] px-4 py-2 rounded-full  focus:outline-none  text-black"
                />
                <button className="right-5  md:right-16 absolute bg-[#19CFB4] hover:bg-[#19CFB4] hover:text-black font-semibold text-white px-4 py-2 rounded-full ">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-12 px-10 mb-10">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Trending Movies</h2>
        </div>


        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {TrendingMovies.map((movie, index) => {
            return (
              <MovieCard movie={movie}></MovieCard>
            );
          }) 

          }
        </div>
      </div>
    </>
  );
};

export default Page;
