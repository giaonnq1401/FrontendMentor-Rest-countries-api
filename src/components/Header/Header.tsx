import IconMoon from '@/assets/icons/icon-moon.svg';

import './header.scss';

function Header() {
  const handleChangeMode = () => {
    // TODO: handle change theme mode
    console.log('changed');
  };

  return (
    <div className="header">
      <a href="/" className="home">
        Where in the world?
      </a>
      <button type="button" className="mode-switcher" onClick={handleChangeMode}>
        <IconMoon />
        Dark Mode
      </button>
    </div>
  );
}

export default Header;
