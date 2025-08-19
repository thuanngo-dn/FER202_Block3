import React from "react";
import { Modal, Card } from "react-bootstrap";
import PropTypes from "prop-types";

const fallbackAvatar =
  "https://via.placeholder.com/150x150.png?text=No+Avatar";

function ProfilePreview({ show, onHide, profile }) {
  // ✅ Fix lỗi trim khi avatar chưa có
  const avatar = (profile?.about?.avatar ?? "").trim() || fallbackAvatar;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Your Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Img
            variant="top"
            src={avatar}
            alt="Profile Avatar"
            style={{ width: "150px", height: "150px", objectFit: "cover", margin: "1rem auto", borderRadius: "50%" }}
          />
          <Card.Body>
            <h5>About</h5>
            <p><b>Name:</b> {profile?.about?.name}</p>
            <p><b>Email:</b> {profile?.about?.email}</p>
            <p><b>Age:</b> {profile?.about?.age}</p>

            <h5 className="mt-3">Account</h5>
            <p><b>Username:</b> {profile?.account?.username}</p>
            <p><b>Secret Question:</b> {profile?.account?.question}</p>
            <p><b>Answer:</b> {profile?.account?.answer}</p>

            <h5 className="mt-3">Address</h5>
            <p><b>Country:</b> {profile?.address?.country}</p>
            <p><b>City:</b> {profile?.address?.city}</p>
            <p><b>Street:</b> {profile?.address?.street}</p>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}

ProfilePreview.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    about: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      avatar: PropTypes.string,
    }),
    account: PropTypes.shape({
      username: PropTypes.string,
      question: PropTypes.string,
      answer: PropTypes.string,
    }),
    address: PropTypes.shape({
      country: PropTypes.string,
      city: PropTypes.string,
      street: PropTypes.string,
    }),
  }),
};

export default ProfilePreview;
