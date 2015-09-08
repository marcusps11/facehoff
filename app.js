$(document).ready(function(){
  var pictureArray = ['/img/Mona-Lisa-200x200.jpg','/img/1000x500pixels.gif'];

  var largePicture = ['/img/ipswich.jpg'];



  $('#formFor').on("submit", function(){
    var width = parseInt($('#width').val());

    var height = parseInt($('#height').val())
    var randomImage = pictureArray[Math.floor(Math.random()*pictureArray.length)];
    var randomImageLarge = largePicture[Math.floor(Math.random()*largePicture.length)];
    getPicture(width, height, randomImage, randomImageLarge);
    function getPicture(width, height, randomImageLarge, randomImage){
      if (width > 200){
        var test = $(this).attr('src', randomImageLarge)
        alert(test)
        
        console.log(test)
        return test
      } else {

        alert('show small image');
        var small = $('.image').attr(src, randomImage.toString())
        console.log(small)
      }

    }


  });
})