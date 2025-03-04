import { useEffect, useState } from "react";
import getCategories from "../../const/Categories";
import Button from "../Button/Button";

export default function Tabs({ select }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories(setCategories)
  }, []);

  return (
    <nav className="tabs__categories-buttons">
      {categories.map((item, index) => {
        const cat = item.replaceAll('_', ' ');
        return <Button key={index} onClick={() => select(item)}>{cat}</Button>
      })}
    </nav>

  )
}