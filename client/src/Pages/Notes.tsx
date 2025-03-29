import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Notes() {
  const id = useParams()?.id;
  const [data, setData] = useState<{ data: string } | null>(null);
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

  return (
    <div className="min-h-screen">
      {"THIS is page"}
      {/* Render API response as HTML */}
      <div dangerouslySetInnerHTML={{ __html: data?.data || "" }} />
    </div>
  );
}
