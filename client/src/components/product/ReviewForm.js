import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createReviewForProductCard } from "../../actions/productCard";

const ReviewForm = ({ createReviewForProductCard, id }) => {
  const [text, setText] = useState("");

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        createReviewForProductCard(text, id);
        setText("");
      }}
    >
      <textarea
        onChange={(e) => setText(e.target.value)}
        name="text"
        cols="30"
        rows="5"
        value={text}
        placeholder="Оставьте Отзыв"
        required
      />
      <input
        type="submit"
        className="btn btn-dark my-1"
        value="Оставить Отзыв!"
      />
    </form>
  );
};

ReviewForm.propTypes = {
  createReviewForProductCard: PropTypes.func.isRequired
};

export default connect(null, { createReviewForProductCard })(ReviewForm);
