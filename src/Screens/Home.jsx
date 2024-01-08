import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import foodData from "../foodData2.json";
import foodCatJSON from "../foodCategory.json";

const CarouselWithSearch = () => {
  const [searches, setSearches] = useState(["", "", ""]);

  const handleSearchChange = (index, value) => {
    const newSearches = [...searches];
    newSearches[index] = value;
    setSearches(newSearches);
  };

  const carouselImages = [
    'https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fHw%3D',
    'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=600',
  ];

  const carouselItems = carouselImages.map((image, index) => (
    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
      <img
        src={image}
        className="img-fluid d-block w-100"
        style={{ height: '500px', objectFit: 'cover' }}
        alt={`Slide ${index + 1}`}
      />
      <div className="carousel-caption" style={{ zIndex: '10' }}>
        <div className="d-flex justify-content-center">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searches[index]}
            onChange={(e) => handleSearchChange(index, e.target.value)}
          />
        </div>
      </div>
    </div>
  ));

  return (
    <div className="">
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">{carouselItems}</div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    // Your data loading logic here...
    setFoodItem(foodData);
    setFoodCat(foodCatJSON);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div className="">
        <Navbar />
        <div>
          <CarouselWithSearch />
        </div>
        <div className="container ">
          {
            foodCat.length !== 0 ? foodCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {
                    foodItem.length !== 0 ?
                      foodItem.filter((item) =>
                        (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search))
                      ).map(filterItems => {
                        return (
                          <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                            <Card
                              foodItem={filterItems}
                              options={filterItems.options[0]}
                            ></Card>
                          </div>
                        )
                      })
                      : <div>No Such Data Found</div>
                  }
                </div>
              )
            }) : ""
          }
        </div>
        <Footer />
      </div>
    </div>
  );
}
