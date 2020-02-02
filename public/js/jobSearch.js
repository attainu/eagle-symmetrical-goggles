$(document).ready(function() {
    $('body').on('click', '.apply-btn', function(event) {
        event.preventDefault();
        var jobId = $(this).attr('jobId');
        //console.log(jobId);
        $.ajax({
            url:'/applyjob',
            method: 'GET',
            data:{jobId: jobId}
        }).done(function(data){
            console.log(data);
            //alert("Applied to the job Successfully!");
        })
        $(this).parent().parent().empty();
       $('#'+jobId).html('<div class="alert alert-success col" role="alert">Applied to the Job Successfully!</div>');
    })
})