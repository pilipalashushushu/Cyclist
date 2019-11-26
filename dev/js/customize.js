$(function () {

    $.ajax({
        url: "./php/customize.php",

        datType: "json",

        type: "GET",

        success: function (data) {

            //解析json物件
            let result = JSON.parse(data);

            console.log(result)

            //建立車種板模
            let option = `<div class="option-extend active">`;
            let option_m = "";

            for (let i = 0; i < result.length; i += 8) {
                option_m += `<div class="showbox type active" data-type=${result[i].typeNo}><img src="./images/type${result[i].typeNo}.png" alt="">
                <h4>${result[i].typeName}</h4>
                </div>`
            };


            option += `${option_m}</div>`

            //渲染
            $(".biketype").append(option);
            $(".mobile1").append(option_m);

            //建立車框板模
            let frame = `<div class="option-extend option-content frame-option">`
            let frame_m = "";

            for (let i = 0; i < result.length; i += 4) {

                if (i < 4) {
                    frame_m += `<div class="mountain active">
                       <div class="showbox frame frame-${result[i].frameNo}" data-frame="${result[i].frameNo}" data-type="mountain"><img src="${result[i].framePic}" alt="">
                           <h4>${result[i].frameName}</h4><span>${result[i].frameNo}|${result[i].frameName}|${result[i].framePic}|${result[i].framePrice}|1</span>
                       </div>`
                } else if (i < 8) {
                    frame_m += `<div class="showbox frame frame-${result[i].frameNo}" data-frame="${result[i].frameNo}" data-type="mountain"><img src="${result[i].framePic}" alt="">
                                <h4>${result[i].frameName}</h4><span>${result[i].frameNo}|${result[i].frameName}|${result[i].framePic}|${result[i].framePrice}|1</span>

                              </div></div>`
                } else if (i < 12) {
                    frame_m += `<div class="road">
                       <div class="showbox frame frame-${result[i].frameNo}" data-frame="${result[i].frameNo}" data-type="road"><img src="${result[i].framePic}" alt="">
                           <h4>${result[i].frameName}</h4><span>${result[i].frameNo}|${result[i].frameName}|${result[i].framePic}|${result[i].framePrice}|1</span>
                       </div>`
                } else if (i < 16) {
                    frame_m += `<div class="showbox frame frame-${result[i].frameNo}" data-frame="${result[i].frameNo}" data-type="road"><img src="${result[i].framePic}" alt="">
                           <h4>${result[i].frameName}</h4><span>${result[i].frameNo}|${result[i].frameName}|${result[i].framePic}|${result[i].framePrice}|1</span>
                       </div></div>`
                } else if (i < 20) {
                    frame_m += `<div class="city">
                       <div class="showbox frame frame-${result[i].frameNo}" data-frame="${result[i].frameNo}" data-type="city"><img src="${result[i].framePic}" alt="">
                           <h4>${result[i].frameName}</h4><span>${result[i].frameNo}|${result[i].frameName}|${result[i].framePic}|${result[i].framePrice}|1</span>
                       </div>`
                } else {
                    frame_m += `<div class="showbox frame frame-${result[i].frameNo}" data-frame="${result[i].frameNo}" data-type="city"><img src="${result[i].framePic}" alt="">
                           <h4>${result[i].frameName}</h4><span>${result[i].frameNo}|${result[i].frameName}|${result[i].framePic}|${result[i].framePrice}|1</span>
                       </div></div>`
                };


            }
            frame += `${frame_m}</div>`

            $(".option-frame").append(frame);
            $(".mobile2").append(frame_m);

            //建立手把模板
            let handle = `<div class="option-extend option-content handle-option">`;
            let handle_m = "";

            for (let i = 0; i < result.length; i += 2) {

                if (i == 0) {
                    handle_m += `
                    <div class="mountain active">
                    <div class="frame1 active" data-frame="mountain1">
                    <div class="showbox handle handle${result[i].handleNo}" data-handle=${result[i].handleNo} data-type="mountain">
                        <img src="${result[i].handlePic}" alt="">
                        <h4>${result[i].handleName}</h4><span>${result[i].handleNo}|${result[i].handleName}|${result[i].handlePic}|${result[i].handlePrice}|1</span>
                    </div>`
                } else if (i == 2) {
                    handle_m += `
                    <div class="showbox handle handle${result[i].handleNo}" data-handle=${result[i].handleNo} data-type="mountain">
                        <img src="${result[i].handlePic}" alt="">
                        <h4>${result[i].handleName}</h4><span>${result[i].handleNo}|${result[i].handleName}|${result[i].handlePic}|${result[i].handlePrice}|1</span>

                    </div></div>`
                } else if (i == 4) {
                    handle_m += `   
                    <div class="frame2" data-frame="mountain2">
                    <div class="showbox handle handle${result[i].handleNo}" data-handle=${result[i].handleNo} data-type="mountain"> 
                    <img src="${result[i].handlePic}" alt="">
                    <h4>${result[i].handleName}</h4><span>${result[i].handleNo}|${result[i].handleName}|${result[i].handlePic}|${result[i].handlePrice}|1</span>
                    </div>`
                } else if (i == 6) {
                    handle_m += ` 
                    <div class="showbox handle handle${result[i].handleNo}" data-handle=${result[i].handleNo} data-type="mountain"> 
                    <img src="${result[i].handlePic}" alt="">
                    <h4>${result[i].handleName}</h4><span>${result[i].handleNo}|${result[i].handleName}|${result[i].handlePic}|${result[i].handlePrice}|1</span>
                    </div></div></div>`
                } else if (i == 8) {
                    handle_m += `
                    <div class="road">
                    <div class="frame1 active" data-frame="road1">
                    <div class="showbox handle handle${result[i].handleNo}" data-handle=${result[i].handleNo} data-type="road">
                        <img src="${result[i].handlePic}" alt="">
                        <h4>${result[i].handleName}</h4><span>${result[i].handleNo}|${result[i].handleName}|${result[i].handlePic}|${result[i].handlePrice}|1</span>

                    </div>`
                } else if (i == 10) {
                    handle_m += `
                    <div class="showbox handle handle${result[i].handleNo}" data-handle=${result[i].handleNo} data-type="road">
                        <img src="${result[i].handlePic}" alt="">
                        <h4>${result[i].handleName}</h4><span>${result[i].handleNo}|${result[i].handleName}|${result[i].handlePic}|${result[i].handlePrice}|1</span>

                    </div></div>`
                } else if (i == 12) {
                    handle_m += `   
                    <div class="frame2" data-frame="road2">
                    <div class="showbox handle handle${result[i].handleNo}" data-handle=${result[i].handleNo} data-type="road"> 
                    <img src="${result[i].handlePic}" alt="">
                    <h4>${result[i].handleName}</h4><span>${result[i].handleNo}|${result[i].handleName}|${result[i].handlePic}|${result[i].handlePrice}|1</span>
                    </div>`
                } else if (i == 14) {
                    handle_m += ` 
                    <div class="showbox handle handle${result[i].handleNo}" data-handle=${result[i].handleNo} data-type="road"> 
                    <img src="${result[i].handlePic}" alt="">
                    <h4>${result[i].handleName}</h4>
                    <span>${result[i].handleNo}|${result[i].handleName}|${result[i].handlePic}|${result[i].handlePrice}|1</span>
                    </div></div></div>`
                } else if (i == 16) {
                    handle_m += `
                    <div class="city">
                    <div class="frame1 active" data-frame="city1">
                    <div class="showbox handle handle${result[i].handleNo}" data-handle=${result[i].handleNo} data-type="city">
                        <img src="${result[i].handlePic}" alt="">
                        <h4>${result[i].handleName}</h4><span>${result[i].handleNo}|${result[i].handleName}|${result[i].handlePic}|${result[i].handlePrice}|1</span>

                    </div>`
                } else if (i == 18) {
                    handle_m += `
                    <div class="showbox handle handle${result[i].handleNo}" data-handle=${result[i].handleNo} data-type="city">
                        <img src="${result[i].handlePic}" alt="">
                        <h4>${result[i].handleName}</h4><span>${result[i].handleNo}|${result[i].handleName}|${result[i].handlePic}|${result[i].handlePrice}|1</span>

                    </div></div>`
                } else if (i == 20) {
                    handle_m += `   
                    <div class="frame2" data-frame="city2">
                    <div class="showbox handle handle${result[i].handleNo}" data-handle=${result[i].handleNo} data-type="city"> 
                    <img src="${result[i].handlePic}" alt="">
                    <h4>${result[i].handleName}</h4><span>${result[i].handleNo}|${result[i].handleName}|${result[i].handlePic}|${result[i].handlePrice}|1</span>
                    </div>`
                } else if (i == 22) {
                    handle_m += ` 
                    <div class="showbox handle handle${result[i].handleNo}" data-handle=${result[i].handleNo} data-type="city"> 
                    <img src="${result[i].handlePic}" alt="">
                    <h4>${result[i].handleName}</h4><span>${result[i].handleNo}|${result[i].handleName}|${result[i].handlePic}|${result[i].handlePrice}|1</span>
                    </div></div></div>`
                }

            }

            handle += handle_m;

            $(".mobile3").append(handle_m);
            $(".option-handle").append(handle);

            let color = `<div class="option-extend option-content color-option">`;
            let color_m = "";
            for (let i = 0; i < result.length; i++) {

                if (i == 0) {
                    color_m += `
                    <div class="mountain active">
                    <div class="frame1 active" data-frame="mountain1">
                    <div class="showbox color color${result[i].colorNo}" data-color=${result[i].colorNo} data-type="mountain">
                        <img src="${result[i].colorPic}" alt="">
                        <h4>${result[i].colorName}</h4><span>${result[i].colorNo}|${result[i].colorName}|${result[i].colorPic}|0|1</span>

                    </div>`
                } else if (i == 1) {
                    color_m += `
                    <div class="showbox color color${result[i].colorNo}" data-color=${result[i].colorNo} data-type="mountain">
                        <img src="${result[i].colorPic}" alt="">
                        <h4>${result[i].colorName}</h4><span>${result[i].colorNo}|${result[i].colorName}|${result[i].colorPic}|0|1</span>

                    </div></div>`
                } else if (i == 4) {
                    color_m += `   
                    <div class="frame2" data-frame="mountain2">
                    <div class="showbox color color${result[i].colorNo}" data-color=${result[i].colorNo} data-type="mountain"> 
                    <img src="${result[i].colorPic}" alt="">
                    <h4>${result[i].colorName}</h4><span>${result[i].colorNo}|${result[i].colorName}|${result[i].colorPic}|0|1</span>
                    </div>`
                } else if (i == 5) {
                    color_m += ` 
                    <div class="showbox color color${result[i].colorNo}" data-color=${result[i].colorNo} data-type="mountain"> 
                    <img src="${result[i].colorPic}" alt="">
                    <h4>${result[i].colorName}</h4><span>${result[i].colorNo}|${result[i].colorName}|${result[i].colorPic}|0|1</span>
                    </div></div></div>`
                } else if (i == 8) {
                    color_m += `
                    <div class="road">
                    <div class="frame1 active" data-frame="road1">
                    <div class="showbox color color${result[i].colorNo}" data-color=${result[i].colorNo} data-type="road">
                        <img src="${result[i].colorPic}" alt="">
                        <h4>${result[i].colorName}</h4><span>${result[i].colorNo}|${result[i].colorName}|${result[i].colorPic}|0|1</span>

                    </div>`
                } else if (i == 9) {
                    color_m += `
                    <div class="showbox color color${result[i].colorNo}" data-color=${result[i].colorNo} data-type="road">
                        <img src="${result[i].colorPic}" alt="">
                        <h4>${result[i].colorName}</h4><span>${result[i].colorNo}|${result[i].colorName}|${result[i].colorPic}|0|1</span>

                    </div></div>`
                } else if (i == 12) {
                    color_m += `   
                    <div class="frame2" data-frame="road2">
                    <div class="showbox color color${result[i].colorNo}" data-color=${result[i].colorNo} data-type="road"> 
                    <img src="${result[i].colorPic}" alt="">
                    <h4>${result[i].colorName}</h4><span>${result[i].colorNo}|${result[i].colorName}|${result[i].colorPic}|0|1</span>
                    </div>`
                } else if (i == 13) {
                    color_m += ` 
                    <div class="showbox color color${result[i].colorNo}" data-color=${result[i].colorNo} data-type="road"> 
                    <img src="${result[i].colorPic}" alt="">
                    <h4>${result[i].colorName}</h4><span>${result[i].colorNo}|${result[i].colorName}|${result[i].colorPic}|0|1</span>
                    </div></div></div>`
                } else if (i == 16) {
                    color_m += `
                    <div class="city">
                    <div class="frame1 active" data-frame="city1">
                    <div class="showbox color color${result[i].colorNo}" data-color=${result[i].colorNo} data-type="city">
                        <img src="${result[i].colorPic}" alt="">
                        <h4>${result[i].colorName}</h4><span>${result[i].colorNo}|${result[i].colorName}|${result[i].colorPic}|0|1</span>

                    </div>`
                } else if (i == 17) {
                    color_m += `
                    <div class="showbox color color${result[i].colorNo}" data-color=${result[i].colorNo} data-type="city">
                        <img src="${result[i].colorPic}" alt="">
                        <h4>${result[i].colorName}</h4><span>${result[i].colorNo}|${result[i].colorName}|${result[i].colorPic}|0|1</span>

                    </div></div>`
                } else if (i == 20) {
                    color_m += `   
                    <div class="frame2" data-frame="city2">
                    <div class="showbox color color${result[i].colorNo}" data-color=${result[i].colorNo} data-type="city"> 
                    <img src="${result[i].colorPic}" alt="">
                    <h4>${result[i].colorName}</h4><span>${result[i].colorNo}|${result[i].colorName}|${result[i].colorPic}|0|1</span>
                    </div>`
                } else if (i == 21) {
                    color_m += ` 
                    <div class="showbox color color${result[i].colorNo}" data-color=${result[i].colorNo} data-type="city"> 
                    <img src="${result[i].colorPic}" alt="">
                    <h4>${result[i].colorName}</h4><span>${result[i].colorNo}|${result[i].colorName}|${result[i].colorPic}|0|1</span>
                    </div></div></div>`
                }
            }



            color += `${color_m}</div>`;

            $(".mobile4").append(color_m);
            $(".option-color").append(color);

            $(".showbox").find("input").css({
                "visibility": "hidden",
                "height": "0px"
            });
            $(".showbox").find("span").css({
                "visibility": "hidden",
                "height": "0px"
            });


            if (sessionStorage["cusType"] == null) {
                sessionStorage["cusType"] = "1";
                sessionStorage["cusFrame"] = "1";
                sessionStorage["cusHandle"] = "1";
                sessionStorage["cusColor"] = "1";
                sessionStorage["frameInfo"] = $(".frame-option .frame-1").find("span").text()
                sessionStorage["handleInfo"] = $(".handle-option .handle1").find("span").text()
                sessionStorage["colorInfo"] = $(".color-option .color1").find("span").text()
                sessionStorage["cusList"] = `frameInfo|handleInfo|colorInfo`;
            }


            //計算金額

            if (sessionStorage["handleprice"] == null) {
                sessionStorage["handleprice"] = $(".handle-option .handle1").find("span").text().split("|")[3];
            }

            if (sessionStorage["frameprice"] == null) {
                sessionStorage["frameprice"] = $(".frame-option .frame-1").find("span").text().split("|")[3];
            }

            if (sessionStorage["cusprice"] == null) {
                sessionStorage["cusprice"] = parseInt(sessionStorage["frameprice"]) + parseInt(sessionStorage["handleprice"])
            }

            p2 = sessionStorage.getItem("cusprice").slice(-3);
            p1 = sessionStorage.getItem("cusprice").slice(0, 2)
            price = "$" + p1 + "," + p2;
            $(".price").find("h3").text(price);



        }


    });

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

        console.log(sessionStorage["handleInfo"] = `${$(".hanndle-option .handle3").data("handle")}|${$(".hanndle-option .handle3").find("h4").text()}|${$(".hanndle-option .handle3").find("img").attr("src")}|${$(".hanndle-option .handle3").find("span").text()}`)

        //被選到的會有外框
        $(".place").not(this).removeClass("active");
        $(this).addClass("active");

        //更換背景
        switch ($(this).data("place")) {
            case 1:
                $(".bike-background").css("background-image", "url(./images/bg.jpg)")
                break;
            case 2:
                $(".bike-background").css("background-image", "url(./images/bg2.jpg)")
                break;
            case 3:
                $(".bike-background").css("background-image", "url(./images/bg3.jpg)")
                break;
            case 4:
                $(".bike-background").css("background-image", "url(./images/bg4.jpg)")
                break;
        }

    })



    //sessionStorage設定

    $("body").on("click", ".showbox", function () {

        //改變(車款)type的session &初始價錢
        switch ($(this).data("type")) {

            case 1:
                sessionStorage["cusType"] = "1";
                sessionStorage["cusFrame"] = "1";
                sessionStorage["cusHandle"] = "1";
                sessionStorage["cusColor"] = "1";
                sessionStorage["handleprice"] = $(".handle-option .handle1").find("span").text().split("|")[3];
                sessionStorage["frameprice"] = $(".frame-option .frame-1").find("span").text().split("|")[3];
                sessionStorage["frameInfo"] = `${$(".frame-option .frame-1").find("span").text()}`
                sessionStorage["handleInfo"] = `${$(".handle-option .handle1").find("span").text()}`
                sessionStorage["colorInfo"] = `${$(".color-option .color1").find("span").text()}`
                break;
            case 2:
                sessionStorage["cusType"] = "2";
                sessionStorage["cusFrame"] = "3";
                sessionStorage["cusHandle"] = "5";
                sessionStorage["cusColor"] = "5";
                sessionStorage["handleprice"] = $(".handle-option .handle5").find("span").text().split("|")[3];;
                sessionStorage["frameprice"] = $(".frame-option .frame-3").find("span").text().split("|")[3]
                sessionStorage["frameInfo"] = `${$(".frame-option .frame-3").find("span").text()}`
                sessionStorage["handleInfo"] = `${$(".handle-option .handle5").find("span").text()}`
                sessionStorage["colorInfo"] = `${$(".color-option .color5").find("span").text()}`
                break;
            case 3:
                sessionStorage["cusType"] = "3";
                sessionStorage["cusFrame"] = "5";
                sessionStorage["cusHandle"] = "9";
                sessionStorage["cusColor"] = "9";
                sessionStorage["handleprice"] = $(".handle-option .handle9").find("span").text().split("|")[3];
                sessionStorage["frameprice"] = $(".frame-option .frame-5").find("span").text().split("|")[3];
                sessionStorage["frameInfo"] = `${$(".frame-option .frame-5").find("span").text()}`
                sessionStorage["handleInfo"] = `${$(".handle-option .handle9").find("span").text()}`
                sessionStorage["colorInfo"] = `${$(".color-option .color9").find("span").text()}`
                break;
        }

        //改變(車框)frame的session
        switch ($(this).data("frame")) {
            case 1:
                sessionStorage["cusFrame"] = $(this).data("frame");
                sessionStorage["cusHandle"] = "1";
                sessionStorage["cusColor"] = "1";
                sessionStorage["frameInfo"] = `${$(this).find("span").text()}`
                sessionStorage["handleInfo"] = `${$(".handle-option .handle1").find("span").text()}`
                sessionStorage["colorInfo"] = `${$(".color-option .color1").find("span").text()}`
                break;
            case 2:
                sessionStorage["cusFrame"] = $(this).data("frame");
                sessionStorage["cusHandle"] = "3";
                sessionStorage["cusColor"] = "3";
                sessionStorage["frameInfo"] = `${$(this).find("span").text()}`
                sessionStorage["handleInfo"] = `${$(".handle-option .handle3").find("span").text()}`
                sessionStorage["colorInfo"] = `${$(".color-option .color3").find("span").text()}`
                break;

            case 3:
                sessionStorage["cusFrame"] = $(this).data("frame");
                sessionStorage["cusHandle"] = "5";
                sessionStorage["cusColor"] = "5";
                sessionStorage["frameInfo"] = `${$(this).find("span").text()}`
                sessionStorage["handleInfo"] = `${$(".handle-option .handle5").find("span").text()}`
                sessionStorage["colorInfo"] = `${$(".color-option .color5").find("span").text()}`
                break;
            case 4:
                sessionStorage["cusFrame"] = $(this).data("frame");
                sessionStorage["cusHandle"] = "7";
                sessionStorage["cusColor"] = "7";
                sessionStorage["frameInfo"] = `${$(this).find("span").text()}`
                sessionStorage["handleInfo"] = `${$(".handle-option .handle7").find("span").text()}`
                sessionStorage["colorInfo"] = `${$(".color-option .color7").find("span").text()}`
                break;
            case 5:
                sessionStorage["cusFrame"] = $(this).data("frame");
                sessionStorage["cusHandle"] = "9";
                sessionStorage["cusColor"] = "9";
                sessionStorage["frameInfo"] = `${$(this).find("span").text()}`
                sessionStorage["handleInfo"] = `${$(".handle-option .handle9").find("span").text()}`
                sessionStorage["colorInfo"] = `${$(".color-option .color9").find("span").text()}`
                break;
            case 6:
                sessionStorage["cusFrame"] = $(this).data("frame");
                sessionStorage["cusHandle"] = "11";
                sessionStorage["cusColor"] = "11";
                sessionStorage["frameInfo"] = `${$(this).find("span").text()}`
                sessionStorage["handleInfo"] = `${$(".handle-option .handle11").find("span").text()}`
                sessionStorage["colorInfo"] = `${$(".color-option .color11").find("span").text()}`
                break;
        }

        //改變(把手)handle &(顏色)color的session

        if ($(this).hasClass("handle")) {
            sessionStorage["cusHandle"] = $(this).data("handle");
            sessionStorage["handleInfo"] = `${$(this).find("span").text()}`
        } else if ($(this).hasClass("color")) {
            sessionStorage["cusColor"] = $(this).data("color");
            sessionStorage["colorInfo"] = `${$(this).find("span").text()}`
        }

        //改變價錢

        sessionStorage["cusprice"] == 0;

        if ($(this).hasClass("handle")) {
            sessionStorage["handleprice"] = $(this).find("span").text().split("|")[3];
        } else if ($(this).hasClass("frame")) {
            sessionStorage["frameprice"] = $(this).find("span").text().split("|")[3];
        }


        sessionStorage["cusprice"] = parseInt(sessionStorage["handleprice"]) + parseInt(sessionStorage["frameprice"]);
        p2 = sessionStorage.getItem("cusprice").slice(-3);
        p1 = sessionStorage.getItem("cusprice").slice(0, 2);
        price = "$" + p1 + "," + p2;
        $(".price").find("h3").text(price);

    })


    //客製零件更換

    $("body").on("click", ".showbox", function () {

        //點選狀態附加

        $(this).find("h4").css("color", "#647d94");
        $(".showbox").not(this).find("h4").css("color", "#d16237");


        //點選車種更換選單內容
        switch ($(this).data("type")) {
            case 1:
                $(".mountain").addClass("active");
                $(".road").removeClass("active");
                $(".city").removeClass("active");
                $(".frame2").removeClass("active");
                $(".frame1").removeClass("active");
                $(".mountain").find(".frame1").addClass("active");
                $(".picture-area").find(".frame").find("img").attr("src", "./images/mountain-frame1-color1.png")
                $(".picture-area").find(".handle").find("img").attr("src", "./images/mountain-frame1-handle1.png")
                $(".picture-area").find(".wheel").find("img").attr("src", "./images/wheels.png")
                break;
            case 2:
                $(".road").addClass("active");
                $(".mountain").removeClass("active");
                $(".city").removeClass("active");
                $(".frame2").removeClass("active");
                $(".frame1").removeClass("active");
                $(".road").find(".frame1").addClass("active");
                $(".picture-area").find(".frame").find("img").attr("src", "./images/road-frame1-color1.png")
                $(".picture-area").find(".handle").find("img").attr("src", "./images/road-frame1-handle1.png")
                $(".picture-area").find(".wheel").find("img").attr("src", "./images/wheels.png")
                break;
            case 3:
                $(".city").addClass("active");
                $(".mountain").removeClass("active");
                $(".road").removeClass("active");
                $(".frame2").removeClass("active");
                $(".frame1").removeClass("active");
                $(".city").find(".frame1").addClass("active");
                $(".picture-area").find(".frame").find("img").attr("src", "./images/city-frame1-color1.png")
                $(".picture-area").find(".handle").find("img").attr("src", "./images/city-frame1-handle1.png")
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
                    case 3:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/road-frame1-color1.png")
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/road-frame1-handle1.png")
                        $(".frame2").removeClass("active");
                        $(".frame1").removeClass("active");
                        $(".road").find(".frame1").addClass("active");
                        break;
                    case 4:
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
                    case 5:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/city-frame1-color1.png")
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/city-frame1-handle1.png")
                        $(".frame2").removeClass("active");
                        $(".frame1").removeClass("active");
                        $(".city").find(".frame1").addClass("active");
                        break;
                    case 6:
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

                    case 3:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/mountain-frame2-handle1.png")
                        break;
                    case 4:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/mountainframe2handle2.png")
                        break;
                }

                break;

            case "road1":

                switch ($(this).data("handle")) {

                    case 5:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/road-frame1-handle1.png")
                        break;
                    case 6:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/road-frame1-handle2.png")
                        break;
                }
                break;

            case "road2":

                switch ($(this).data("handle")) {

                    case 7:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/road-frame2-handle1.png")
                        break;
                    case 8:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/road-frame2-handle2.png")
                        break;
                }
                break;

            case "city1":

                switch ($(this).data("handle")) {

                    case 9:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/city-frame1-handle1.png")
                        break;
                    case 10:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/city-frame1-handle2.png")
                        break;
                }
                break;

            case "city2":
                switch ($(this).data("handle")) {

                    case 11:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/city-frame2-handle1.png")
                        break;
                    case 12:
                        $(".picture-area").find(".handle").find("img").attr("src", "./images/city-frame2-handle2.png")
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
                    case 3:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/mountain-frame2-color1.png")
                        break;
                    case 4:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/mountain-frame2-color2.png")
                        break;
                }
                break;

            case "road1":
                switch ($(this).data("color")) {
                    case 5:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/road-frame1-color1.png")
                        break;
                    case 6:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/road-frame1-color2.png")
                        break;
                }
                break;
            case "road2":
                switch ($(this).data("color")) {
                    case 7:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/road-frame2-color1.png")
                        break;
                    case 8:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/road-frame2-color2.png")
                        break;
                }
                break;

            case "city1":
                switch ($(this).data("color")) {
                    case 9:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/city-frame1-color1.png")
                        break;
                    case 10:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/city-frame1-color2.png")
                        break;
                }
                break;
            case "city2":
                switch ($(this).data("color")) {
                    case 11:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/city-frame2-color1.png")
                        break;
                    case 12:
                        $(".picture-area").find(".frame").find("img").attr("src", "./images/city-frame2-color2.png")
                        break;
                }
                break;
        }

    })

    //////////////////////////////////////////////////////結帳/////////////////////////////////////////////
    var obj, cuslist, memGold;


    $(".cusCheckout").click(function () {

        $(".cusCheckOut").slideDown();
        $("#customize").slideUp();

        $.ajax({

            url: "./php/cusmemId.php",
            type: "post",
            datType: "json",
            success: function (data) {

                memInfo = JSON.parse(data);
                memGold = memInfo.coupon;

            }

        })


        new Vue({

            el: "#app",

            data: {
                cus: 1,
                gold: 0,

            },

            methods: {

                memGold() {

                    this.gold = memGold
                },

                // checkName() {
                //     if () {}
                // }

            },

            computed: {
                cusList() {

                    let cusitems = sessionStorage["cusList"].split("|");

                    cuslist = [];

                    for (let i = 0; i < cusitems.length; i++) {
                        row = sessionStorage[`${cusitems[i]}`].split("|")

                        obj = {
                            cusItemNo: row[0],
                            cusItemName: row[1],
                            cusItemPic: row[2],
                            cusItemPrice: row[3],
                            cusItemAmount: row[4]
                        }

                        cuslist[i] = obj;
                    }
                    return cuslist;

                },
                subtotal() {
                    let total = 0;

                    for (let i = 0; i < cuslist.length; i++) {

                        total += cuslist[i].cusItemPrice * cuslist[i].cusItemAmount

                    }

                    return total

                },

            },

        })


        //下一步
        $(".next").click(function () {
            switch ($(this).data("status")) {
                case 1:
                    $(".receive").slideDown();
                    $(this).data("status", 2);
                    $(".prev").data("status", 2);
                    break;
                case 2:
                    $(".payment").slideDown();
                    $(this).find("h3").text("下一步");
                    $(this).data("status", 3);
                    $(".prev").data("status", 3);
                    break;
                case 3:

                    if ($(this).find("h4").text() == "下一步") {
                        alert("請選擇付款方式")
                    } else if ($(this).find("h4").text() == "送出訂單" && $(".creditCard").css("display") == "block") {
                        alert(1)
                        // $.ajax({
                        //     url: "./php/cusOrder.php",
                        //     datType: "json",
                        //     type: "post",
                        //     success: function (data) {}
                        // })
                    } else if ($(this).find("h4").text() == "送出訂單" && $(".myGold").css("display") == "block") {
                        $.ajax({
                            url: `./php/cusOrder.php?cusName=${$("#memName").val()} & cusTel=${$("#tel").val()} & addr=${$("#addr").val()} & type=${sessionStorage["cusType"]} & frameNo=${sessionStorage["frameInfo"].split("|")[0]} & handleNo=${sessionStorage["handleInfo"].split("|")[0]} & colorNo=${sessionStorage["colorInfo"].split("|")[0]} & price=${$(".finalamount").find("h3").text().substr(1)}`,


                            type: "get",

                            success: function (data) {

                                alert("購買成功!");

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                alert(jqXHR.responseText);
                            },
                        })
                    }
                    break;
            }
        })

        //上一步
        $(".prev").click(function () {
            switch ($(this).data("status")) {
                case 1:
                    window.location.reload("customize.html");
                    sessionStorage["cusType"] = "1";
                    sessionStorage["cusFrame"] = "1";
                    sessionStorage["cusHandle"] = "1";
                    sessionStorage["cusColor"] = "1";
                    sessionStorage["frameInfo"] = $(".frame-option .frame-1").find("span").text();
                    sessionStorage["handleInfo"] = $(".handle-option .handle1").find("span").text();
                    sessionStorage["colorInfo"] = $(".color-option .color1").find("span").text();
                    break;
                case 2:
                    $(".receive").slideUp();
                    $(".next").data("status", 1);
                    $(this).data("status", 1);
                    break;
                case 3:
                    $(".payment").slideUp();
                    $(".creditCard").slideUp();
                    $(".myGold").slideUp();
                    $(".next").data("status", 2);
                    $(".pay").find("input").prop("checked", false);
                    $(this).data("status", 2);
                    $(".next").find("h4").text("下一步")
                    break;
            }

        });

        //checkbox單選進行
        $(".pay input").click(function () {

            if ($(this).prop("checked")) {
                $(".pay input:checkbox").prop("checked", false);
                $(this).prop("checked", true);
            }
        });

        $(".card").click(function () {

            $(".creditCard").slideToggle();
            $(".myGold").slideUp();
            if ($(this).prop("checked")) {
                $('.next').find("h4").text("送出訂單");
            } else {
                $('.next').find("h4").text("下一步");
            }
        });

        $(".gold").click(function () {
            $(".myGold").slideToggle();
            $(".creditCard").slideUp();
            if ($(this).prop("checked")) {
                $('.next').find("h4").text("送出訂單");
            } else {
                $('.next').find("h4").text("下一步");
            }

        });



    })









})