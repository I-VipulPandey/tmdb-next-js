import Link from 'next/link'
import React from 'react'
import Progress from './Progress';
const TvShowCard = ({ tvshow }) => {

    
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

    return (
        <>
            {tvshow.length != 0 ?

                <div key={tvshow.id} className="relative bg-gray-100 rounded-lg shadow-md">
                    <div className='relative'>
                        <Link href={`/tvshow/${tvshow.id}`}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500//${tvshow.poster_path}?api_key=11eafabab15fc91d50417227c788a542`}
                                alt=""
                                className="w-full h-auto rounded-t-lg"
                            />
                        </Link>

                        <div className='bg-black absolute -bottom-6 left-4 rounded-full  h-10 w-10 flex items-center justify-center text-white p-3 '>
                            <Progress progress={Math.floor(tvshow.vote_average * 10)} />
                            <p className='font-bold'>{Math.floor(tvshow.vote_average * 10)}</p> <sup className=' text-[0.9vw]'>%</sup>
                        </div>
                    </div>
                    <div className="p-4 mt-4">
                        <Link href={`/tvshow/${tvshow.id}`}>
                            <div className="text-lg font-semibold text-black  hover:text-blue-400">
                                {tvshow.name}
                            </div>
                        </Link>
                        <p className="text-gray-600"> {/* Changed text color */}
                            {convertNumericToDate(tvshow.first_air_date)}
                        </p>
                    </div>
                </div>
                : <div class="animate-pulse space-y-2 h-64 ">
                    <div class="bg-gray-200  h-72 "></div>
                </div>
            }
        </>

    )
}



export default TvShowCard