var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser")
app.use(cors());
app.use(bodyParser());



var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/product');

var Product = mongoose.model('Products', {name: String});

/*var product = new Product({name: "Webstorm"});
product.save(function(err){
    if (err) {
        console.log('failed');
    } else {
        console.log('success');
    }
})
*/

app.get("/", function (req, res){
    Product.find(function(err,products){
        res.send(products);
    })
})

app.get("/products", function (req, res){
    console.log(req.query.name);

    var r = new RegExp(req.query.name,'i');
    Product.find({name: {$regex:r}},function(err,products){
        res.send(products);
    })
})

app.post("/products/add", function( req, res){
    var name = req.body.name;

    var product = new Product({name:name});
    product.save(function(err){
        if (err) {
            console.log('failed');
        } else {
            res.send();
        }
    });
})

app.post("/products/delete", function( req, res){
    var name = req.body.name;

    //var product = new Product({name:name});
    Product.remove((), function(err){
        if (err) {
            console.log('failed');
        } else {
            res.send();
        }
    });
})

app.listen(3000);