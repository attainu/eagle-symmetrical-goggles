$(document).ready(function () {
    console.log("App is ready");
    $('.likeButton').on('click', function () {
        id = $(this).attr('userId');
        console.log("id: ", id);
        $.ajax({
            url: '/' + id,
            type: 'PUT',
            success: function (response) {
                console.log("like response", response);
                document.getElementById('likes-count-' + id).innerHTML = `${response.likeCount}`;
                var myElement = $('#like-id-' + id);
                // if (myElement.css("color") === "rgb(0, 0, 255)") {
                if(response.flag == 1) {
                    console.log("You liked this post!");
                    myElement.css("color", "blue");
                    myElement.animate({ fontSize: "18px" });
                }
                // else {
                //     console.log("You disliked this post!");
                //     myElement.css("color", "black");
                //     myElement.animate({ fontSize: "16px" });
                // }
                setTimeout(function () {
                    myElement.css("color", "black");
                    myElement.animate({ fontSize: "16px" });
                  }, 500);
            }
        });
    });
    $('.commentPostButton').on('click', function () {
        console.log("you clicked on comment button!");
        cId = $(this).attr('userCommentId');
        console.log("Post ID",cId);
        $.ajax({
            url: '/comment',
            type: 'post',
            success: function (response) {
                console.log("comment Posted");
                // $('.textBox').append(
                //     '<div class="commentTextBox" title="commentTextBox">' +
                //         '<div>' +
                //             '<div class= "mx-2">' +
                //                 '<textarea class="commentBox border round  mx-2 mt-2"  name="messageText" rows="1" cols="40" placeholder="Enter your comment here..."></textarea>' +
                //                 '<button type="button" class="btn btn-secondary btn-sm">Post</button>' +
                //             '</div>' +
                //         '</div>'+
                //     '</div>'
                // );
            }
        });
    });
});
