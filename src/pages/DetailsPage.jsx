import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDetails } from "../services/api";

const DetailsPage = () => {
  const { type, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchDetails(type, id)
      .then((results) => {
        setDetails(results);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <ul>{Object.entries(details).map((key) => (<li>{key[0] + ":  " + key[1]}</li>))}</ul>
    </>
  );
};

export default DetailsPage;
