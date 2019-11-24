$(document).ready(function(){
    
    $('button').css('display','block');

    // console.log("ready steady poo...");
    $('button').on('click', function(){
        var value = $(this).text();
        // console.log("click hua phle>>>", value);
        // console.log(re)
        var followEmailId = $(this).attr('id');
        if ($(this).text() == "Follow") { 
            $(this).text("Unfollow"); 
        } else { 
            $(this).text("Follow"); 
        }; 

        //console for if condition
        if(value == "Follow"){
            console.log("Follow pe gya");
            $.ajax({
                url: '/profile-*',
                type: 'PUT',
                dataType: 'json',
                data: {
                email: followEmailId
                },
                success: function() {
                    console.log("db m gya put k");
                },
                error: function(error){
                    console.log(error);
                }
            });
        }
        if(value == "Unfollow"){
            console.log("Unfollow pe gya");
            $.ajax({
                url: '/profile-*',
                type: 'DELETE',
                dataType: 'json',
                data: {
                email: followEmailId
                },
                success: function() {
                console.log("db m gya delete k");
                },
                error: function(error){
                console.log(error);
                }
            });
        }
    });
})