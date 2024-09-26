import React, { useState } from "react";
import { useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import RightBar from "./RightBar";
const CarForm = () => {
  const navigate = useNavigate();
  const [carDetails, setCarDetails] = useState({
    name: "",
    price: "",
    year: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/insertCar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carDetails),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      } else {
        navigate("/");
      }
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center " style={{ height: "82vh" }}>
        <div className="col-md-6">
          <Sidebar car={carDetails} />
          <RightBar />
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center">Enter Car Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Car Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={carDetails.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={carDetails.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="year" className="form-label">
                    Year
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="year"
                    name="year"
                    value={carDetails.year}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Image URL
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="image"
                    name="image"
                    value={carDetails.image}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center aligned-items-center">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarForm;
