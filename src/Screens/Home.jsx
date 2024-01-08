import React, {useEffect,useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import foodData from "../foodData2.json"
import foodCatJSON from "../foodCategory.json"
export default function Home() {
  const [search,setSearch] = useState("")
  const [foodCat,setFoodCat] = useState([]);
  const [foodItem,setFoodItem] = useState([]);
  const carouselImageStyle = {
    height: "480px", // Define the height you want
    objectFit: "cover", // Maintain aspect ratio and cover container
    opacity: "0.8", // Adjust the opacity as needed (0.0 to 1.0)
  };
  const loadData = async ()=>{
    // let response = await fetch("http://localhost:5000/api/foodData",{
    //   method:"GET",
    //   headers:{
    //     'Content-Type':"application/json"
    //   }
    // });
    // response = await response.json();
    setFoodItem(foodData);
    setFoodCat(foodCatJSON);
    // console.log(response[0],response[1])
  }
  useEffect(()=>{
    loadData()
  },[])

  return (
    <div>
      <div className="">
        <Navbar />
          <div>
            {/* carousel */}
            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

<div className="carousel-inner " id='carousel'>
  <div class=" carousel-caption  " style={{ zIndex: "9" }}>
    <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
      <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
      <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
    </div>
  </div>
  <div className="carousel-item active" >
    <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" , height: "500px" }} alt="..." />
  </div>
  <div className="carousel-item">
    <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)", height: "500px" }} alt="..." />
  </div>
  <div className="carousel-item">
    <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" ,height: "500px" }} alt="..." />
  </div>
</div>
<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
  <span className="carousel-control-next-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Next</span>
</button>
</div>
      {/* carousel end */}
          </div >
          <div className="container ">
            {
              foodCat.length !==0 ? foodCat.map((data)=>{
                return(
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                     {data.CategoryName} 
                  </div>
                  <hr />
                  {foodItem.length !==0 ? 
                  foodItem.filter((item)=>
                    (item.CategoryName == data.CategoryName) && (item.name.toLowerCase().includes(search))
                  ).map(filterItems=>{
                    return (
                      <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                        <Card 
                        foodItem = {filterItems}
                        options = {filterItems.options[0]}
                        
                        
                        ></Card>
                      </div>
                    )
                  })
                  : <div>No Such Data Found</div>}
                </div>
                )
              }):""
            }
          </div>
        <Footer />
      </div>
    </div>
  );
}
