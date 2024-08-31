import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import PropTypes from "prop-types";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }
  return user ? children : <Navigate to={"/"} />;
};

Protected.prototype = {
  children: PropTypes.node.isRequired,
};
export default Protected;
