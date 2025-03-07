import Logo from "../Logo/Logo";
import SearchPanel from "../SearchBar/SearchPanel";
import NavMenu from "../Navmenu/NavMenu";
import './header.scss'
import { MobileMenu } from "../Navmenu/MobileMenu";

export default function Header() {
  return (
    <header className="header">
      <Logo />
      <NavMenu />
      <MobileMenu />
      <SearchPanel />
    </header>
  )
}