// minor bug is there.. because only when clicking of button value get saved
// before clickling if we want to save that text value then it doesn't go for ajax call

$(document).ready(function(){

    // will do this when bug get fixed
    // var value = $('button').text();
    // console.log("text val>>>", value);
    // console.log("html val>>>", $('button').html());    
    // var followEmailId = $('button').attr('id');

    $('.btn-info').css('display','block');

    $('button').on('click', function(){
        var value = $(this).text();
        var followEmailId = $(this).attr('id');

        if ($(this).text() == "Follow") { 
            $(this).text("Unfollow"); 
        } else { 
            $(this).text("Follow"); 
        }; 

        //console for if condition
        if(value == "Follow"){
            console.log("Follow pe gya"); // for testing
            $.ajax({
                url: '/profile-*',
                type: 'PUT',
                dataType: 'json',
                data: {
                email: followEmailId
                },
                success: function() {
                    $("#followers").load(" #followers");
                    // will implement this when bug get fixed
                    // $('#followers').text(function(i, val) { return +val+1 });
                },
                error: function(error){
                    console.log(error);
                }
            });
        }
        if(value == "Unfollow"){
            console.log("Unfollow pe gya"); // for testing
            $.ajax({
                url: '/profile-*',
                type: 'DELETE',
                dataType: 'json',
                data: {
                email: followEmailId
                },
                success: function() {
                    $("#followers").load(" #followers");
                    // will implement this when bug get fixed
                    // $('#followers').text(function(i, val) { return +val-1 });
                },
                error: function(error){
                console.log(error);
                }
            });
        }
    });
})