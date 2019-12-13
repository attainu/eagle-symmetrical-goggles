$(document).ready(function(){

    $('button').on('click', function(){
        var followEmailId = $(this).attr('id');
            $.ajax({
                url: '/profile-*',
                type: 'PUT',
                dataType: 'json',
                data: {
                email: followEmailId
                },
                success: function(res) {
                    console.log("response from follow wala >>", res);
                    $("#followers").load(" #followers");
                    if(res==true){
                        $(".btn").text("Unfollow")
                    }
                    if(res==false){
                        $(".btn").text("Follow")
                    }
                },
                error: function(error){
                    console.log(error);
                }
            });
    });
})