import React, { useState, useEffect } from "react";

const CarCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [carData, setCarData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [car, setCar] = useState("");
  const [formData, setFormData] = useState({
    carmodel: "",
    customername: "",
    startdate: "",
    enddate: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/carddetails")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setCarData(data.user);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setErrorMessage("Failed to fetch card: " + error.message);
      });
  }, []);

  const handleRentNow = (name) => {
    console.log("handle right");
    setCar(name);
    setFormData((prevFormData) => ({
      ...prevFormData,
      carmodel: name,
    }));
    setShowModal(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission, e.g., send data to server
    console.log("Form submitted:", formData);
  };

  const saveUser = () => {
    console.log("inside save user", formData);
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        } else {
          setShowModal(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setErrorMessage("Failed to fetch card: " + error.message);
      });
  };

  const formattedData = carData.map((item) => (
    <div key={item._id} className="col-md-6 ">
      <div className="card m-2">
        <img
          src={item.image}
          className="card-img-top"
          alt="..."
          style={{ width: "100%" }}
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">Price: {item.price}</p>
          <p className="card-text">Year: {item.year}</p>

          <button
            className="btn btn-primary"
            onClick={() => handleRentNow(item.name)}
          >
            Rent Now
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container">
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enter Customer Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    setShowModal(false);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="carModel" className="form-label">
                      Car Model
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="carmodel"
                      name="carmodel"
                      value={car}
                      readOnly
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="carModel" className="form-label">
                      customername
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="customername"
                      name="customername"
                      value={formData.customername}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="startdate"
                      name="startdate" // Corrected name attribute
                      value={formData.startdate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="enddate"
                      name="enddate" // Corrected name attribute
                      value={formData.enddate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="justify-content-center justify-items-center text-center">
                    <button
                      type="submit"
                      onClick={saveUser}
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <div className="container">
          <div className="row">{formattedData}</div>
        </div>
      )}
    </div>
  );
};

export default CarCard;
