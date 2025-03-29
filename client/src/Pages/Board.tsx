import { useState } from "react";
import { RichTextEditor } from "@mantine/rte";
import axios from "axios";

function Board() {
  const [value, setValue] = useState("");
  console.log(value);

  // data send to backend http://localhost:8000/share
  const handleShare = async () => {
    await axios
      .post("http://localhost:8000/share", {
        fullData: value,
        date: "none",
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div className="min-h-screen ">
      <div className="flex justify-center items-center mt-4 w-full">
        {value}
      </div>
      <RichTextEditor value={value} onChange={setValue} bg={"#F1EFEC"} />
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
    </div>
  );
}
export default Board;
