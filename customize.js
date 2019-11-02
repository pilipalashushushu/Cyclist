$(function () {

    //客製選單展開
    $(".option-part").click(function () {
        //改變底色
        $(this).addClass("active")

        $(".option-part").not(this).removeClass("active")

        //改變箭頭顏色
        $(this).find(".arrow").find("div").css({
            "border-top": "solid 3px #fff",
            "border-right": "solid 3px #fff"
        });


        $(".option-part").not(this).find(".arrow").find("div").css({
            "border-top": "solid 3px #d16237",
            "border-right": "solid 3px #d16237"
        });

        //改變圖片
        //先全部復原

        $(".option-part-1").find("img").attr("src", "./images/bikeicon0.png")

        $(".option-part-2").find("img").attr("src", "./images/frame0.png")

        $(".option-part-3").find("img").attr("src", "./images/handle0.png")

        $(".option-part-4").find("img").attr("src", "./images/brush0.png")

        //改變目標按鈕圖片
        let imgsrc = $(this).find("img").attr("src");
        let scrend = imgsrc.lastIndexOf("0");
        let activePic = imgsrc.substring(0, scrend).concat("1.png");

        $(this).find("img").attr("src", activePic);

        //預防重複點案造成圖片路徑錯誤
        if (imgsrc.lastIndexOf("1") == -1) {
            $(this).find("img").attr("src", activePic);
        }

        //展開選單
        $(this).parent().addClass("active");
        $(this).parent().find(".option-extend").addClass("active");


        $(".option-part").not(this).parent().removeClass("active");
        $(".option-part").not(this).parent().find(".option-extend").removeClass("active");

        //手機版 展開選單

        $(".mobile-extend").css("display", "none")
        $(".mobile-extend").removeClass("active");

        switch ($(this).data("option")) {
            case 1:
                $(".mobile1").addClass("active")
                $(".mobile1").css("display", "block");
                break;
            case 2:
                $(".mobile2").addClass("active")
                $(".mobile2").css("display", "block");
                break;
            case 3:
                $(".mobile3").addClass("active")
                $(".mobile3").css("display", "block");
                break;
            case 4:
                $(".mobile4").addClass("active")
                $(".mobile4").css("display", "block");
                break;
        }




    });

    //背景按鈕

    $(".place").click(function () {

        //被選到的會有外框
        $(".place").not(this).removeClass("active");
        $(this).addClass("active");

    })





})