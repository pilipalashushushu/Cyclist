//會員狀態顯示
$(document).ready(function () {
    //檢查sessionStorage存在與否
    var memId = sessionStorage.getItem('memId');
    if (sessionStorage['memId'] != null || sessionStorage['memId'] != undefined) {

        //sessionStorage存在顯示該會員Id＆登出鈕
        $('header').find('#memberId').text(memId);
        $('header').find('#logout').text(' /登出');

        //點擊會員鈕，會進入該會員頁面
        $('.icon-3').click(function () {
            window.open('./member.html', '_self')
        });

        //點擊登出鈕，清除sessionStorage
        $('#logout').click(function () {
            sessionStorage.clear();
            location.reload([true]);s
        });
    } else {

        //未登入，點擊會員鈕，顯示登入畫面
        $('.icon-3').click(function () {
            $('#login-wrap').fadeIn('slow')
        });

        //點擊叉叉關閉燈箱
        $('#lightbox').click(function () {
            $('#login-wrap').fadeOut('slow')
        });

        //點擊'進行結帳'跳登入窗
        $('.total .nextPage').click(function(){
            $('#login-wrap').fadeIn('slow')
        });
    }
});