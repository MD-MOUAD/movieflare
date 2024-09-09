import { Button } from "@material-tailwind/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";
const HomeLink = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  return (
    <Button variant="text">
      <Link
        to={"/"}
        className="flex items-center gap-2 transition-opacity duration-300"
      >
        {t("goBackHome")}
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Link>
    </Button>
  );
};

export default HomeLink;
