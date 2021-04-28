import React, { useState } from "react";

const GuestList = (props) => {
  const [guestList, setGuestList] = useState([]);
  const addGuest = (e) => {
    // e.preventDefault()
    let guest = {
      firstName: e.target.parentNode.firstName.value,
      lastName: e.target.parentNode.lastName.value,
      email: e.target.parentNode.email.value,
    };
    setGuestList([...guestList, guest]);
    console.log(guestList);
    e.target.parentNode.reset();

    // console.log(e.target.parentNode.firstName.value)
  };
  return (
    <div>
      <form id="guest-list">
        <label htmlFor="first-name">First Name:</label>
        <input type="text" id="firstName" required />
        <label htmlFor="first-name">Last Name:</label>
        <input type="text" id="lastName" required />
        <label htmlFor="first-name">Email:</label>
        <input type="email" id="email" required />
        <button type="button" onClick={(e) => addGuest(e)}>
          Add New Guest
        </button>
        <button type="submit">Send Invites</button>
      </form>
      <table>
        <tbody>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>

          {guestList.map((guest) => {
            return (
              <tr>
                <td>{guest.firstName}</td>
                <td>{guest.lastName}</td>
                <td>{guest.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GuestList;
