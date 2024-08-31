import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomeRedirection = () => {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    toast({
      title: "Invalid Route",
      description: "The page you are looking for does not exist. You have been redirected to the homepage.",
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
