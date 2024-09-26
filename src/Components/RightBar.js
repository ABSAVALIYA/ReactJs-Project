import React, { useEffect, useState } from "react";

const RightBar = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/showuser")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data.user);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div
      className="position-fixed top-5 end-0 h-75 bg-light border-start p-3"
      style={{ width: "300px", overflowY: "scroll" }}
    >
      <div>
        <h4>User Details</h4>
        {Data.map((data) => (
          <div key={data._id}>
            <p>Car Name: {data.carmodel}</p>
            <p>Customer name: {data.customername}</p>
            <p>start: {data.startdate}</p>
            <p>end: {data.enddate}</p>

            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightBar;
