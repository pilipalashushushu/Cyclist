//fullpage
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

    //預設底色
    $(".prodContent").eq(0).find('.prod-bag').addClass('prod-bag-active');
    $("#product .num li").eq(0).addClass("active");

    //桌機版
    if ($('#product').width() > 768) {
        $(function () {
            let divwidth = $(".prodContent").width(); //div寬度
            let imgcount = $(".prod-list li").length; //圖片數量 

            //把ul的寬度設為 div寬度*圖片數量
            $(".prod-list").width(divwidth * imgcount);
            //把圖片li寬度設定和div一樣寬
            $('.prod-list li').width(divwidth);
            //利用圖片張數建立對應的按鈕數量
            for (let i = 0; i < imgcount; i++) {
                $(".num").append("<li></li>");
                $(".num li").eq(0).addClass("active");
            }
            //點選點點換圖
            $(".num li").click(function () {
                //抓取按鈕索引
                let index = $(this).index();
                // console.log(index)

                //移動的位置為圖片索引*寬度
                if (index < 3) {
                    $(".prod-list").animate({
                        left: (divwidth * index * -1)
                    }, 1000)
                } else {
                    $(".prod-list").animate({
                        left: (divwidth * 2 * -1)
                    }, 1000)
                }

                $(".prod-bag").removeClass('prod-bag-active');

                $(".prodContent").eq(index).find('.prod-bag').addClass('prod-bag-active');

                $("#product .num li").not(this).removeClass("active");
                $(this).addClass("active");
            });
        });
    } else {
        $(function () {
            let divwidth = $(".prodContent").width(); //div寬度
            let imgcount = $(".prod-list li").length; //圖片數量 

            //把ul的寬度設為 div寬度*圖片數量
            $(".prod-list").width(divwidth * imgcount);
            //把圖片li寬度設定和div一樣寬
            $('.prod-list li').width(divwidth);
            //利用圖片張數建立對應的按鈕數量
            for (let i = 0; i < imgcount; i++) {
                $(".num").append("<li></li>");
                $(".num li").eq(0).addClass("active");
            }

            $(".num li").click(function () {
                //抓取按鈕索引
                let index = $(this).index();
                // console.log(index)

                //移動的位置為圖片索引*寬度
                $(".prod-list").animate({
                    left: (divwidth * index * -1)
                }, 1000)

                $(".prod-bag").removeClass('prod-bag-active');

                $(".prodContent").eq(index).find('.prod-bag').addClass('prod-bag-active');

                $("#product .num li").not(this).removeClass("active");
                $(this).addClass("active");
            });
        });
    }

});