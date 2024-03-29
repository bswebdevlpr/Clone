import React from "react";

function HistoryPage(props) {
  return (
    <div style={{ width: "80%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h1>History</h1>
      </div>
      <br />

      <table>
        <thead>
          <tr>
            <th>Payment</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Date of Purchase</th>
          </tr>
        </thead>

        <tbody>
          {props.user.userData &&
            props.user.userData.history.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.dateOfPurchase}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryPage;
