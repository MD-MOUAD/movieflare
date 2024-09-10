import { IconButton, keyframes, useToast } from "@chakra-ui/react";
import { RiHeartAdd2Fill, RiHeart3Fill } from "../utils/icons";
import { useEffect, useState } from "react";
import { useFirestore } from "../services/firestore";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useTranslation } from "react-i18next";

const bounceAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

const FavoriteButton = ({ itemDetails }) => {
  const { type, id } = useParams();
  const { user } = useAuth();
  const toast = useToast();
  const { t } = useTranslation();
  const { addToFavorite, checkInFavorite, removeFromFavorite } = useFirestore();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (user) {
      checkInFavorite(user?.uid, id).then((result) => {
        setIsFavorited(result);
      });
    } else {
      setIsFavorited(false);
    }
  }, [id, user, checkInFavorite, isFavorited]);

  const handleSaveToFavorite = async () => {
    if (user) {
      const data = {
        id,
        type,
        title: itemDetails?.name || itemDetails?.title,
        releaseDate : itemDetails?.release_date || itemDetails?.first_air_date,
        poster_path: itemDetails?.poster_path,
        vote_average: itemDetails?.vote_average,
        overview: itemDetails?.overview,
      };
      await addToFavorite(user?.uid, id, data);
      const setToFavorite = await checkInFavorite(user?.uid, id);
      setIsFavorited(setToFavorite);
    } else {
      toast({
        title: t("actionRequired"),
        description: t("pleaseLogInToAddToFavorites"),
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleRemoveFromFavorite = async () => {
    await removeFromFavorite(user?.uid, id);
    const setToFavorite = await checkInFavorite(user?.uid, id);
    setIsFavorited(setToFavorite);
  };
  return (
    <IconButton
      aria-label="Favorite"
      icon={isFavorited ? <RiHeart3Fill /> : <RiHeartAdd2Fill />}
      onClick={isFavorited ? handleRemoveFromFavorite : handleSaveToFavorite}
      colorScheme={isFavorited ? "red" : "white"}
      variant="ghost"
      fontSize="32px"
      _hover={{
        transform: "scale(1.1)",
        color: isFavorited ? "red.400" : "gray.600",
        transition: "transform 0.2s ease-in-out",
      }}
      _active={{
        animation: `${bounceAnimation} 0.3s ease`,
      }}
      transition="color 0.3s ease, transform 0.2s ease"
    />
  );
};

export default FavoriteButton;
