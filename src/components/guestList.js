import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addPseudoUser, getGuestList, removeGuest, updateUser, getEvent } from "../store";
import "../styles/guestList.css";
import '../styles/create.css';
import '../styles/single.css';
import { use } from "passport";

const GuestList = (props) => {
  const [guestList, setGuestList] = useState([props.guests]);
  let { error } = props;

  useEffect(() => {
    props.getGuestList(props.match.params.eventId);
  }, [guestList]);

  useEffect(() => {
    props.getEvent(props.match.params.eventId);
  }, [])

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

  const toggleEdit = (guestId) => {
    const form = document.getElementById(guestId);
    console.log('forrrrrmmmm', form);
    console.log(form.className === 'formHide');
    if (form.className === "formHide") {
      form.className = "formShow";
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
    toggleEdit(`guest${id}`);
    await props.updateUser(updatedUser);
    await props.getGuestList(props.match.params.eventId);
  }

  const selectText = (event) => {
    const input = event.target;
    input.focus();
    input.select();
  }

  return (
    <div className="singleContainer flex column aItemsC">
      <h1 style={{
        alignSelf: 'center',
        textDecoration: 'underline',
        textAlign: 'center',
        margin: '19px 0px 25px 0px',
      }}
      >
        Guest List for
        <br></br>
        {props.singleEvent.eventName}
      </h1>
      <div className="singleColumn flex column jContentC aItemsC">
        <form id="guest-list" className='flex column' style={{ width: '100%' }}>
          <div className='flex jContentSB marginBottom' >
            <label
              style={{ fontWeight: 'bold' }} htmlFor="first-name">First Name:</label>
            <input type="text" id="firstName" required />
          </div>
          <div className='flex jContentSB marginBottom'>
            <label
              style={{ fontWeight: 'bold' }} htmlFor="last-name">Last Name:</label>
            <input type="text" id="lastName" required />
          </div>
          <div className='flex jContentSB marginBottom'>
            <label
              style={{ fontWeight: 'bold' }} htmlFor="email">Email:</label>
            <input type="email" id="email" required />
          </div>
          <button type="button"
            className="button createButton" onClick={(e) => addGuest(e)}>
            Add New Guest
        </button>
        </form>
        {error && error.response ? <div> {error.response.data} </div> : <br />}
        <table className='guestListTable'>
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
        <button type="submit" className="button createButton" style={{ backgroundColor: '#e400678e' }}>Send Invites</button>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  user: state.userReducer,
  guests: state.guestListReducer,
  error: state.userReducer.error,
  singleEvent: state.eventReducer,
});

const mapDispatch = (dispatch) => ({
  addPseudoUser: (user) => dispatch(addPseudoUser(user)),
  getGuestList: (id) => dispatch(getGuestList(id)),
  removeGuest: (eventId, guestId) => dispatch(removeGuest(eventId, guestId)),
  clearError: () => dispatch({ type: "CLEAR_ERROR" }),
  updateUser: (user) => dispatch(updateUser(user)),
  getEvent: (id) => dispatch(getEvent(id)),
});

export default connect(mapState, mapDispatch)(GuestList);
