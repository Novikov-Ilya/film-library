import React from 'react'
import './Button.scss'

interface ButtonProps {
  children?: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isActive?: boolean;
  attr?: string
}

export default function Button({ children, onClick, isActive, attr }: ButtonProps) {
  return (<button
    onClick={(e) => onClick(e)}
    className={isActive ? 'active' : ''}
    data-action={attr}
  >
    {children}
  </button>)
}