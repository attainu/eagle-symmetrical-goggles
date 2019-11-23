$(document).ready(function() {
  console.log("ready");

    $('.followButton').on('click', function(){
      // console.log(req.session.user);
        var followEmailId = $(this).attr('id');
        // var buttonValue = $(this).text();
        // console.log(buttonValue);
        // event.preventDefault();
            console.log("follow");
            $.ajax({
                url: '/search-*',
                type: 'PUT',
                dataType: 'json',
                data: {
                email: followEmailId
                },
                success: function(result) {
                    console.log(result);
                },
                error: function(error){
                    console.log(error);
                }
            });
    });
        $('.unfollowButton').on('click', function(){
          console.log("unfollow");
            var followEmailId = $(this).attr('id');
            // var buttonValue = $(this).text();
            $.ajax({
                url: '/search-*',
                type: 'DELETE',
                dataType: 'json',
                data: {
                  email: followEmailId
                },
                success: function(result) {
                  console.log(result);
                },
                error: function(error){
                  console.log(error);
                }
            });
    });
});