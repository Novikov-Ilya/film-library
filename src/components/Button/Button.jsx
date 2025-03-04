import './Button.scss'

export default function Button({ children, onClick, isActive }) {
  return (<button
    onClick={(e) => onClick(e)}
    className={isActive ? 'active' : null} >
    {children}
  </button>)
}