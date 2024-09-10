import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import PropTypes from "prop-types";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import Spinner from "../Spinner";
import { useTranslation } from "react-i18next";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();
  const toast = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: t("accessDenied"),
        description: t("loginRequired"),
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
        containerStyle: {
          maxWidth: "500px",
        },
      });
    }
  }, [loading, user, toast]);

  if (loading) {
    return <Spinner />;
  }

  return user ? children : <Navigate to={"/"} />;
};

Protected.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Protected;
