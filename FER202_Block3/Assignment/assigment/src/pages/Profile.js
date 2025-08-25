// src/pages/Profile.js
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Card, Image } from "react-bootstrap";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="container my-4">
        <h5 className="text-danger">⚠️ Please login to view profile.</h5>
      </div>
    );
  }

  return (
    <div className="container my-4" style={{ maxWidth: 600 }}>
      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="mb-3">👤 My Profile</h3>

          {/* Avatar */}
          {user.avatar && (
            <div className="text-center mb-3">
              <Image
                src={user.avatar}
                alt="avatar"
                roundedCircle
                height={100}
                width={100}
              />
            </div>
          )}

          {/* Thông tin cơ bản */}
          <p>
            <strong>Full Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>

          {/* Secret Q&A */}
          <p>
            <strong>Secret Question:</strong>{" "}
            {user.question === "pet"
              ? "Your first pet?"
              : user.question === "school"
              ? "Your primary school?"
              : "Your favorite color?"}
          </p>
          <p>
            <strong>Answer:</strong> {user.answer ? "******" : "(not set)"}
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
