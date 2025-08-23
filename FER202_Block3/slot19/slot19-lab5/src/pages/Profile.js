import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Card } from "react-bootstrap";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <div className="container my-4">Please login to view profile.</div>;

  return (
    <div className="container my-4" style={{maxWidth: 600}}>
      <Card>
        <Card.Body>
          <h3>Profile</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
