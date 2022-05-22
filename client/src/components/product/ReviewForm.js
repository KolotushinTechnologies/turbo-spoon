import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createReviewForProductCard } from "../../actions/productCard";

const ReviewForm = ({ createReviewForProductCard, id }) => {
  const [text, setText] = useState("");

  return (
    <form
      className="form__review"
      onSubmit={(e) => {
        e.preventDefault();
        createReviewForProductCard(text, id);
        setText("");
      }}
    >
      <textarea
        className="textarea__review"
        onChange={(e) => setText(e.target.value)}
        name="text"
        cols="30"
        rows="5"
        value={text}
        placeholder="Оставьте отзыв..."
        required
      />
      {text.length > 0 ? (
        <input
          type="submit"
          className="btn btn-dark my-1 button__review"
          value="Оставить Отзыв!"
        />
      ) : (
        <input
          disabled
          type="submit"
          className="btn btn-dark my-1 button__review"
          value="Оставить Отзыв!"
        />
      )}
    </form>
  );
};

ReviewForm.propTypes = {
  createReviewForProductCard: PropTypes.func.isRequired
};

export default connect(null, { createReviewForProductCard })(ReviewForm);
