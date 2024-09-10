import { useEffect, useState } from "react";
import { fetchSimilar } from "../../services/api";
import Spinner from "../Spinner";
import CardComponent from "../CardComponent";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";

const Similar = ({ itemId, mediaType }) => {
  const [similarData, setSimilarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const { language } = useLanguage();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const results = await fetchSimilar(mediaType, itemId, language);
        setSimilarData(results);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [language]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="py-6">
      <h2
        className={`border-red-500 dark:border-red-600 text-lg sm:text-xl font-roboto mb-6 ${
          language === "ar-MA" ? "text-right mr-2 border-r-4 sm:border-r-8 pr-2" : "ml-2 border-l-4 sm:border-l-8 pl-2"
        }`}
      >
        {t(`Similar ${mediaType === "tv" ? "Series" : "Movies"}`)}
      </h2>
      <div className="flex items-center justify-center flex-wrap gap-10 max-md:gap-6 max-sm:gap-2">
        {similarData.length > 0 ? (
          similarData?.map((item, i) => {
            item["media_type"] = mediaType;
            return <CardComponent key={item.id} item={item} small />;
          })
        ) : (
          <p className="mt-10 text-center">{t("noData")}</p>
        )}
      </div>
    </div>
  );
};

export default Similar;
