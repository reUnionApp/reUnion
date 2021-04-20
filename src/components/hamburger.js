import React, { useState } from "react";
import { Icon, InlineIcon } from "@iconify/react";
import hamburgerMenu from "@iconify-icons/cil/hamburger-menu";
import DropMenu from "./dropMenu";
import plusIcon from '@iconify-icons/mdi/plus';
import { Link } from 'react-router-dom';


const Hamburger = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: 'flex', justifyContent: "space-between", width: "100%" }}>
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
      />
      <Link to="/createEvent">
        <Icon style={{
          height: "25px",
          width: "25px",
          margin: "15px",
          cursor: "pointer",
        }} icon={plusIcon} />
      </Link>

      <DropMenu open={open} setOpen={setOpen} />
    </div>
  );
};

export default Hamburger;
