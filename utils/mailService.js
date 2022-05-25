const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      seucre: false,
      auth: {
        user: "vaseliskshop@gmail.com",
        pass: "pass69word"
      }
    });
  }

  async sendOrderInfo(
    to,
    fullNameUser,
    numberOrder,
    methodDelivery,
    price,
    countProducts
  ) {
    await this.transporter.sendMail({
      from: "vaseliskshop@gmail.com ",
      to,
      subject: "Оформление Заказа в Интернет-Магазине Vasilisk",
      text: "",
      html: `
        <div>
          <h1>Доброго Времени Суток ${fullNameUser}!</h1>
          <h3>Ваш ${numberOrder}</h3>
          <h3>Способ Доставки: ${methodDelivery}</h3>
          <h3>Общая Стоимость Заказа: ${price}</h3>
          <h3>Количество Товаров В Заказе: ${countProducts}</h3>
        </div>
      `
    });
  }
}

module.exports = new MailService();
