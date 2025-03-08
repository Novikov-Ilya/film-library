import './Button.scss'

export default function Button({ children, onClick, isActive, attr }) {
  return (<button
    onClick={(e) => onClick(e)}
    className={isActive ? 'active' : null}
    data-action={attr}
  >
    {children}
  </button>)
}