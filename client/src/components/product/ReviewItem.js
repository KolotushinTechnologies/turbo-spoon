// Import Engine
import React, { Fragment } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { connect } from "react-redux";

// Import Styles
import DefaultAvatar from "../../img/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";

const ReviewItem = ({
  review: { user, avatar, text, date, name },
  userWork: { isAuthenticated }
}) => (
  <div className="post p-1 my-1 post__review">
    <div>
      <div>
        <img
          className="round-img"
          src={avatar ? avatar : DefaultAvatar}
          alt=""
        />
      </div>
    </div>
    <div>
      <p className="name__review">{name}</p>
      <p className="my-1">{text}</p>
      <p className="post-date">Опубликовано {formatDate(date)}</p>
    </div>
  </div>
);

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  userWork: state.userWork
});

export default connect(mapStateToProps, {})(ReviewItem);
