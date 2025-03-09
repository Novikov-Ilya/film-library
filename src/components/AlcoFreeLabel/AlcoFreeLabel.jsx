import { useEffect, useState } from 'react'
import './alcoFreeLabel.scss'

export default function AlcoFreeLabel () {
  const [animation, setAnimation] = useState(null)
  useEffect(()=> {
    setTimeout(() => {
setAnimation('animation')
    }, 1000)
  },[])
  return (
    <div className={`cocktail-item__non-alco-label ${animation}`}></div>
  )
}