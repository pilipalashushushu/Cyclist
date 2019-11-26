//會員狀態顯示
$(document).ready(function(){
    var memId = sessionStorage.getItem('memId');
    if(sessionStorage['memId'] != null || sessionStorage['memId'] != undefined ){
        $('header').find('#memberId').text(memId);
        $('header').find('#logout').text('登出');
    }
    $('.icon-3').click(function(){
        $('#login-wrap').fadeToggle('slow')
    });
    $('#lightbox').click(function(){
        $('#login-wrap').fadeToggle('slow')
    });
});
