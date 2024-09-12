import React from "react";
import MenuItems from "../components/ui/menu";
import { useParams } from "react-router-dom";

function Menu({ backend }) {
  const { category } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const currentVegFilter = queryParams.get("veg");
  
  return (
    <div>
      <MenuItems backend={backend} category={category} isVeg={currentVegFilter} />
    </div>
  );
}

export default Menu;
