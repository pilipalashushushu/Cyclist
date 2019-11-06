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

// //------------------ scroll fullPage
// var myFullpage = new fullpage('.fullpage', {
//     verticalCentered: false,
//     css3: false
// });


// //------------------ side_nav
// $(function () {
//     //side_nav 顯示後自動隱藏
//     $('.side_nav-label').css("opacity", 1);
//     setTimeout(function () {
//         $('.side_nav-label').css("opacity", 0)
//     }, 2500);

//     //第一個side_nav-item默認選中效果
//     $(".side_nav-item").first().addClass("side_nav-selected");
// })

// //scroll後添加移除屬性
// $(function () {
//     var nowPage = 0;
//     var lock = true;

//     function active() {
//         $('.side_nav-item').eq(nowPage).addClass('side_nav-selected').siblings().removeClass('side_nav-selected');

//         $('.side_nav-item').eq(nowPage).find('.side_nav-label').css("opacity", 1);

//         setTimeout(function () {
//             $('.side_nav-label').css("opacity", 0)
//         }, 2500);
//     }

//     $(document).mousewheel(function (event, delta) {
//         if (lock) {
//             nowPage = nowPage - delta; //delta:-1 ->向下 :1 ->向上
//             if (nowPage < 0) {
//                 nowPage = 0;
//             }
//             if (nowPage > 7) {
//                 nowPage = 7;
//             }
//             active();
//             lock = false;
//             setTimeout(function () {
//                 lock = true;
//             }, 2500);
//         }
//     });
// });

// //side_nav scroll後顯示後再度隱藏
// $(document).scroll(function () {
//     $('.side_nav-label').css("opacity", 1);
//     setTimeout(function () {
//         $('.side_nav-label').css("opacity", 0)
//     }, 2500);
// });

// //side_nav hover顯示
// $(function () {
//     $('.side_nav-item').hover(function () {
//         $(this).find('.side_nav-label').css("opacity", 1); // 滑鼠懸浮時觸發
//     }, function () {
//         $('.side_nav-label').css("opacity", 0); // 滑鼠離開時觸發
//     })
// })

//------------------ footer
$('footer').css('height', '80px');