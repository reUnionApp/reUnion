import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addPseudoUser, getGuestList, removeGuest, updateUser } from "../store";
import "../styles/guestList.css";

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

  const toggleEdit = (email) => {
    const form = document.getElementById(email);
    if (form.className === "formHide") {
      form.className = "";
    } else {
      form.className = "formHide";
    }
  };

  const handleUpdate = async (event, id) => {
    const firstName = event.target.parentNode.parentNode.firstChild.firstChild.value;
    const lastName = event.target.parentNode.parentNode.firstChild.nextSibling.firstChild.value;
    const email = event.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.firstChild.value;

    const updatedUser = {
      firstName,
      lastName,
      email,
      id
    }

    await props.updateUser(updatedUser);
    await props.getGuestList(props.match.params.eventId);
    toggleEdit(`guest${id}`);
  }

  const selectText = (event) => {
    const input = event.target;
    input.focus();
    input.select();
  }

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
        <tbody id="parentTable">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </tbody>
        {props.guests.map((guest) => {
          return (
            <tbody key={guest.email}>
              <tr >
                <td className="flex">
                  {guest.firstName}
                </td>
                <td>
                  {guest.lastName}
                </td>
                <td>
                  {guest.email}
                </td>
                <td>
                  {guest.userType === 'registered' ? 'Registered User' : <button onClick={() => toggleEdit(`guest${guest.id}`)}>
                    Edit
                    </button>}

                </td>
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
              <tr id={`guest${guest.id}`} className="formHide">
                <td>
                  <input type="text" defaultValue={guest.firstName} onClick={(event) => selectText(event)} />
                </td>
                <td>
                  <input type="text" defaultValue={guest.lastName} onClick={(event) => selectText(event)} />
                </td>
                <td>
                  <input type="email" defaultValue={guest.email} onClick={(event) => selectText(event)} />
                </td>
                <td>
                  <button type='button' onClick={(event) => handleUpdate(event, guest.id)}>Update</button>
                </td>
              </tr>
            </tbody>
          );
        })}
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
  updateUser: (user) => dispatch(updateUser(user))
});

export default connect(mapState, mapDispatch)(GuestList);
