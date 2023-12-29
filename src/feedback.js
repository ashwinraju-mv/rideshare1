import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

const Feedback = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [submitted, setSubmitted] = useState(false);
  const [modifiedRating, setModifiedRating] = useState(0);
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleSubmit = () => {
    if (currentValue === 0) {
      toast.error("Kindly provide your rating between 1-5 stars");
      return;
    }
    toast.success("Thanks for your feedback");
    setSubmitted(true);
    setModifiedRating(currentValue);
  };

  const handleModifyRating = () => {
    setCurrentValue(modifiedRating);
    setSubmitted(false);
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
      }, 60000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <h2>How would you rate your ride?</h2>
      <h4>Select between 1-5 stars</h4>
      <div className="d-flex">
        {submitted
          ? stars.map((_, index) => (
              <FaStar
                key={index}
                size={24}
                color={modifiedRating > index ? "orange" : "grey"}
                style={{
                  marginRight: 10,
                  cursor: "default",
                }}
              />
            ))
          : stars.map((_, index) => (
              <FaStar
                key={index}
                size={24}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={(hoverValue || currentValue) > index ? "orange" : "grey"}
                style={{
                  marginRight: 10,
                  cursor: "pointer",
                }}
              />
            ))}
      </div>
      <textarea
        placeholder="Additional feedback or Comments (If Any)"
        className="form-control"
        style={{ margin: "20px 0", minHeight: 100, width: 300 }}
        disabled={submitted}
      ></textarea>
      {submitted ? (
        <button className="btn btn-primary" onClick={handleModifyRating}>
          Modify Rating
        </button>
      ) : (
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      )}
      {submitted && (
        <p className="mt-3">Feedback can be modified within 60 seconds after submission</p>
      )}
    </div>
  );
};

export default Feedback;