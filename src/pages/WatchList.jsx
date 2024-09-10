import { useEffect, useState } from "react";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import Spinner from "../components/Spinner";
import WatchlistCard from "../components/watchlistPage_components/WatchlistCard";
import HomeLink from "../components/HomeLink";
import { useTranslation } from "react-i18next";
import { FaBookmark } from "../utils/icons";

const WatchList = () => {
  const { getWatchlist } = useFirestore();
  const { user } = useAuth();
  const { t } = useTranslation();

  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user?.uid) {
      getWatchlist(user.uid)
        .then((data) => {
          setWatchlist(data);
        })
        .catch((err) => {
          console.log("Error:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user?.uid, getWatchlist]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="container mx-auto py-2">
      <div className="px-10 sm:px-20 sm:mb-4">
        <h2
          className={`flex items-center gap-2 text-lg sm:text-xl font-bold text-red-500 py-2 mb-2 sm:py-4`}
        >
          {t("watchlist")}
          <FaBookmark />
        </h2>
        {watchlist.length > 0 ? (
          <div className="flex flex-col gap-6">
            {watchlist.map((item) => (
              <WatchlistCard
                key={item.id}
                type={item.type}
                item={item}
                setWatchlist={setWatchlist}
              />
            ))}
          </div>
        ) : (
          <div className="h-[85vh] flex flex-col justify-between">
            <div className="flex justify-center">
              <h3 className={`mt-[20vh] text-lg`}>{t("emptyWatchlist")}</h3>
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

export default WatchList;
