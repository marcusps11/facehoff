var http        = require("http");
var fs          = require('fs');
var express     = require('express');
var app         = express();
var im          = require("imagemagick");
var bodyParser  = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get("/:width/:height", function(req, res) {

  var pictureArray = ['public/bayhoff.jpg','public/daviddog.jpg'];
  var largePicture = ['public/davidpants.jpg', 'public/seahoff.jpg'];

  var width = parseInt(req.params.width);
  var height = parseInt(req.params.height);

  var randomImage = pictureArray[Math.floor(Math.random()*pictureArray.length)];
  var randomImageLarge = largePicture[Math.floor(Math.random()*largePicture.length)];

  getPicture(width, height, randomImage, randomImageLarge);

  function getPicture(width, height, randomImageLarge, randomImage){
    if (width > 200){
      console.log(randomImageLarge)
      console.log('hi i am big')
      var options = {
        width: parseInt(req.params.width),
        height: parseInt(req.params.height),
        srcPath: randomImageLarge,
        dstPath: "public/output.png"
      };
      im.crop(options, function(err) {
        if(err) { throw err; }
        res.render('index')
      });

    } else {
      console.log('Hi Im small')
      var options = {
        width: parseInt(req.params.width),
        height: parseInt(req.params.height),
        srcPath: randomImage,
        dstPath: "public/output.png"
      };
      im.crop(options, function(err) {
        if(err) { throw err; }
        res.render('index')
      });
    }


  }
  // srcData: fs.readFileSync('kittens.jpg', 'binary'),

})
app.get('/', function(req, res){
  res.render('home')
});

app.listen(3000);



