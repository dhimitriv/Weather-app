import { useEffect, useState } from "react";

const API = {
  key: "45d2bbda8db331a1ca3cea96684d43f2",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Search() {
  const [error, setError] = useState();
  const [find, setFind] = useState("");
  const [result, setResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function handleClick() {
    async function fetchData() {
      setIsLoading(true);

      try {
        const res = await fetch(
          `${API.base}weather?q=${find}&units=metric&APPID=${API.key}`
        );
        const data = await res.json();
        setResult(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-white text-3xl">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-white text-xl mx-auto">
          Something went wrong! Please try again!
        </p>
      </div>
    );
  }

  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  };

  return (
    <div className="w-full h-screen grid items-center justify-center my-auto">
      <div className="flex items-end justify-center pt-5">
        <h1 className="text-[54px] max-w-[350px] font-thin text-gray-200 ">
          Weather today
        </h1>
      </div>

      {isLoading && (
        <div className="w-full h-screen flex items-center justify-center">
          <p className="text-white text-3xl">Loading data...</p>
        </div>
      )}

      {error && (
        <div className="h-screen flex items-center justify-center">
          <p className="text-white text-xl mx-auto">
            Something went wrong! Please try again!
          </p>
        </div>
      )}

      <div className="flex items-center justify-center gap-3">
        <input
          className="text-gray-100 bg-[#3158c280] text-lg sm:text-lg font-semibold p-[6px]   hover:bg-[#09077075] focus:bg-[#09077075] hover:placeholder-white duration-500 active:bg-gray-100  focus:outline-none   rounded-sm placeholder-gray-100 "
          type="text"
          placeholder="Search city"
          onChange={(e) => setFind(e.target.value)}
        />
        <button
          className="text-gray-100 bg-[#3158c280] text-lg font-semibold  py-[6px] px-[12px] mx-2   hover:bg-[#09077075] hover:text-white  duration-500 active:bg-gray-100 focus:outline-none rounded-sm"
          onClick={handleClick}
        >
          Search
        </button>
      </div>
      <div>
        {typeof result.main != "undefined" ? (
          <div className=" bg-[#29292954] w-[350px] grid items-center justify-center rounded-md py-5 grid-rows-1 duration-500">
            <p className="flex justify-center items-center text-2xl text-gray-100 font-thin ">
              Today
            </p>
            <div className="flex justify-center items-start">
              {
                <img
                  src={getWeatherIconUrl(result.weather[0].icon)}
                  alt="Weather Icon"
                />
              }
              <p className="flex justify-center items-center text-[2.8rem] text-gray-100 mt-0">
                {result.name}
              </p>
            </div>
            <p className="flex justify-center items-center text-[5.5rem] text-gray-100 font-thin">
              {Math.round(result.main.temp)}°
            </p>
            <div className="flex items-center justify-between gap-6">
              <div className="grid items-center text-gray-100  max-w-[100px]">
                <p className="mx-auto font-thin">Description</p>
                <p className="text-xl mx-auto">{result.weather[0].main}</p>
              </div>
              <div className="grid items-center text-gray-100  max-w-[100px] mx-auto">
                <p className="font-thin">Humidity</p>
                <p className="mx-auto text-xl">{result.main.humidity}%</p>
              </div>
              <div className="grid  items-center text-gray-100  max-w-[100px] mx-auto">
                <p className="mx-auto font-thin">Wind</p>
                <p className="mx-auto text-xl">{result.wind.speed}Km/h</p>
              </div>
            </div>
          </div>
        ) : result.message === "city not found" ? (
          <div className="bg-[#29292954] w-[400px] grid items-start justify-center rounded-lg py-5 grid-rows-1 mb-8 duration-500">
            <p className="text-[2rem] text-gray-100 font-thin mx-auto">
              Uknown location!
            </p>
            <p className="text-[1rem] text-gray-100 font-thin mx-auto">
              ({result.message})
            </p>
            <p className=" text-[2rem] text-gray-100 font-thin mx-auto">
              Try again!
            </p>
          </div>
        ) : typeof result.main === "undefined" ? (
          <div className="duration-500"></div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Search;
