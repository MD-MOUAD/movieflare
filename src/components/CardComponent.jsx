import { baseImgPath } from "../services/api";
import { Link } from "react-router-dom";

const CardComponent = ({ item }) => {
  return (
    <Link to={`/details`}>
      <div className="w-48 h-72 shrink-0 rounded-lg overflow-clip">
        <img
          className="h-full"
          src={`${baseImgPath}/${item.poster_path}`}
          onError={(e) => e.currentTarget.src = "https://via.placeholder.com/400"}
        />
      </div>
    </Link>
  )
}

export default CardComponent;