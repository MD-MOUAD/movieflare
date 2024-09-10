import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const HomeRedirection = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    toast({
      title: t("invalidRoute"),
      description: t("pageNotFound"),
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    navigate("/");
  }, []);

  return null;
};

export default HomeRedirection;
