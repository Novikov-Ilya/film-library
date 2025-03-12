import { Link } from 'react-router-dom'
import { navMenu } from "../../const/navMenu"
import './navmenu.scss'


export default function NavMenu() {
  return (
    <div className="nav-menu">
      <ul>
        {navMenu.map((item, index) => <li key={index}><Link to={item.path}>{item.title}</Link></li>)}
      </ul>
    </div>
  )
}