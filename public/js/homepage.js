$(document).ready(function () {
    console.log("App is ready");
    // $('#postButton').on('click', function () {
    // });
        
    $('.likeButton').on('click', function () {
        if ($(this).css("color") === "rgb(0, 0, 255)") {
            console.log("You disliked this post!");
            // $('#likedtxt').remove();
            $(this).css("color", "black");
            $(this).animate({ fontSize: "16px" });
        }
        else {
            console.log("You liked this post!");
            $(this).css("color", "blue");
            // $(this).append("<span id='likedtxt'>Liked</span>");
            $(this).animate({ fontSize: "20px" });
        }
        id = $(this).attr('userId');
        console.log("id: ",id);
        $.post('/' + id, function (response) {
            console.log("response",response);
            $('fa-thumbs-o-up').text(response.likeCount);
            location.reload();
        });
    
    });
});