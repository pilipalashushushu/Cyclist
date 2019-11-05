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
        $(this).parent().find(".option-extend").find(".showbox").addClass("active");


        $(".option-part").not(this).parent().removeClass("active");
        $(".option-part").not(this).parent().find(".option-extend").removeClass("active");
        $(".option-part").not(this).parent().find(".option-extend").find(".showbox").removeClass("active");
        //手機版 展開選單

        $(".mobile-extend").addClass("inactive");
        $(".mobile-extend").removeClass("active");
        $(".mobile-extend").find(".showbox").removeClass("active");

        switch ($(this).data("option")) {
            case 1:
                $(".mobile1").removeClass("inactive");
                $(".mobile1").addClass("active")

                $(".mobile1").find(".showbox").addClass("active");
                break;
            case 2:
                $(".mobile2").removeClass("inactive");
                $(".mobile2").addClass("active")
                $(".mobile2").find(".showbox").addClass("active");
                break;
            case 3:
                $(".mobile3").removeClass("inactive");
                $(".mobile3").addClass("active")
                $(".mobile3").find(".showbox").addClass("active");
                break;
            case 4:
                $(".mobile4").removeClass("inactive");
                $(".mobile4").addClass("active")
                $(".mobile4").find(".showbox").addClass("active");
                break;
        }




    });

    //背景按鈕

    $(".place").click(function () {

        //被選到的會有外框
        $(".place").not(this).removeClass("active");
        $(this).addClass("active");

        //更換背景
        switch ($(this).data("place")) {
            case 1:
                $(".bike-background").css("background-image", "url(../images/bg.jpg)")
                break;
            case 2:
                $(".bike-background").css("background-image", "url(../images/bg2.jpg)")
                break;
            case 3:
                $(".bike-background").css("background-image", "url(../images/bg3.jpg)")
                break;
            case 4:
                $(".bike-background").css("background-image", "url(../images/bg4.jpg)")
                break;
        }

    })


    //客製零件更換

    $(".showbox").click(function () {


        //點選車種更換選單內容
        switch ($(this).data("type")) {
            case 1:
                $(".mountain").addClass("active");
                $(".road").removeClass("active");
                $(".city").removeClass("active");
                $(".mountain").find(".frame1").addClass("active");
                $(".picture-area").find(".frame").find("img").attr("src", "./images/mountain-frame1-color1.png")
                $(".picture-area").find(".handle").find("img").attr("src", "./images/mountain-frame1-handle1.png")
                $(".picture-area").find(".wheel").find("img").attr("src", "./images/wheels.png")
                break;
            case 2:
                $(".road").addClass("active");
                $(".mountain").removeClass("active");
                $(".city").removeClass("active");
                $(".road").find(".frame1").addClass("active");
                $(".picture-area").find(".frame").find("img").attr("src", "./images/road-frame1-color1.png")
                $(".picture-area").find(".handle").find("img").attr("src", "./images/road-frame1-handle1.png")
                $(".picture-area").find(".wheel").find("img").attr("src", "./images/wheels.png")

                break;
            case 3:
                $(".city").addClass("active");
                $(".mountain").removeClass("active");
                $(".road").removeClass("active");
                $(".city").find(".frame1").addClass("active");
                $(".picture-area").find(".frame").find("img").attr("src", "./images/city-frame1-color1.png")
                $(".picture-area").find(".handle").find("img").attr("src", "./images/citybikeA-handle1.png")
                $(".picture-area").find(".wheel").find("img").attr("src", "./images/wheels.png")
                break;
        }

        //點選車架更換選單內容
        switch ($(this).data("type")) {
            case "mountain":

                switch ($(this).data("frame")) {
                    case 1:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/mountain-frame1-color1.png")
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/mountain-frame1-handle1.png")
                        $(".frame2").removeClass("active");
                        $(".frame1").removeClass("active");
                        $(".mountain").find(".frame1").addClass("active");
                        break;
                    case 2:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/mountain-frame2-color1.png")
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/mountain-frame2-handle1.png")
                        $(".frame2").removeClass("active");
                        $(".frame1").removeClass("active");
                        $(".mountain").find(".frame2").addClass("active");
                        break;
                }

                break;

            case "road":

                switch ($(this).data("frame")) {
                    case 1:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/road-frame1-color1.png")
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/road-frame1-handle1.png")
                        $(".frame2").removeClass("active");
                        $(".frame1").removeClass("active");
                        $(".road").find(".frame1").addClass("active");
                        break;
                    case 2:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/road-frame2-color1.png")
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/road-frame2-handle1.png")
                        $(".frame2").removeClass("active");
                        $(".frame1").removeClass("active");
                        $(".road").find(".frame2").addClass("active");
                        break;
                }

                break;

            case "city":

                switch ($(this).data("frame")) {
                    case 1:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/city-frame1-color1.png")
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/city-frame1-handle1.png")
                        $(".frame2").removeClass("active");
                        $(".frame1").removeClass("active");
                        $(".city").find(".frame1").addClass("active");
                        break;
                    case 2:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/city-frame2-color1.png")
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/city-frame2-handle1.png")
                        $(".frame2").removeClass("active");
                        $(".frame1").removeClass("active");
                        $(".city").find(".frame2").addClass("active");
                        break;
                }
                break;

        }

        //換把手
        switch ($(this).parent().data("frame")) {

            case "mountain1":

                switch ($(this).data("handle")) {

                    case 1:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/mountain-frame1-handle1.png")
                        break;
                    case 2:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/mountain-frame1-handle2.png")
                        break;
                }

                break;

            case "mountain2":

                switch ($(this).data("handle")) {

                    case 1:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/mountain-frame2-handle1.png")
                        break;
                    case 2:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/mountainframe2handle2.png")
                        break;
                }

                break;

            case "road1":

                switch ($(this).data("handle")) {

                    case 1:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/road-frame1-handle1.png")
                        break;
                    case 2:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/road-frame1-handle2.png")
                        break;
                }
                break;

            case "road2":

                switch ($(this).data("handle")) {

                    case 1:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/road-frame2-handle1.png")
                        break;
                    case 2:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/road-frame2-handle2.png")
                        break;
                }
                break;

            case "city1":

                switch ($(this).data("handle")) {

                    case 1:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/city-frame1-handle1.png")
                        break;
                    case 2:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/city-frame1-handle2.png")
                        break;
                }
                break;

            case "city2":
                switch ($(this).data("handle")) {

                    case 1:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/city-frame2-handle1.png")
                        console.log(2)
                        break;
                    case 2:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/city-frame2-handle2.png")
                        console.log(2)
                        break;
                }
                break;
        }

        //換顏色
        switch ($(this).parent().data("frame")) {
            case "mountain1":
                switch ($(this).data("color")) {
                    case 1:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/mountain-frame1-color1.png")
                        break;
                    case 2:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/mountain-frame1-color2.png")
                        break;
                }
                break;
            case "mountain2":
                switch ($(this).data("color")) {
                    case 1:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/mountain-frame2-color1.png")
                        break;
                    case 2:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/mountain-frame2-color2.png")
                        break;
                }
                break;

            case "road1":
                switch ($(this).data("color")) {
                    case 1:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/road-frame1-color1.png")
                        break;
                    case 2:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/road-frame1-color2.png")
                        break;
                }
                break;
            case "road2":
                switch ($(this).data("color")) {
                    case 1:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/road-frame2-color1.png")
                        break;
                    case 2:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/road-frame2-color2.png")
                        break;
                }
                break;

            case "city1":
                switch ($(this).data("color")) {
                    case 1:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/city-frame1-color1.png")
                        break;
                    case 2:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/city-frame1-color2.png")
                        break;
                }
                break;
            case "city2":
                switch ($(this).data("color")) {
                    case 1:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/city-frame2-color1.png")
                        break;
                    case 2:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/city-frame2-color2.png")
                        break;
                }
                break;
        }



    })

})