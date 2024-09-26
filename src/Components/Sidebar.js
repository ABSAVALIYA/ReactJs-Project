import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const [carData, setCarData] = useState([]);
  const [data, setData] = useState({
    carmodel: "",
    price: "",
    year: "",
  });
  const [model, setModel] = useState(false);

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
      });
  }, []);

  const deleteCar = (id) => {
    fetch(`http://localhost:3000/deleteCar/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete car");
        }
        setCarData((prevCarData) =>
          prevCarData.filter((car) => car._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting car:", error);
      });
  };

  const fetchData = (id) => {
    setModel(true);
    fetch(`http://localhost:3000/fetchCardetails/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        console.log("data is ", data.car);
        setData(data.car);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const editCar = (id) => {
    console.log("id is ", id);
    fetch(`http://localhost:3000/editCardetails/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to edit car");
        }
        // Fetch the updated car data after successful PUT request
        return fetch("http://localhost:3000/carddetails");
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((updatedData) => {
        setCarData(updatedData.user);
        setModel(false); // Close the modal after editing
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server
  };

  return (
    <>
      {model && (
        <div
          className="modal"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal fade show"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Enter Car Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => {
                      setModel(false);
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
                        id="name"
                        name="name"
                        required
                        value={data.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="carModel" className="form-label">
                        price
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="price"
                        name="price"
                        value={data.price}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="startDate" className="form-label">
                        year
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="year"
                        name="year" // Corrected name attribute
                        value={data.year}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="justify-content-center justify-items-center text-center">
                      <button
                        type="button"
                        onClick={() => editCar(data._id)}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {
        <div
          className="position-fixed top-5 start-0 h-75 bg-light border-start p-3"
          style={{ width: "300px", overflowY: "scroll" }}
        >
          <div>
            <h4>Car Details</h4>
            {carData.map((data) => (
              <div key={data._id}>
                <p>Name: {data.name}</p>
                <p>Price: {data.price}</p>
                <p>Year: {data.year}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCar(data._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-warning ms-2"
                  onClick={() => fetchData(data._id)}
                >
                  Edit
                </button>
                <hr />
              </div>
            ))}
          </div>
        </div>
      }
    </>
  );
};

export default Sidebar;
