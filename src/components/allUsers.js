import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../store';

function AllUsers(props) {
  useEffect(() => {
    props.getUsers();
  }, []);
  return (
    <div>
      <h2>All Users:</h2>
      {props.users &&
        props.users.map((user) => {
          return (
            <div key={user.id}>
              <ul>
                <li>{user.firstName}</li>
              </ul>
            </div>
          );
        })}
    </div>
  );
}

const mapState = (state) => ({
  users: state.allUsersReducer,
});

const mapDispatch = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
});

export default connect(mapState, mapDispatch)(AllUsers);
