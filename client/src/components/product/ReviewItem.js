import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { connect } from "react-redux";

const ReviewItem = ({
  review: { user, text, date, name },
  userWork: { isAuthenticated }
}) => (
  <div className="post p-1 my-1 post__review">
    <div>
      <Link to={`/profile/${user}`}>
        {/* <img className="round-img" src={avatar} alt="" /> */}
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
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
