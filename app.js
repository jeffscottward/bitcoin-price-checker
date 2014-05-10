// Quandl Module
var Quandl = require("quandl");
var quandl = new Quandl({ auth_token: "byuzqkDGF1XwnvSwxqfu" });

// Printing in Console
var Table = require('cli-table');
var table = new Table({colWidths: [20, 40]});

// Only USD Supported Exchanges are Listed in the Array
// http://www.quandl.com/help/api-for-bitcoin-data
var exchangeCodes = ["ANXHK","B2C","B7","BCMBM","BCMLR","BCMMB","BCMML","BCMPP","BITBOX","BITFLOOR","BITKONAN","BITME","BITSTAMP","BTC24","BTCE","BTCEX","BTCTREE","CBX","CRYPTOX","CRYTR","EXCHB","FBTC","FRESH","GLOBAL","ICBIT","IMCEX","INTRSNG","JUST","LOCALBTC","LYBIT","MTGOX","RIPPLE","ROCK","RUXUM","THLR","VCX","WEEX"];

// ForEach exchange listed
// TODO: Use Promises/A+ (BlueBird module?) to wait for all of them to come back first
exchangeCodes.forEach(function(exchange){

  // Grab data set from Quandl
  quandl.dataset({ source: "BITCOIN", table: exchange + "USD" }, function(error, response){
    
    // Error out first if thats the case
    if(error) {throw error;}

    // Parse JSON String
    var responseJSON = JSON.parse(response);

    // If there is data present...
    if (responseJSON.data !== undefined && responseJSON.data[0][7]) {

      // Push to an array for sorting
      // cli-table docs say its an array they give you
      table.push(
        [ exchange, responseJSON.data[0][7] ]
      );
      
      // Sort in ascending order
      // http://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
      table.sort(function(a, b) {return a[1] - b[1]});
    }

  });

});

// This is just dumb.... should be a callback
// Wait 4 seconds before printing them all
setTimeout(function(){
  console.log(table.toString());
},4000);