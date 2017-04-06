//===================================================
//DEPENDENCIES
//===================================================

var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// var Note = require("./mod")
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");
var request = require("request");
var cheerio = require("cheerio");

//===================================================
//MIDDLEWARE
//===================================================

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Make public a static dir
app.use(express.static("public"));
console.log(process.env.MONGODB_URI);
// Database configuration with mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/week18day3mongoose");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
});


//===================================================
//ROUTES
//===================================================

//GET route for scraping from website
app.get("/scrape", function(req, res) {
    request("https://www.nytimes.com/", function(error, response, html) {
        var $ = cheerio.load(html);
        $("article.story").each(function(i, element) {
            var result = {};
            // console.log(result);
            result.title = $(this).children("h2").text().trim();
            result.link = $(this).children().children("a").attr("href");
            result.summary = $(this).children("p.summary").text().trim();

            //Saving Article Model
            var entry = new Article(result);
            entry.save(function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(doc);
                    // res.json(doc);
                    //need to use handlebars
                    // response.render('index', {article_data});
                }
            });
        });
    });

    //When browser finished scraping
    res.send("Scrape Complete");
});

//Grab articles scraped
app.get("/articles", function(req, res) {
    //Goes into article collection and finds all entries.
    Article.find({}, function(err, doc) {
        if (err) {
            console.log(error);
        } else {
            res.json(doc);
        }
    });
});

// Grab an article by ObjectId
app.get("/articles/:id", function(req, res) {
    Article.findOne({ "_id": req.params.id })
    .populate("note")
    .exec(function(err, doc){
        if (err){
            console.log(err);
        }
        else {
            res.json(doc);
        }
    });
});











// Listen on port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log("App running on port 3000!");
});
