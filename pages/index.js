import Picture from "../components/Picture";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const currentDate = new Date()
    .toJSON()
    .slice(0, 10)
    .replace(/-/g, "-");
  const getAllData = async () => {
    if (startDate) {
      if (currentDate < endDate) {
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_API_KEY}&start_date=${startDate}&end_date=${currentDate}`
        );
        setData(response.data);
      } else {
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_API_KEY}&start_date=${startDate}&end_date=${endDate}`
        );
        setData(response.data);
      }
    }
  };
  return (
    <div className="bg-neutral-800 min-h-screen min-w-screen">
      <div className="flex justify-center items-center text-3xl pt-2 text-yellow-500">
        {" "}
        Astronomy Picture of the Day
      </div>
      <div className="flex flex-row justify-around items-center pt-10">
        <div className="flex flex-col justify-center items-center">
          <div className="text-gray-200 text-lg pb-1">From</div>
          <input type="date" onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-gray-200 text-lg pb-1">Till</div>
          <input type="date" onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div className="mt-8">
          <button
            className="h-7 w-20 bg-gray-200 cursor-pointer hover:bg-yellow-500 hover:text-gray-100 rounded-sm"
            onClick={() => getAllData()}
          >
            Submit
          </button>
        </div>
      </div>
      {data.length
        ? data.map((apod) => {
            return (
              <Picture
                imageLink={apod.url}
                heading={apod.title}
                details={apod.explanation}
                date={apod.date}
                key={apod.title}
              />
            );
          })
        : ""}
    </div>
  );
}
