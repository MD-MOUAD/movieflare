import React, { useState, useEffect } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getYear, mapGenreIdsToNames } from "../utils/helpers";
import { FaStar, FaRegPlayCircle } from "../utils/icons";
import { BaseImgPathOriginal, baseImgPath, genresDict } from "../services/api";

const MotionBox = motion(Box);

const BannerSlider = ({ movies }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === movies?.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <Box
      position="relative"
      overflow="hidden"
      borderRadius="md"
      width="100%"
      height={{ base: "14rem", md: "24rem", lg: "26rem", xl: "30rem" }}
    >
      {movies.map((item, index) => (
        <MotionBox
          key={index}
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSlide === index ? 1 : 0 }}
          zIndex={currentSlide === index ? 1 : -1}
          transition={{ duration: 0.8 }}
        >
          <div
            className="relative bg-cover bg-center sm:rounded-md h-full"
            style={{
              backgroundImage: `url("${BaseImgPathOriginal}/${item?.backdrop_path})")`,
            }}
          >
            {/* overlay */}
            <div className="absolute inset-0 bg-cover-gradient sm:rounded-md"></div>

            <div className="relative h-full flex items-center sm:p-12 rounded-lg sm:backdrop-filter">
              <div className="flex items-center text-white w-fit max-w-5xl bg-opacity-75 ">
                <img
                  src={`${baseImgPath}/${item?.poster_path}`}
                  alt="Movie Poster"
                  className="w-28 md:w-48 rounded-lg shadow-lg opacity-65 max-sm:hidden"
                />
                <div className="ml-3 md:ml-6 text-left">
                  <h1 className="text-5xl max-lg:text-4xl max-md:text-2xl max-sm:text-3xl font-bold text-white max-sm:backdrop-blur-sm">
                    {item.title || item.name}
                  </h1>
                  <div className="flex gap-3 items-center mt-2 md:mt-4 max-md:hidden text-white/65 lg:text-lg">
                    <p className="">{getYear(item)}</p>
                    <div className="flex items-center gap-1 bg-slate-500/50 px-1 font-bold text-yellow-500 text-sm lg:text-base rounded-sm">
                      <FaStar />
                      {item?.vote_average?.toFixed(1)}
                    </div>
                  </div>
                  <p className="md:mt-2 text-white font-[500] lg:text-lg max-md:hidden">
                    {mapGenreIdsToNames(
                      item?.genre_ids,
                      genresDict[item?.media_type]
                    )?.join(", ")}
                  </p>
                  <p className="mt-4 xl:text-lg text-white/50 font-[500] line-clamp-2 max-md:hidden">
                    {item?.overview}
                  </p>
                  <div className="mt-6">
                    <button className="bg-red-600 hover:bg-red-700 text-sm text-white font-semibold py-2 px-3 rounded-lg shadow-lg">
                      <Link
                        to={`${item?.media_type}/${item?.id}`}
                        className="flex gap-2 items-center"
                      >
                        <FaRegPlayCircle className="size-4" />
                        <span>Watch Now</span>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionBox>
      ))}

      {/* Circle Indicators */}
      <HStack
        position="absolute"
        bottom="10px"
        left="50%"
        transform="translateX(-50%)"
        spacing="12px"
        zIndex="1"
        marginBottom={"4px"}
      >
        {movies.map((_, index) => (
          <Box
            key={index}
            width="10px"
            height="10px"
            borderRadius="50%"
            background={
              currentSlide === index ? "white" : "rgba(255, 255, 255, 0.5)"
            }
            cursor="pointer"
            onClick={() => goToSlide(index)}
          />
        ))}
      </HStack>
    </Box>
  );
};

export default BannerSlider;
