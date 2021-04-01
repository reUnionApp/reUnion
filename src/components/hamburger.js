import React, { useState } from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import hamburgerMenu from '@iconify-icons/cil/hamburger-menu';
import DropMenu from './dropMenu';

const Hamburger = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Icon
        open={open}
        onClick={() => {
          setOpen(!open);
        }}
        icon={hamburgerMenu}
      ></Icon>
      <DropMenu open={open} />
    </div>
  );
};

export default Hamburger;
