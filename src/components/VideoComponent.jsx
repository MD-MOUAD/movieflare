const VideoComponent = ({ id, title, small }) => {
  return (
    <iframe
      width="100%"
      height={small ? "150" : "500px"}
      src={`https://www.youtube.com/embed/${id}`}
      title={title}
      className="max-md:h-64"
      allowFullScreen
    ></iframe>
  );
};


export default VideoComponent;
