/*IMPORTANT: Make sure you fill in your secret API key into the stripe module.*/
var stripe = require('stripe')(SECRECT_KEY);

module.exports = function(app){
    app.get('/stripe',
        function(req,res)
        {
            res.json({}); //Send out blank data for now.
        }
    );

    app.post('/stripe',
        function(req,res)
        {
            var transaction = req.body;
            var stripeToken = transaction.stripeToken;

            //For now, charge $10.00 to the customer.
            var charge =
            {
                amount: AMOUNT, //Charge is in cents
                currency: CURRENCY,
                card: stripeToken //Card can either be a Stripe token, or an object containing credit card properties.
            };

            stripe.charges.create(charge,
                //All stripe module functions take a callback, consisting of two params:
                // the error, then the response.
                function(err, charge)
                {
                    if(err)
                        console.log(err);
                    else
                    {
                        res.json(charge);
                        res.text('Successful charge sent to Stripe!');
                    }
                }
            );

        }
    );
};
