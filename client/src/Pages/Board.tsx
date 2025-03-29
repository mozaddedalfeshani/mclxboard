import { useEffect, useState } from "react";
import { RichTextEditor } from "@mantine/rte";
import axios from "axios";
import { useParams } from "react-router";

function Board() {
  const id = useParams()?.id;

  const [value, setValue] = useState("");
  const [shareId, setShareId] = useState<string>("");

  const [loading, setLoading] = useState(true);
  console.log(id);
  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchData = async () => {
        await axios.get(`http://localhost:8000/notesInfo/${id}`).then((res) => {
          console.log(res.data);
          setValue(res.data.data); // Set the initial value of the editor
          setLoading(false);
        });
      };
      fetchData();
    } else {
      console.log("no id found");
      setLoading(false);
    }
  }, [id]);

  // data send to backend http://localhost:8000/share
  const handleShare = async () => {
    // Check if value is empty
    if (!value) {
      alert("Please write something before sharing.");
      return;
    }
    await axios
      .post("http://localhost:8000/share", {
        data: value, // Changed from fullData to data
        date: "none",
      })
      .then((res) => {
        console.log(res.data);
        setShareId(res.data); // Set the shareId from the response
      });
    (document.getElementById("my_modal_3") as HTMLDialogElement)?.showModal();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img
          src="https://i.ibb.co/6tX3Z0S7/loading.gif"
          alt="Loading..."
          className="w-[100px]"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="flex justify-center items-center mt-4 w-full">
        {shareId && shareId}
      </div>
      <RichTextEditor
        value={value}
        onChange={setValue}
        aria-expanded={true}
        bg={"#F1EFEC"}
      />
      <div className="flex justify-center items-center mt-4">
        <button
          className="bg-[#1db954] text-white rounded-md py-[11px] px-[19px] flex items-center gap-[10px] text-[1rem] "
          onClick={handleShare}>
          <img
            src="https://i.ibb.co.com/nqbsGFsV/laugh.png"
            alt="Spotify logo"
            className="w-[25px]"
          />
          Share with Friends
        </button>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello! </h3>
          <div>
            <p>Share as Readonly</p>
            <p className="text-sm text-gray-500">
              Link: <i>{`http://localhost:5173/ns/${shareId}`}</i>
            </p>
          </div>
          <div>
            <p>Share with Read & Write</p>
            <p className="text-sm text-gray-500">
              Link: {`http://localhost:5173/nsb/${shareId}`}
            </p>
          </div>
        </div>
      </dialog>
    </div>
  );
}
export default Board;
