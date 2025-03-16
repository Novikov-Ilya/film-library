import { NavLink } from 'react-router'
import { navMenu } from "../../const/navMenu"
import './navmenu.scss'


export default function NavMenu() {
  return (
    <div className="nav-menu">
      <ul>
        {navMenu.map((item, index) => <li key={index}><NavLink to={item.path}>{item.title}</NavLink></li>)}
      </ul>
    </div>
  )
}