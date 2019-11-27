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
        url: "./php/shoppingCart.php",
        datType: "json",
        type: "get",
        success: function (data) {
            memInfo = JSON.parse(data);
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
                            alert("請選擇付款方式")
                        } else if ($(e.currentTarget).find("h4").text() == "送出訂單" && $(".card").prop("checked") == true) {
                            $.ajax({
                                url: `./php/shoppingList.php?memName=${$('#memName').val()} & memTel=${$('#tel').val()} & memAddr=${$('#addr').val()} & ordTotal=${$('.finalamount h3').text().split('$')[1]}`,
                                type: "get",
                                success: function (data) {
                                    alert("購買成功")
                                    window.open('cyclist.html', '_self');
                                }
                            })

                            $.ajax({
                                url: "./php/card.php",

                                type: "post",

                                data: {

                                    memNo: 1,
                                    card: `${$(".cardNo1").val()}${$(".cardNo2").val()}${$(".cardNo3").val()}${$(".cardNo4").val()}`,


                                },

                                success: function (data) {

                                    alert("購買成功")
                                    document.location.href = "./cyclist.html"

                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    alert(jqXHR.responseText);
                                },
                            })
                        } else if ($(e.currentTarget).find("h4").text() == "送出訂單" && $(".gold").prop("checked") == true) {
                            $.ajax({
                                url: `./php/shoppingList.php?memName=${$('#memName').val()} & memTel=${$('#tel').val()} & memAddr=${$('#addr').val()} & ordTotal=${$('.finalamount h3').text().split('$')[1]}`,
                                type: "get",
                                success: function (data) {
                                    alert("購買成功")
                                    window.open('cyclist.html', '_self');
                                }
                            })
                            $.ajax({
                                url: `./php/gold.php?memNo=1 & gold=${$(".goldtotal").text()}`,
                                type: "get",
                                success: function (data) {

                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    alert(jqXHR.responseText);
                                },
                            })
                        }
                        break;
                }
            },
            //選擇信用卡
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
            //選擇購物金
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
            // getGold() {
            //     return this.memGold;
            // },
        }
    })

});