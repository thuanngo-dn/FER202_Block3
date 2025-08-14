import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div>
      <p>{user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
};

export default UserProfile;
