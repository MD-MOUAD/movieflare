
import PropTypes from "prop-types";
import HomeRedirection from "../HomeRedirection";
import { useParams } from "react-router-dom";


const DetailsPageVerifier = ({ children }) => {
  const {type} = useParams();

  return ["tv", "movie"].includes(type)
  ? children
  : <HomeRedirection />
};

DetailsPageVerifier.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailsPageVerifier;
