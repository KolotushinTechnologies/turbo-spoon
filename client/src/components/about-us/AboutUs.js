// Import Engine
import React from "react";
import { Link } from "react-router-dom";

// Import Styles
import "./AboutUs.css";
import Vasilisk from "../../img/Vasilisk.png";
import Wildeberries from "../../img/Wildeberries.png";
import Telegram from "../../img/Telegram.png";

const AboutUsPage = () => {
  return (
    <div className="main-section__about-us" id="page-wrap">
      <div className="first-section__about-us">
        <div className="description__about">
          <p>
            <b>VASILISK</b> - это бренд, который специализируется на
            производстве и продаже изделий ручной
            <br /> работы. Для нас главное качество того, что мы продаем,
            поэтому наши изделия такие красивые и удобные.
          </p>
          <br />
          <p>
            Все изделия выполнены с любовью и заботой, к<br /> любому заказу вы
            получаете подарок от бренда -<br /> стикер с нашим василиском в
            шапке.
            <br /> Не забудьте наклеить его на какое-нибудь
            <br /> интересное место!
          </p>
        </div>
        <div className="img__about">
          <img className="main-image-vasilisk" src={Vasilisk} width={250} />
        </div>
      </div>
      <div className="second-section__about-us">
        <div className="add__description">
          Не забывайте следить за нашими соцсетями, а так же переходите в
          телеграм, что бы узнать интересные факты или сделать заказ!
        </div>
        <div className="media__about">
          <Link to="wildeberries.com">
            <img src={Wildeberries} width={50} />
          </Link>
          <Link to="telegram.org">
            <img src={Telegram} width={50} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
