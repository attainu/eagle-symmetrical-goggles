$(document).ready(function () {
    console.log("App is ready");
    // $('#postButton').on('click', function () {
    // });
    // function updateLikes () {};
        
    $('.likeButton').on('click', function () {
        if ($(this).css("color") === "rgb(0, 0, 255)") {
            console.log("You disliked this post!");
            $('#likedtxt').remove();
            $(this).css("color", "black");
            $(this).animate({ fontSize: "16px" });
        }
        else {
            console.log("You liked this post!");
            $(this).css("color", "blue");
            $(this).append("<span id='likedtxt'>Liked</span>");
            $(this).animate({ fontSize: "20px" });
        }

        id = $(this).attr('userId');
        console.log("id: ",id);
        $.post('/' + id, function (response) {
            $('fa-thumbs-o-up').text(response.likeCount);
            //and update likes counter with response
        })
    
    });
});
    // For posting status => code starts from here
/*$('#postButton').on('click', function () {
    console.log("you clicked me!");
    var item = $('#postMessage');
    var post = {
        userName: "afroz",
        post: item.val(),
        time: (new Date(new Date - 1))
    };
    // console.log(post);
    $.ajax({
        type: 'post',
        url: '/',
        data: post,
        success: function (data) {
            location.reload();
            console.log(data);
        },
        error: function (error) {
            console.log("Error", error);
        }
    });
    return false;
});*/
    // For posting status => code ends here


/*
// For storing Like => code starts from here

   $('#likeButton').on('click', function () {
      //console.log("You clicked me!");

      fetch('/clicked', {
          method: 'POST'
      }).then(function (response) {
          if (response.ok) {
              //console.log('Click was recorded');
              return;
          }
          throw new Error('Request failed.');
      }).catch(function (error) {
          console.log(error);
      });
  });

  setInterval(function() {
      fetch('/clicks', {
          method: 'GET'
      }).then(function(response) {
          if(response.ok) {
              return response.json();
          }
          throw new Error('Request failed.');
      }).then(function(data) {
          document.getElementById('counter').innerHTML = `${data.length}`;
      }).catch(function(error) {
          console.log(error);
      });
  }, 50);
// For storing Like => code ends here
*/