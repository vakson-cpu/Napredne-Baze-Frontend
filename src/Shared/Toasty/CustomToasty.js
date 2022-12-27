import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
const CustomToasty = ({
  title,
  description,
  show,
  handleShow,
  color,
  textColor,
  position,
}) => {
  return (
    <div>
      <ToastContainer className='w-100'position={position}>
        <Toast
          bg={color}
          variant={color}
          position={position}
          show={show}
          onClose={() => handleShow(!show)}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body className={textColor}>{description}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default CustomToasty;
