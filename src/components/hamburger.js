import React, { useState } from "react";
import { Icon, InlineIcon } from "@iconify/react";
import hamburgerMenu from "@iconify-icons/cil/hamburger-menu";
import DropMenu from "./dropMenu";

const Hamburger = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Icon
        style={{
          height: "25px",
          width: "25px",
          margin: "15px",
          cursor: "pointer",
        }}
        open={open}
        onClick={() => {
          setOpen(!open);
        }}
        icon={hamburgerMenu}
      ></Icon>
      <DropMenu open={open} setOpen={setOpen} />
    </div>
  );
};

export default Hamburger;
