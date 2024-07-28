import { baseImgPath } from "../services/api";
import { Link } from "react-router-dom";

const CardComponent = ({ item }) => {
  return (
    <Link  to="/">
      <div className="w-48">
        <img src={`${baseImgPath}/${item.poster_path}`}/>
      </div>
    </Link>
  )
}

export default CardComponent;