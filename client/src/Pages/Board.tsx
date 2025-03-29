import { useState } from "react";
import { RichTextEditor } from "@mantine/rte";

function Board() {
  const [value, setValue] = useState("");

  return <RichTextEditor value={value} onChange={setValue} />;
}
export default Board;
