import { useState } from 'react';

import IconDown from '@/assets/icons/icon-down.svg';

import { IMenuDropdown } from '.';
import DropdownMenu from './DropdownMenu';

import './dropdown.scss';

export default function Dropdown({ title, menu }: { title: string; menu: IMenuDropdown }) {
  const [show, setShow] = useState<boolean>(false);
  const dropdown = document.querySelector('#dropdown') as Element;

  const clickOutsideHandler = (event: Event) => {
    console.log(event.composedPath().includes(dropdown));
    if (!event.composedPath().includes(dropdown)) {
      setShow(false);
      window.removeEventListener('click', clickOutsideHandler, false);
      console.log(show);
    }
  };

  const toggleDropdown = () => {
    setShow(!show);

    window[show ? 'addEventListener' : 'removeEventListener']('click', clickOutsideHandler, false);
  };

  return (
    <div id="dropdown" className="dropdown">
      <button type="button" className="dropdown-btn" onClick={toggleDropdown}>
        {title}
        <IconDown />
      </button>
      <DropdownMenu menu={menu} show={show} />
    </div>
  );
}
