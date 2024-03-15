export interface IMenuItem {
  key: string;
  label: string;
  toggle?: boolean;
  click?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export type IMenuDropdown = IMenuItem[];
