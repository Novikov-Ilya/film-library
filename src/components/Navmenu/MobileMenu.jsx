import { navMenu } from "../../const/navMenu"
import './navmenu.scss'

const MobileMenu = () => {
  return (
    <div className="nav-menu-mobile">
      <div className="menu-icon">
      </div>
      <ul>
        {navMenu.map((item, index) => <li key={index}>{item.title}</li>)}
      </ul>
    </div>
  )
}

export default MobileMenu