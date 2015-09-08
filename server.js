var http        = require("http");
var fs          = require('fs');
var express     = require('express');
var app         = express();
var im          = require("imagemagick");
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
  // res.writeHead(200, {"Content-Type" : "image/png"});

  var pictureArray = ['public/hoff/bayhoff.jpg','public/hoff/daviddog.jpg','public/hoff/hoffguard.jpg','public/hoff/burger.png','public/hoff/smallhassle.png', 'public/hoff/hassletop.png','public/hoff/singhoff.jpg'];
  var largePicture = ['public/hoff/davidpants.jpg', 'public/hoff/seahoff.jpg', 'public/hoff/eaglehoff.jpg', 'public/hoff/hassletoff.png', 'public/hoff/80hassle.png','public/hoff/oldhoff.png', 'public/hoff/pamelahoff.png'];

  var randomSmallImage = pictureArray[Math.floor(Math.random()*pictureArray.length)];
  var randomImageLarge = largePicture[Math.floor(Math.random()*largePicture.length)];

  function getLargePicture(width, height, randomImageLarge){
    console.log(randomImageLarge)
    console.log('hi i am big')

    im.crop({
      srcData: fs.readFileSync(randomImageLarge, 'binary'),
      width: parseInt(req.params.width),
      height: parseInt(req.params.height),
      gravity: 'center'
    }, function(err, stdout, stderr){
      if (err) throw err
        fs.writeFile('./public/' + filename, stdout, 'binary');
      fs.createReadStream(filePath).pipe(res);
    });
  }

  function getSmallPicture(width, height, randomSmallImage){
    console.log(randomSmallImage)
    console.log('hi i am small')

    im.crop({
      srcData: fs.readFileSync(randomSmallImage, 'binary'),
      width: parseInt(req.params.width),
      height: parseInt(req.params.height),
      gravity: 'center'
    }, function(err, stdout, stderr){
      if (err) throw err
        fs.writeFile('./public/' + filename, stdout, 'binary');
      fs.createReadStream(filePath).pipe(res);
    });
  }

  if (width > 300 && height > 300) {
    getLargePicture(width, height, randomImageLarge)
  } else {
    getSmallPicture(width, height, randomSmallImage)
  }

})

app.listen(process.env.PORT || 3000 )