import PropTypes from "prop-types";

const VideoComponent = ({ id, title, small }) => {
  return (
    <iframe
      width="100%"
      height={small ? "150" : "500px"}
      src={`https://www.youtube.com/embed/${id}`}
      title={title}
      allowFullScreen
    ></iframe>
  );
};

VideoComponent.PropTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
};
export default VideoComponent;
