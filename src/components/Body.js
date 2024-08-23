import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import { useState } from "react";
import Shimmer from "./Shimmer";
const Body=()=>{
    const [listOfRestaurants,setlistOfRestaurants]=useState([]);
    useEffect(()=>{fetchData()},[]);
   

    const fetchData=async ()=>{
        const data=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json=await data.json();
        console.log(json);
       //optional chaining
       setlistOfRestaurants(json?.data?.cards[1].card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    //conditional rendering
    
    
    return listOfRestaurants.length===0 ? (
    <Shimmer />
    ):(
        <div className="body">
            <div className="filter">
                <button 
                  className="filter-btn"
                  onClick={()=>{
                    const filteredList=listOfRestaurants.filter(
                        (res)=>res.info.avgRating>4
                    );
                    setlistOfRestaurants(filteredList);
                  }}
                  >
                    Top Rated restaurants
                  </button>
            </div>
            <div className="res-container">
                {
                  listOfRestaurants.map((restaurant)=>(<RestaurantCard key={restaurant.info.id} resData={restaurant}/>))
                }
                

            </div>
             
        </div>
    );
}
export default Body;