import Logo from "../Logo/Logo";
import SearchPanel from "../SearchBar/SearchPanel";
import NavMenu from "../Navmenu/NavMenu";
import './header.scss'

export default function Header() {
  return (<header className="header">
    <Logo />
    <NavMenu />
    <SearchPanel />
  </header>
  )
}