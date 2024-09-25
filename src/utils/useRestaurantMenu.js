import { useState,useEffect } from "react";
import { MENU_API } from "../utils/constants";

const useRestaurantMenu =(resId)=>{
    
    const [resInfo,setResInfo]=useState(null);
   useEffect(()=>{
       fetchData();
   },[]);
   const fetchData=async ()=>{
    const data=await fetch(MENU_API + resId);
    console.log(data);
    const json=await data.json();
    setResInfo(json.data);
    console.log(resInfo);
   };
    return resInfo;
};
export default useRestaurantMenu;