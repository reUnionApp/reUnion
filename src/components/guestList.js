import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addPseudoUser, getGuestList } from '../store';

const GuestList = (props) => {
  const [guestList, setGuestList] = useState([]);

  useEffect(() => {
    props.getGuestList(props.match.params.eventId);
  }, [guestList]);

  const addGuest = async (e) => {
    // e.preventDefault()
    let guest = {
      firstName: e.target.parentNode.firstName.value,
      lastName: e.target.parentNode.lastName.value,
      email: e.target.parentNode.email.value,
      eventId: props.match.params.eventId,
    };
    setGuestList([...guestList, guest]);
    console.log(guestList);
    await props.addPseudoUser(guest);

    e.target.parentNode.reset();

    // console.log(e.target.parentNode.firstName.value)
  };
  console.log(props);
  console.log(props.match.params);

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

          {props.guestList.map((guest) => {
            return (
              <tr key={guest.email}>
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

const mapState = (state) => ({
  user: state.userReducer,
  guestList: state.eventReducer.guestList,
});

const mapDispatch = (dispatch) => ({
  addPseudoUser: (user) => dispatch(addPseudoUser(user)),
  getGuestList: (id) => dispatch(getGuestList(id)),
});

export default connect(mapState, mapDispatch)(GuestList);