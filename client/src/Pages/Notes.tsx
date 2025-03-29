import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Notes() {
  const id = useParams()?.id;
  const [data, setData] = useState([]);
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`http://localhost:8000/notesInfo/${id}`).then((res) => {
        console.log(res.data);
        setData(res.data);
      });
    };
    fetchData();
  }, [id]);

  return <div>{data}</div>;
}
