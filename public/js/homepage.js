$(document).ready(function () {
    console.log("App is ready");
    $('.likeButton').on('click', function () {
        id = $(this).attr('userId');
        console.log("id: ", id);
        $.ajax({
            url: '/' + id,
            type: 'PUT',
            success: function(response) {
                console.log("response", response);
                var myElement = $('#like-id-' + id);
                document.getElementById('likes-count-' + id).innerHTML = `${response.likeCount}`;
                if (myElement.css("color") === "rgb(0, 0, 255)") {
                        console.log("You disliked this post!");
                        myElement.css("color", "black");
                        myElement.animate({ fontSize: "16px" });
                    }
                    else {
                        console.log("You liked this post!");
                        myElement.css("color", "blue");
                        myElement.animate({ fontSize: "20px" });
                    }
            }
         });
        // $.post('/' + id, function (response) {
        //     console.log("response", response);
        //     document.getElementById('likes-count-' + id).innerHTML = `${response.likeCount}`;
            
        //     // location.reload();
        // });

    });
    $('.commentButton').on('click', function () {
        console.log("you clicked on comment button!");
        $('.textBox').append(
            '<div class="commentTextBox" title="commentTextBox">' +
                '<div>' +
                    '<div class= "mx-2">' +
                        '<textarea class="commentBox border round  mx-2 mt-2"  name="messageText" rows="1" cols="30" placeholder="Enter your comment here..."></textarea>' +
                        '<a href="#" class="btn btn-dark btn-sm active mb-4" role="button" aria-pressed="true">post</a>'+
                    '</div>' +               
                '</div>' +
            '</div>'
        );
    });
});
