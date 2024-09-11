import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body=()=>{
    const [listOfRestaurants,setlistOfRestaurants]=useState([]);
    const [filteredRestaurant,setfilteredRestaurant]=useState([]);
    const [searchItem,setsearchItem]=useState("");
    useEffect(()=>{fetchData()},[]);
   

    const fetchData=async ()=>{
        const data=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json=await data.json();
        console.log(json);
       //optional chaining
       //const restaurants1=json?.data?.cards[1].card?.card?.gridElements?.infoWithStyle?.restaurants || [];
       setlistOfRestaurants(json?.data?.cards[4].card?.card?.gridElements?.infoWithStyle?.restaurants);
      
       setfilteredRestaurant(json?.data?.cards[4].card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    //conditional rendering
    
    
    return listOfRestaurants.length===0 ? (
    <Shimmer />
    ):(
        <div className="body">
              <div className="search">
                <input
                  type="text"
                  className="search-box"
                  value={searchItem}
                  onChange={(e)=>setsearchItem(e.target.value)}/>
              <button className="search-btn"
                  onClick={()=>{
                    const filteredRest=listOfRestaurants.filter((res)=>res.info.name.toLowerCase().includes(searchItem.toLowerCase())
                       
                    );
                    setfilteredRestaurant(filteredRest);
                  }}>
                Search
               </button>
              </div>
            <div className="filter">

                <button 
                  className="filter-btn"
                  onClick={()=>{
                    const filteredList=listOfRestaurants.filter(
                        (res)=> res.info.avgRating > 4.4                       
                    );
                    setfilteredRestaurant(filteredList);
                  }}>
                    Top Rated restaurants
                  </button>
            </div>
            <div className="res-container">
                {
                  filteredRestaurant.map((restaurant)=>(
                  <Link
                  key={restaurant.info.id}
                  to={"/restaurants/"+restaurant.info.id}>
                  <RestaurantCard resData={restaurant} />
                  </Link>
                    ))}
                

            </div>
             
        </div>
    );
}
export default Body;