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
    $('.commentPostButton').on('click', function (e) {
        e.preventDefault();
        console.log("you clicked on comment post button!"); 
        // id = $(this).attr('userCommentId');
        // msg = $('#id-').val();
        // console.log("comment",msg);
        // console.log("comment post ID",id);
        // $.ajax({
        //     url: '/comment' + id,
        //     type: 'post',
        //     data: msg,
        //     success: function (data) {
        //         console.log("comment Posted",data);
        //     }
        // });
    });
});
