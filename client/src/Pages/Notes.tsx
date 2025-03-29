import RichTextEditor from "@mantine/rte";
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
      <div className="flex justify-center items-center mt-10">
        <h1 className="text-3xl font-bold">These Notes are Read-Only</h1>
      </div>
      <RichTextEditor
        value={data?.data}
        readOnly={true} // Set to true to make it read-only
        
        styles={(theme) => ({
          root: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
            border: `1px solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[3]
            }`,
          },
        })}
      />
    </div>
  );
}
