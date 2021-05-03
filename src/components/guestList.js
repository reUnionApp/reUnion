import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addPseudoUser, getGuestList, removeGuest, clearError } from "../store";

const GuestList = (props) => {
  const [guestList, setGuestList] = useState([props.guests]);
  let { error } = props;

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

    await props.addPseudoUser(guest);
    await props.getGuestList(props.match.params.eventId);

    e.target.parentNode.reset();

    // console.log(e.target.parentNode.firstName.value)
  };
  console.log("PROPS", props);
  // console.log(props.match.params);

  const deleteSelectedGuest = async (eventId, guestId) => {
    await props.removeGuest(eventId, guestId);
    await props.getGuestList(props.match.params.eventId);
    props.clearError();
  };

  error && error.response
    ? console.log("ERROR------->", error.response)
    : console.log("NO ERROR");
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
      {error && error.response ? <div> {error.response.data} </div> : <br />}
      <table>
        <tbody>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <button>Delete</button>
          </tr>

          {props.guests.map((guest) => {
            return (
              <tr key={guest.email}>
                <td>{guest.firstName}</td>
                <td>{guest.lastName}</td>
                <td>{guest.email}</td>
                <td>
                  <button
                    onClick={() =>
                      deleteSelectedGuest(props.match.params.eventId, guest)
                    }
                  >
                    X
                  </button>
                </td>
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
  guests: state.guestListReducer,
  error: state.userReducer.error,
});

const mapDispatch = (dispatch) => ({
  addPseudoUser: (user) => dispatch(addPseudoUser(user)),
  getGuestList: (id) => dispatch(getGuestList(id)),
  removeGuest: (eventId, guestId) => dispatch(removeGuest(eventId, guestId)),
  clearError: () => dispatch({ type: "CLEAR_ERROR" }),
});

export default connect(mapState, mapDispatch)(GuestList);
