$(function () {

    $("#full").fullpage({
        verticalCentered: false,
        navigation: true, // 顯示導行列
        navigationPosition: "left", // 導行列位置
        anchors: ["cyclist", "專屬騎行", "單車體驗", "最新活動", "Cy嚴選", "不可不知", "關於Cy"],
        navigationTooltips: ["cyclist", "專屬騎行", "單車體驗", "最新活動", "Cy嚴選", "不可不知", "關於Cy"],
        showActiveTooltip: true,
        keyboardScrolling: true,
        loopBottom: true,
    });

});


//------------------ footer
$('footer').css('height', '80px');


//------------------ activity輪播
$("#coverflow").flipster();
// 點擊顯示詳情
$('.open-detail').click(function () {
    console.log('test');
    $(this).parent().parent().parent().parent().next().addClass('open');
    $('.close-detail').on('click', function () {
        $(this).parent().parent().removeClass('open');
    })
    // $('.detail').css('opacity','1');
    // ??同一層找
})


//------------------ product輪播
$(document).ready(function () {

    // var i = 0;
    // var clone = $(".prod-list li").clone();//克隆第一張圖片
    // $(".prod-list li").append(clone);//復制到列表最後
    var size = $(".prod-list .prodContent").length; //獲取圖片總數量

    //對應總數量增加下方圓圈數
    for (var j = 0; j < size; j++) {
        $("#product ul.num").append("<li></li>");
    }
    $("#product .num li").eq(1).addClass("active");
    $(".prodContent").eq(1).find('.prod-bag').addClass('prod-bag-active');

    $('.prodContent').click(function () {
        $('.prod-bag').removeClass('prod-bag-active');
        $(this).find('.prod-bag').addClass('prod-bag-active');
    });
});