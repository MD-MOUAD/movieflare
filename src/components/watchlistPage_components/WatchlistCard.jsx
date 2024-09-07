baseImgPath/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { baseImgPath } from "../../services/api";
import { useFirestore } from "../../services/firestore";
import { useAuth } from "../../context/useAuth";
import {
  FaTrash,
  StarIcon,
} from "../../utils/icons";

const WatchlistCard = ({ type, item, setWatchlist }) => {
  const { removeFromWatchlist } = useFirestore();
  const { user } = useAuth();

  const handleRemoveClick = (event) => {
    event.preventDefault(); // Prevent the default behavior (link redirection)
    removeFromWatchlist(user?.uid, item.id).then(() => {
      setWatchlist((prev) => prev.filter((el) => el.id !== item.id));
    });
  };

  return (
    <Link to={`/${type}/${item.id}`}>
      <Flex gap="4">
        <Box position={"relative"} w={"150px"}>
          <Image
            src={`${baseImgPath}/${item.poster_path}`}
            alt={item.title}
            height={"200px"}
            minW={"150px"}
            objectFit={"cover"}
          />
          <Tooltip label="Remove from watchlist">
            <IconButton
              aria-label="Remove from watchlist"
              icon={<FaTrash />}
              size={"sm"}
              colorScheme="red"
              position={"absolute"}
              zIndex={"2"}
              top="2px"
              left={"2px"}
              onClick={handleRemoveClick}
            />
          </Tooltip>
        </Box>

        <Box>
          <Heading fontSize={{base: 'xl', md: "2xl"}} noOfLines={1}>
            {item?.title || item?.name}
          </Heading>
          <Heading fontSize={"sm"} color={"red.400"} mt="2">
            {new Date(
              item?.releaseDate
            ).getFullYear() || "N/A"}
          </Heading>
          <Flex alignItems={"center"} gap={2} mt="4"color={"orange.400"}>
            <StarIcon fontSize={"small"} />
            <Text textAlign={"center"} fontSize="small">
              {item?.vote_average?.toFixed(1)}
            </Text>
          </Flex>
          <Text mt="4" fontSize={{base: "xs", md: "sm"}} noOfLines={5}>
            {item?.overview}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default WatchlistCard;