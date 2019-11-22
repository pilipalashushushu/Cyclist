var incart = [];
var app = new Vue({
    el: '#cart',
    data: {
        Psum: 0,
        productList: sessionStorage["cart-list"].slice(0, -1).split(','),
    },
    methods: {
        //取得itemList
        getItems(i) {
            return sessionStorage[`cart-row-${i}`];
        },
        //取得商品名稱
        getprodName(i) {
            cartRow = sessionStorage[`cart-row-${i}`];
            prodName = cartRow.split(',')[0];
            return prodName;
        },
        //取得商品單價
        getprodPrice(i) {
            cartRow = sessionStorage[`cart-row-${i}`];
            prodPrice = parseInt(cartRow.split(',')[1]);
            return prodPrice;
        },
        //取得商品數量
        getprodAmount(i) {
            cartRow = sessionStorage[`cart-row-${i}`];
            prodAmount = parseInt(cartRow.split(',')[2]);
            return prodAmount;
        },
        //增加數量
        handlePlus() {
            this.prodAmount++;
            this.prodPrice += this.prodPrice;
            // this.finalamount;
        },
        //減少數量
        handleSub() {
            if (this.prodAmount > 1) {
                this.prodAmount--;
                this.prodSum -= this.prodPrice;
            }
            // this.finalamount;
        },
        //刪除商品
        handledelete(index) {
            this.productList.splice(index, 1);
        },
    },
    computed: {
        //計算總和
        finalamount() {
            this.Psum = 0;
            // for (i in this.productList) {
            //     this.Psum += this.productList[i].prodPrice;
            // }
            return this.Psum;
        },
    }
})