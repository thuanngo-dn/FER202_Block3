import React, { useReducer, useMemo, useCallback } from "react";
import { Modal, Nav, Button, ProgressBar } from "react-bootstrap";
import StepAbout from "./StepAbout";
import StepAccount from "./StepAccount";
import StepAddress from "./StepAddress";
import { wizardReducer, wizardInitialState } from "../wizardReducer";

function ProfileWizard({ show, onHide, onFinish }) {
  const [state, dispatch] = useReducer(wizardReducer, wizardInitialState);

  const isStepValid = useMemo(() => {
    if (state.step === 0)
      return (
        state.about.name.trim() !== "" &&
        /\S+@\S+\.\S+/.test(state.about.email) &&
        state.about.age > 0
      );
    if (state.step === 1)
      return (
        state.account.username.length >= 6 &&
        state.account.password.length >= 8 &&
        state.account.password === state.account.confirmPassword &&
        state.account.secretQuestion &&
        state.account.answer
      );
    if (state.step === 2)
      return state.address.country && state.address.city && state.address.street;
    return false;
  }, [state]);

  const nextStep = useCallback(() => {
    if (isStepValid) dispatch({ type: "NEXT_STEP" });
  }, [isStepValid]);

  const prevStep = useCallback(() => dispatch({ type: "PREV_STEP" }), []);
  const onFieldChange = useCallback((section, field, value) => {
    dispatch({ type: "UPDATE_FIELD", section, field, value });//cập nhật field.
  }, []);

  const handleFinish = () => {
    if (onFinish) onFinish(state);//trả dữ liệu lên profile navbar
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Build Your Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Nav variant="tabs" activeKey={state.step}>
          <Nav.Item>
            <Nav.Link eventKey={0}>About</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={1}>Account</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={2}>Address</Nav.Link>
          </Nav.Item>
        </Nav>

        <div className="mt-3">
          {state.step === 0 && <StepAbout data={state.about} onChange={onFieldChange} />}
          {state.step === 1 && <StepAccount data={state.account} onChange={onFieldChange} />}
          {state.step === 2 && <StepAddress data={state.address} onChange={onFieldChange} />}
        </div>

        <ProgressBar
          now={((state.step + 1) / 3) * 100}
          className="mt-3"
          label={`${((state.step + 1) / 3) * 100}%`}
        />

        <div className="d-flex justify-content-between mt-3">
          <Button variant="secondary" disabled={state.step === 0} onClick={prevStep}>
            Previous
          </Button>
          {state.step < 2 ? (
            <Button variant="primary" onClick={nextStep} disabled={!isStepValid}>
              Next
            </Button>
          ) : (
            <Button variant="success" disabled={!isStepValid} onClick={handleFinish}>
              Finish
            </Button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ProfileWizard;
