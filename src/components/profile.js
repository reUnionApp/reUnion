import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getUser, deleteUser, me } from "../store";
import { Link } from "react-router-dom";
import history from "../history";
import "../styles/profile.css";

const Profile = (props) => {
  const goToUpdateProfile = () => {
    props.history.push("/updateprofile");
  };

  // const [profile, setProfile] = useState(props.auth);

  // props.getUser(props.auth.id);
  useEffect(() => {
    props.me();
  }, []);
  return (
    <div id="profileContainer" className="background2Up">
      <div className="w100 flex jContentSB aItemsC">
        <h1
          style={{ marginLeft: "15px" }}
        >{`${props.auth.firstName}'s Profile`}</h1>
        <button
          style={{ marginRight: "15px" }}
          type="button"
          className="button updateProfile yellow"
          onClick={goToUpdateProfile}
        >
          Update Profile
        </button>
      </div>
      <div style={{ margin: "36px 0px 36px 36px" }}>
        <h4>
          Email: <span className="light">{props.auth.email}</span>
        </h4>
        <h4>
          Dietary Restrictions:{" "}
          {props.auth.dietaryRestrictions ? (
            <span className="light">{props.auth.dietaryRestrictions}</span>
          ) : (
            <span className="light">None</span>
          )}
        </h4>
        <h4>
          Special Requests:{" "}
          {props.auth.specialRequests ? (
            <span className="light">{props.auth.specialRequests}</span>
          ) : (
            <span className="light">None</span>
          )}
        </h4>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  auth: state.authReducer,
});

const mapDispatch = (dispatch) => ({
  me: () => dispatch(me()),
  getUser: (userId) => dispatch(getUser(userId)),
  deleteUser: (userId) => dispatch(deleteUser(userId)),
});

export default connect(mapState, mapDispatch)(Profile);
