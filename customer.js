var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	user: 'root',

	password: 'Hurley#123',
	database: 'bamazon'
});

function start() {
    connection.query('SELECT * FROM products', function(err, res){
        if (err) throw err;
        console.log("------------Welcome to Bamazon------------")
        console.log("-------------------------------------------")

        for(var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + "|" + "Product: " + res[i].product_name + "|" + "Department: " + res[i].department_name + "|" + "Price: " + res[i].price + "|" + "Quantity: " + res[i].stock_quantity);
            console.log("-------------------------------------------------------");
        }

        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "What is the ID of the product you would like to purchase?",
                validate: function(value) {
                    if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
                        return true;
                      } else{
                        return false;
                      }
                }
            },
            {
                type: "input",
                name: "qty",
                message: "How much would you like to purchase?",
                validate: function(value){
                    if(isNaN(value)){
                        return false;
                      } else{
                        return true;
                      }
                }
            }
        ]).then(function(ans){
            var whatBuy = (ans.id) - 1;
            var howMuch = parseInt(ans.qty);
            var total = parseFloat(((res[whatBuy].Price)*howMuch).toFixed(2));

            if(res[whatBuy].stock_quantity >= howMuch) {
                connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: (res[whatBuy].stock_quantity - howMuch)},{item_id : ans.id}], function(err, res){
                    if (err) throw err;
                    console.log("Success! Your total is $" + total.toFixed(2) + ". Your item(s) will be shipped in 3-5 days!");
                    reprompt();
                });

            }

        })
    })
}

function reprompt(){
    inquirer.prompt([{
      type: "confirm",
      name: "reply",
      message: "Would you like to purchase another item?"
    }]).then(function(ans){
      if(ans.reply){
        start();
      } else{
        console.log("Thanks! Come Again!");
      }
    });
}
  
start();