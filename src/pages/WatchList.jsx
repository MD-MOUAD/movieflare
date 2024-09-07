import { useEffect, useState } from "react";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import Spinner from "../components/Spinner";
import HomeLink from "../components/HomeLink";

const WatchList = () => {
  const { getWatchlist } = useFirestore();
  const { user } = useAuth();

  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user?.uid) {
      getWatchlist(user.uid)
        .then((data) => {
          setWatchlist(data);
          console.log(data);
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
        <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-red-500 py-2 sm:py-4">
          WatchList
        </h2>
        {watchlist.length > 0 
        ? <div></div>
        : <div className="h-[85vh] flex flex-col justify-between">
          <div className="flex justify-center">
            <h3 className="mt-[20vh] text-lg">Your watchlist is empty</h3>
          </div>
          <div className="flex justify-center">
            <HomeLink />
        </div>
        </div>}
      </div>
    </div>
  );
};

export default WatchList;
