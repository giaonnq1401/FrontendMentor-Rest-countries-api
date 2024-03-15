import { IMenuDropdown } from '.';

import './dropdown-menu.scss';

export default function DropdownMenu({ menu, show }: { menu: IMenuDropdown; show: boolean }) {
  return (
    <ul className={`dropdown-content ${show ? 'show' : ''}`}>
      {menu?.map(item => (
        <li id={item.key} key={item.key} className={`menu-item `}>
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
