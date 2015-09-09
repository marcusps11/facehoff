var http        = require("http");
var fs          = require('fs');
var express     = require('express');
var app         = express();
var gm          = require('gm').subClass({imageMagick: true});
var bodyParser  = require("body-parser");
var path        = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.set('views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {

  res.render('home')

});


app.get("/:width/:height", function(req, res) {

  var width = parseInt(req.params.width);
  var height = parseInt(req.params.height);
  var filename = 'output_'+ width +'_'+ height +'.png';
  var filePath = path.join(__dirname, './public/' + filename);
  res.set('Content-Type', 'image/jpeg');

  var pictureArray = ['public/hoff/bayhoff.jpg','public/hoff/hoffguard.jpg','public/hoff/smallhassle.png', 'public/hoff/hassletop.png','public/hoff/singhoff.jpg','public/hoff/davidbay.jpg','public/hoff/davidgold.jpg','public/hoff/davidhair.jpg', 'public/hoff/davidpuppy.jpg','public/hoff/davidsocks.jpg','public/hoff/davidsupercar.jpg'];
  var largePicture = ['public/hoff/davidpants.jpg', 'public/hoff/eaglehoff.jpg', 'public/hoff/hassletoff.png', 'public/hoff/80hassle.png','public/hoff/oldhoff.png', 'public/hoff/pamelahoff.png','public/hoff/davidbeach.jpg','public/hoff/davidpump.jpg','public/hoff/davidsmile.png','public/hoff/davidvintage.jpg'];
  var widthArray = ['public/hoff/daviddog.jpg','public/hoff/burger.png','public/hoff/davidbed.jpg']

  var randomSmallImage = pictureArray[Math.floor(Math.random()*pictureArray.length)];
  var randomImageLarge = largePicture[Math.floor(Math.random()*largePicture.length)];
  var randomImageWide = widthArray[Math.floor(Math.random()*widthArray.length)];


  function getLargePicture(width, height, randomImageLarge){
    // console.log(randomImageLarge)
    // console.log('hi i am big')

    var readStream = fs.createReadStream(randomImageLarge);
    gm(readStream)
    .resize(width, height, '^')
    .gravity('North')
    .crop(width, height)
    .stream(function (err, stdout, stderr) {
      if (err) throw err;
      var writeStream = fs.createWriteStream('./public/' + filename);
      stdout.pipe(res)
      // console.log("done");
    });
  }

  function getSmallPicture(width, height, randomSmallImage){
    // console.log(randomSmallImage)
    // console.log('hi i am small')

    var readStream = fs.createReadStream(randomSmallImage);
    gm(readStream)
    .resize(width, height, '^')
    .gravity('North')
    .crop(width, height)
    .stream(function (err, stdout, stderr) {
      if (err) throw err;
      var writeStream = fs.createWriteStream('./public/' + filename);
      stdout.pipe(res)
      // console.log("done");
    });
  }


  if (width > 300 && height > 300) {
    getLargePicture(width, height, randomImageLarge)
  } else {
    getSmallPicture(width, height, randomSmallImage)
  }

})

app.listen(process.env.PORT || 3000 )