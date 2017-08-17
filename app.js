const keyPublishable = "pk_test_6pRNASCoBOKtIshFeQd4XMUh"; // or const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = "sk_test_BQokikJOvBiI2HlWgH4olfQ2"; // or const keySecret = process.env.SECRET_KEY;

const app = require("express")();
const stripe = require("stripe")(keySecret);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var my_amount = {amount: 12.34, currency: "USD"};

app.get("/", (req, res) =>
  res.render("index.pug", {keyPublishable, my_amount}));

app.post("/charge", (req, res) => {
  let amount = my_amount.amount * 100;

  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
         currency: my_amount.currency,
         customer: customer.id
    }))
  .then(charge => res.render("charge.pug", {my_amount}));
});

app.listen(3000);
