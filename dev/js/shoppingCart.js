$(function () {
    //判斷剛進頁面時購物車的狀態
    if (sessionStorage['cart-list'] == null) {
        //購物車中沒有東西時，顯示'您尚未選購商品'並且總額不顯示
        $('.cartEmpty').css('display', 'block');
        $('.finalamount').text(' ');
        $('.detail').css('display', 'none');
        $('.all').css('display', 'none');
    } else {
        //購物車中有東西時，顯示商品清單
        $('.cartEmpty').css('display', 'none');
        $('.detail').css('display', 'flex');
        $('.all').css('display', 'flex');
    }



    //處理seesionStorage資料
    var arr = sessionStorage["cart-list"].slice(0, -1).split(',');
    var length = arr.length - 1;
    var rows = []; //[ [], [], [] ]
    for (var i = 0; i <= length; i++) {
        var row = sessionStorage[`cart-row-${arr[i]}`].slice(0).split(',');
        var obj = {
            name: row[0],
            price: row[1],
            num: parseInt(row[2]),
            img: row[3],
        }
        rows.push(obj);
    }

    //撈取會員購物金
    var memGold;
    $.ajax({
        url: `./php/shoppingCart.php?memNo=${sessionStorage["memNo"]}`,
        dataType: "json",
        type: "get",
        success: function (data) {
            memInfo = data;
            memGold = memInfo.coupon;
        }
    });



    //vue動態生成
    var app = new Vue({
        el: '#cart',
        data: {
            productList: sessionStorage["cart-list"].slice(0, -1).split(','),
            rows: rows, // [ {}, {}, {} ]
            page: true,
            total: 0,
            Gold: 0,
        },
        methods: {
            // 刪除商品
            handledelete(index) {
                console.log(index)
                this.rows.splice(index, 1);
            },
            //下一步展開
            nextStep(e) {
                switch ($(e.currentTarget).data("status")) {
                    case 1:
                        $(".receive").slideDown();
                        $(e.currentTarget).data("status", 2);
                        break;
                    case 2:
                        $(".payment").slideDown();
                        $(e.currentTarget).find("h4").text("下一步");
                        $(e.currentTarget).data("status", 3);
                        break;
                    case 3:
                        if ($(e.currentTarget).find("h4").text() == "下一步") {
                            //沒有選擇付款方式時跳窗提醒
                            $('#alert-wrap').find('h3').text('請選擇付款方式');
                            $('#alert-wrap').fadeIn();
                            $('#closeAlert').click(function () {
                                $('#alert-wrap').fadeOut();
                            });
                        } else if ($(e.currentTarget).find("h4").text() == "送出訂單" && $(".card").prop("checked") == true) {
                            //信用卡付款寫入後台
                            $.ajax({
                                url: `./php/shoppingList.php?memNo=${sessionStorage["memNo"]} & memName=${$('#memName').val()} & memTel=${$('#tel').val()} & memAddr=${$('#addr').val()} & ordTotal=${$('.finalamount h3').text().split('$')[1]}`,
                                type: "get",
                                success: function (data) {
                                    $('#alert-wrap').find('h3').text('購買成功');
                                    $('#alert-wrap').fadeIn('slow');
                                    $('#closeAlert').click(function () {
                                        $('#alert-wrap').fadeOut('slow');
                                        sessionStorage.removeItem('cart-list');
                                        window.open('cyclist.html', '_self');
                                    });
                                }
                            })
                            $.ajax({
                                url: "./php/card.php",
                                type: "post",
                                data: {
                                    memNo: `${sessionStorage["memNo"]}`,
                                    card: `${$(".cardNo1").val()}${$(".cardNo2").val()}${$(".cardNo3").val()}${$(".cardNo4").val()}`,
                                },
                                success: function (data) {
                                    document.location.href = "./cyclist.html"
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    alert(jqXHR.responseText);
                                },
                            })
                            $.ajax({
                                url: "./php/getOrderNo.php",

                                type: "get",

                                success: function (data) {

                                    let result = JSON.parse(data);

                                    sessionStorage["orderNo"] = parseInt(result.ordNo) + 1;

                                    if (sessionStorage["orderNo"] != null) {
                                        $.ajax({
                                            url: `./php/setOrdItem.php?ordNo=${sessionStorage["orderNo"]}`,

                                            type: "get",

                                            success: function (data) {

                                                let result = JSON.parse(data);




                                                $('#alert-wrap').find('h3').text('購買成功');
                                                $('#alert-wrap').fadeIn('slow');
                                                $('#closeAlert').click(function () {
                                                    $('#alert-wrap').fadeOut('slow');
                                                    sessionStorage.removeItem('cart-list');
                                                    window.open('cyclist.html', '_self');
                                                });


                                            }


                                        });
                                    }

                                }


                            });
                        } else if ($(e.currentTarget).find("h4").text() == "送出訂單" && $(".gold").prop("checked") == true) {
                            //購物金付款寫入後台
                            $.ajax({
                                url: `./php/shoppingList.php?memNo=${sessionStorage["memNo"]} & memName=${$('#memName').val()} & memTel=${$('#tel').val()} & memAddr=${$('#addr').val()} & ordTotal=${$('.finalamount h3').text().split('$')[1]}`,
                                type: "get",
                                success: function (data) {

                                }
                            })
                            $.ajax({
                                url: "./php/getOrderNo.php",

                                type: "get",

                                success: function (data) {

                                    let result = JSON.parse(data);

                                    sessionStorage["orderNo"] = parseInt(result.ordNo) + 1;

                                    if (sessionStorage["orderNo"] != null) {
                                        $.ajax({
                                            url: `./php/setOrdItem.php?ordNo=${sessionStorage["orderNo"]}`,

                                            type: "get",

                                            success: function (data) {

                                                let result = data;

                                                $('#alert-wrap').find('h3').text('購買成功');
                                                $('#alert-wrap').fadeIn('slow');
                                                $('#closeAlert').click(function () {
                                                    $('#alert-wrap').fadeOut('slow');
                                                    sessionStorage.removeItem('cart-list');
                                                    window.open('cyclist.html', '_self');
                                                });


                                            }


                                        });
                                    }

                                }


                            });

                            $.ajax({
                                url: `./php/gold.php?memNo=${sessionStorage["memNo"]} & gold=${$(".goldtotal").text()}`,
                                type: "get",
                                success: function (data) {},
                                error: function (jqXHR, textStatus, errorThrown) {
                                    alert(jqXHR.responseText);
                                },
                            })
                        }
                        break;
                }
            },
            //選擇信用卡付款
            checkCard(e) {
                if ($(e.currentTarget).prop("checked")) {
                    $(".pay input:checkbox").prop("checked", false);
                    $(e.currentTarget).prop("checked", true);
                }

                if ($(e.currentTarget).prop("checked")) {
                    $('.next').find("h4").text("送出訂單");
                } else {
                    $('.next').find("h4").text("下一步");
                }

                $(".creditCard").slideToggle();
                $(".myGold").slideUp();
            },
            //選擇購物金付款
            checkGold(e) {
                if ($(e.currentTarget).prop("checked")) {
                    $(".pay input:checkbox").prop("checked", false);
                    $(e.currentTarget).prop("checked", true);
                }

                if ($(e.currentTarget).prop("checked")) {
                    $('.next').find("h4").text("送出訂單");
                } else {
                    $('.next').find("h4").text("下一步");
                }

                $(".myGold").slideToggle();
                $(".creditCard").slideUp();

                //獲取資料庫的會員購物金
                this.Gold = memGold;

            },
            //控制跳頁(購物車->訂單明細)
            get() {
                this.page = false;
                if (sessionStorage['memId'] == null) {
                    $('#login-wrap').fadeToggle('slow')
                }
            },
            //信用卡資料自動跳行＆限制只能輸入數字
            keyupVal(e) {
                if (!/^\d+$/.test(this.value)) {
                    var newValue = /^\d+/.exec(e.currentTarget.value);
                    newValue != null ? $(e.currentTarget).val(newValue) : $(e.currentTarget).val('');
                }
                if ($(e.currentTarget).val().length == $(e.currentTarget).attr('maxlength')) {
                    $(e.currentTarget).next(':input').focus();
                }

            }
        },
        computed: {
            //計算總和
            finalamount() {
                this.total = 0;
                this.rows.forEach(item => {
                    this.total += item["price"] * item["num"];
                });
                return this.total
            },
        }
    })

});