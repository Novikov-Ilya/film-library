import { useEffect, useState } from "react";
import getCategories from "../../const/Categories";
import Button from "../Button/Button";
import './tabs.scss';

interface TabsProps {
  select: (category: string) => void;
  active: string;
}

export default function Tabs({ select, active }: TabsProps) {
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    getCategories(setCategories)
  }, []);

  return (
    <nav className="tabs__categories-buttons">
      {categories.map((item, index) => {
        const cat = item.replaceAll('_', ' ');
        return <Button
          key={index}
          onClick={() => select(item)}
          isActive={active === item}>
          {cat}
        </Button>
      })}
    </nav>

  )
}