import { useEffect, useState } from "react";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import Spinner from "../components/Spinner";
import FavoriteCard from "../components/favoritePage_components/FavoriteCard";
import HomeLink from "../components/HomeLink";
import { useTranslation } from "react-i18next";
import { RiHeart3Fill } from "../utils/icons";

const Favorite = () => {
  const { getFavorite } = useFirestore();
  const { user } = useAuth();
  const { t } = useTranslation();

  const [favorite, setFavorite] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user?.uid) {
      getFavorite(user.uid)
        .then((data) => {
          setFavorite(data);
        })
        .catch((err) => {
          console.log("Error:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user?.uid, getFavorite]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="container mx-auto py-2">
      <div className="px-10 sm:px-20 sm:mb-4">
        <h2
          className={`flex items-center gap-2 text-lg sm:text-xl font-bold text-red-500 py-2 mb-2 sm:py-4`}
        >
          {t("favorites")}
          <RiHeart3Fill />
        </h2>
        {favorite.length > 0 ? (
          <div className="flex flex-col gap-6">
            {favorite.map((item) => (
              <FavoriteCard
                key={item.id}
                type={item.type}
                item={item}
                setFavorite={setFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="h-[85vh] flex flex-col justify-between">
            <div className="flex justify-center">
              <h3 className={`mt-[20vh] text-lg`}>{t("emptyFavorite")}</h3>
            </div>
            <div className="flex justify-center">
              <HomeLink />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorite;
