import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import PropTypes from "prop-types";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import Spinner  from "../Spinner";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Access Denied",
        description: "You need to be logged in to access this page. Please log in or register.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
        containerStyle: {
          maxWidth: '500px',
        },

      });
    }
  }, [loading, user, toast]);

  if (loading) {
    return <Spinner/>
  }

  return user ? (
    children
  ) : (
    <Navigate to={"/"} />
  );
};

Protected.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Protected;
