$(function (e) {
    if (sessionStorage['cart-list'] == null) {
        //購物車中沒有東西時，顯示'您尚未選購商品'並且總額不顯示
        $('.cartEmpty').css('display', 'block');
        $('.finalamount').text(' ');
    } else {
        //購物車中有東西時，顯示商品清單
        $('.cartEmpty').css('display', 'none');
        $('.detail').css('display', 'flex');
    }
});


var arr = sessionStorage["cart-list"].slice(0, -1).split(',');
var length = arr.length - 1;
// console.log(length);
var rows = []; //[ [], [], [] ]
for (var i = 0; i <= length; i++) {
    var row = sessionStorage[`cart-row-${arr[i]}`].slice(0, -1).split(',');
    // console.log(row);
    var obj = {
        name: row[0],
        price: row[1],
        num: parseInt(row[2]),
        img: row[3],
    }
    rows.push(obj);
}
// console.log(rows);


//Vue渲染
var app = new Vue({
    el: '#cart',
    data: {
        Psum: 0,
        productList: sessionStorage["cart-list"].slice(0, -1).split(','),
        rows: rows, // [ {}, {}, {} ]
    },
    methods: {
        //     //增加數量
        //     handlePlus(cart) {
        //         this.prodAmount++;
        //         this.prodPrice += this.prodPrice;
        //         this.finalamount;
        //     },
        //     //減少數量
        //     handleSub(cart) {
        //         if (this.prodAmount > 1) {
        //             this.prodAmount--;
        //             this.prodSum -= this.prodPrice;
        //         }
        //         this.finalamount;
        //     },
        //     //刪除商品
        //     handledelete(index) {
        //         this.productList.splice(index, 1);
        //     },
        upData(){
           val = document.querySelector('input[type="text"]'); 
        //    val =  $(this).parent().find('input').val();
           console.log(val);
        },
    
    },
    computed: {
        //計算總和
        finalamount() {
            // this.Psum = 0;
            // for (i in this.productList) {
            //     this.Psum += this.productList[i].prodPrice;
            // }
            // return this.Psum;
            let total = 0;
            if (sessionStorage['cart-list'] == null) {
                return total
            } else {
                for (var i = 0; i < rows.length; i++) {
                    total += rows[i]["price"] * rows[i]["num"];
                }
                return total
            }
        },
    }
})


// sessionStorage['final-list'] = 








// $(function () {
//     $.ajax({
//         url: "shoppingCart.php",
//         datType: "json",
//         type: "GET",
//         success: function (data) {
//             console.log(data);
//         }
//     });
// });

// window.addEventListener('load', init, false);