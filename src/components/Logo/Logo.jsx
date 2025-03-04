import logo from '../../images/logo.png'
import './logo.scss'

export default function Logo() {
  return (
    <div className='branding'>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className='logo-title'>Coctail Collection</div>
    </div>
  )
}