function init(){
    //GET資料庫+RENDER畫面
    $.get('./php/CYShop.php', {}, function(data){
        //data: 只取prodType, prodName, prodPrice, prodColor, prodDetail, prodPic

        //////////基本載入////////////

        //計算頁數IIFE
        let countPagesBtn = [];
        (function(){ //計算頁數->Math.round(總數量/每頁顯示數量)
            let len = data.length;
            let show = 8;
            let pages = Math.round(len/show) + 1;
            countPagesBtn = pages;
        })();

        //價格篩選器
        //waiting...

        new Vue({
            el: '#prodRender',
            data: {
                searchbar: '',
                prodList: data, //商品json [{obj1}, {obj2}, ...]
                prodAmount: data.length, //商品個數
                prodListTitle: "全部商品",
                pagesBtn: countPagesBtn, //頁數
                pagesBtnIsFirst: true,
                isShop: 1, //v-if判斷 1=商品列表 2=腳踏車類 3=配件&保養品
                nowPsn: 0,
                nowProd: {},
            },
            methods: {
                orderOnChange(event){ //排序變更
                    switch( parseInt(event.target.value) ){
                        case 0:
                            this.prodList = data;
                            this.prodAmount = data.length;
                            break;
                        case 1:
                            this.prodList = order(this.prodList, "prodPrice");
                            this.prodAmount = this.prodList.length;
                            break;
                        case 2:
                            this.prodList = order(this.prodList, "prodPrice", 1);
                            this.prodAmount = this.prodList.length;
                            break;
                        default:
                            console.log(`onchange | ${event.target.value}`);
                    }
                },
                pageIsActive(e){ //更改頁數顏色
                    $(e.target).parent().children().removeClass("pages_active");
                    $(e.target).addClass("pages_active");
                },
                //簡化篩選器
                buttonFilter(data, assoc, value, title){
                    this.prodList = data.filter(item=>item[assoc] == value);
                    this.prodAmount = this.prodList.length;
                    this.prodListTitle = title;
                    this.isShop = 1;
                    this.filterOff();
                },
                onMoun(){ this.buttonFilter(data, "prodType", 1, "登山車"); }, //1 = 登山車
                onRoad(){ this.buttonFilter(data, "prodType", 2, "公路車"); }, //2 = 公路車
                onCity(){ this.buttonFilter(data, "prodType", 3, "城市車"); }, //3 = 城市車
                 decor(){ this.buttonFilter(data, "prodType", 6, "保養品及消耗品"); }, //6 = 保養品及消耗品
                 colorBlack(){ this.buttonFilter(data, "prodColor", "黑", "黑色"); },
                 colorWhite(){ this.buttonFilter(data, "prodColor", "白", "白色"); },
                   colorRed(){ this.buttonFilter(data, "prodColor", "紅", "紅色"); },
                  colorBlue(){ this.buttonFilter(data, "prodColor", "藍", "藍色"); },
                onAll(){
                    this.prodList = data.filter(item=>(item["prodType"] == 1 || item["prodType"] == 2 || item["prodType"] == 3));
                    this.prodAmount = this.prodList.length;
                    this.prodListTitle = "成車";
                    this.isShop = 1;
                },
                //saerch bar
                searching(){
                    if(this.searchbar != ''){
                        this.prodList = data.filter(item=>item["prodName"].toLowerCase().indexOf(this.searchbar.toLowerCase()) != -1);
                        this.prodListTitle = `關鍵字(${this.searchbar})`;
                    }else{
                        this.prodList = data;
                        this.prodListTitle = `全部商品`;
                    }
                    this.prodAmount = this.prodList.length;
                    this.isShop = 1;
                    this.filterOff();
                },
                //開啟手機篩選器
                filterOn(){
                    if( $('#fltr').css('right') == '0px' ){
                        $('#fltr').css('right', '-100%');
                    }else{
                        $('#fltr').css('right', 0);
                    }
                },
                //關閉手機篩選器
                filterOff(){
                    $('#fltr').css('right', '-100%');
                },
                //滑動頁面
                slideTo(){
                    $('html, body').animate({
                        scrollTop: parseInt( $('#scrollme').offset().top ) - 60,
                    }, 200);
                },
                //進入商品詳細頁
                showProd(bool){
                    this.nowPsn = localStorage["nowPsn"];
                    this.nowProd = data.slice(this.nowPsn - 1, this.nowPsn);
                    this.isShop = 2;
                    $(window).scrollTop('0');
                },
                //離開商品詳細頁
                leaveProd(){
                    this.isShop = 1;
                },
                //商品內頁摺疊
                prodFold(e){
                    let target = $(e.target);
                    target.parent().find(':not(.prodfolder, .prodfolder i)').toggle("fold");
                    if( target.find('i').hasClass('fa-arrow-circle-o-down') ){
                        target.find('i').removeClass('fa-arrow-circle-o-down');
                        target.find('i').addClass('fa-arrow-circle-o-up');
                    }else{
                        target.find('i').removeClass('fa-arrow-circle-o-up');
                        target.find('i').addClass('fa-arrow-circle-o-down');
                    }
                },
            },
            computed: {
                topPrice(){
                    let top = 0;
                    for(var i=0; i<this.prodAmount; i++){
                        if(parseInt(this.prodList[i]["prodPrice"]) > top){
                            top = parseInt(this.prodList[i]["prodPrice"]);
                        }
                    }
                    return top
                },
                lessPrice(){
                    let less = 999999;
                    for(var i=0; i<this.prodAmount; i++){
                        if(parseInt(this.prodList[i]["prodPrice"]) < less){
                            less = parseInt(this.prodList[i]["prodPrice"]);
                        }
                    }
                    return less
                },
            },
            watch: {
                value(){}
            },
        });
    }, "json")


    //Shop商品列表
    Vue.component('prod-component', {
        props: ['detail', 'name', 'price', 'img', "index"],
        methods: {
            emitShop(e){ //查看商品詳細
                let now;
                if( $(e.target).hasClass('prod') ){
                    now = $(e.target).find('.prodpsn').attr('psn');
                }else{
                    now = $(e.target).parents('.prod').find('.prodpsn').attr('psn');
                }
                localStorage["nowPsn"] = now;
                this.$emit('is-in-shop', false);
            },
            clickToAdd(e){
                //加入sessionStorage
                let psn = $(e.target).parent().next().attr('psn');
                let name = $(e.target).parent().prev().prev().prev().text();
                let price = $(e.target).parent().prev().text();
                let src = $(e.target).parent().parent().find('img').attr('src');
                if( !sessionStorage["cart-list"] ){
                    sessionStorage["cart-list"] = '';
                }
                if( sessionStorage["cart-list"].split(',').indexOf(psn) == -1){
                    sessionStorage["cart-list"] += `${psn},`;
                    sessionStorage[`cart-row-${psn}`] = `${name},${price.slice(1, price.length)},1,${src}`;
                    //動畫
                    let target = $(e.target).parents('.prod').clone();
                    let axis = target.offset().left;
                    target.css({
                        position: "absolute",
                        width: $(e.target).parents('.prod').width(),
                        height: $(e.target).parents('.prod').height(),
                        zIndex: 9999,
                    });
                    $(e.target).parent().next().append(target);
                    TweenMax.fromTo(target, .6, {
                        x: 0,
                        y: -30,
                        scale: 1,
                        transformOrigin: "50% 50%",
                    },{
                        x: -target.offset().left + window.innerWidth - target.width()/2 - 120,
                        y: -target.offset().top + $(window).scrollTop() - target.height()/2 + 30,
                        scale: 0,
                        transformOrigin: "50% 50%",
                        onComplete(){
                            $(e.target).parent().next().empty();
                        },
                    });
                }
            },
            clickToFavor(e){
                let psn = $(e.target).parent().next().attr('psn');
                if( !sessionStorage["prod-favor"] ){
                    sessionStorage["prod-favor"] = '';
                }
                if( sessionStorage["prod-favor"].split(',').indexOf(psn) == -1){
                    sessionStorage["prod-favor"] += `${psn},`;
                                    //動畫
                    let target = $(e.target).parents('.prod').clone();
                    let axis = target.offset().left;
                    target.css({
                        position: "absolute",
                        width: $(e.target).parents('.prod').width(),
                        height: $(e.target).parents('.prod').height(),
                        zIndex: 9999,
                    });
                    $(e.target).parent().next().append(target);
                    TweenMax.fromTo(target, .6, {
                        x: 0,
                        y: -30,
                        scale: 1,
                        transformOrigin: "50% 50%",
                    },{
                        x: -target.offset().left + window.innerWidth - target.width()/2 - 120,
                        y: -target.offset().top + $(window).scrollTop() - target.height()/2 + 30,
                        scale: 0,
                        transformOrigin: "50% 50%",
                        onComplete(){
                            $(e.target).parent().next().empty();
                        },
                    });
                }
            },
        },
        template: `
            <li class="prod col-6 col-md-6" @click="emitShop">
                <div class="prod-shell" style="position: relative;">
                    <div class="prod-pic">
                        <img :src="img">
                    </div>
                    <h3 class="prod-title">{{name}}</h3>
                    <p class="prod-context">{{detail}}</p>
                    <p class="prod-money">\${{price}}</p>
                    <div class="prodIcon">
                        <p class="prod_like" @click.stop="clickToFavor"></p>
                        <p class="prod_cart" @click.stop="clickToAdd"></p>
                    </div>
                    <div class="prodpsn" :psn="index" style="height: 0;position: absolute;top: 0;left: 0;"></div>
                </div>
            </li>
        `,
    });

    //prod內頁
    // 用localStorage去抓
    Vue.component('prod-intro', {
        props: ['img', 'price', 'type', 'name', 'detail', 'psn'],
        data(){
            return {
                typePsn: this.type,
                count: 0,
            }
        },
        computed:{
            typeTrans(){
                if(this.typePsn == 1){
                    return "登山車"
                }else if(this.typePsn == 2){
                    return "公路車"
                }else if(this.typePsn == 3){
                    return "城市車"
                }else if(this.typePsn == 4){
                    return "保養品"
                }else if(this.typePsn == 5){
                    return "配件"
                }
            },
        },
        methods: {
            addToCart(e){
                //加入sessionStorage
                let psn = $(e.target).parent().prev().prev().prev().attr('psn');
                let name = $(e.target).parent().prev().prev().prev().text();
                let price = $(e.target).parent().prev().prev().text();
                let count = $(e.target).parent().prev().find('.prod-amount-show').text();
                let src = $(e.target).parents('.prod-info-m').find('img').attr('src');
                console.log(psn);
                if( !sessionStorage["cart-list"] ){
                    sessionStorage["cart-list"] = '';
                }
                if(count != 0){
                    if( sessionStorage["cart-list"].split(',').indexOf(psn) == -1){
                        sessionStorage["cart-list"] += `${psn},`;
                        sessionStorage[`cart-row-${psn}`] = `${name},${price.slice(4, price.length)},${count},${src}`;
                    }else{
                        sessionStorage[`cart-row-${psn}`] = `${name},${price.slice(4, price.length)},${count},${src}`;
                    }
                }else{
                    alert("請填選購買數量");
                }

            },
            addToFavor(e){
                console.log('addToFavor');
                let psn = $(e.target).parent().prev().prev().prev().attr('psn');
                if( !sessionStorage["prod-favor"] ){
                    sessionStorage["prod-favor"] = '';
                }
                if( sessionStorage["prod-favor"].split(',').indexOf(psn) == -1){
                    sessionStorage["prod-favor"] += `${psn},`;
                }
            },
        },
        template: `
            <div class="prod-info-m col-12 col-md-12">
            <div class="prod-pic-group col-12">
                <div class="prod-pic-main col-12 col-md-12">
                    <img class="prod-pic-show" :src="img">
                </div>
                <div class="prod-pic-slider col-12">
                    <div class="prod-pic-arrow col-md-1"></div>
                    <div class="prod-pic-innerslider col-10">
                        <div>
                            <div :style="{'backgroundImage': 'url(./' + img + ')'}"></div>
                            <div style="backgroundImage: url('./images/cyprod-sample-1.jpg');"></div>
                            <div style="backgroundImage: url('./images/cyprod-sample-2.jpg');"></div>
                            <div style="backgroundImage: url('./images/cyprod-sample-3.jpg');"></div>
                        </div>
                    </div>
                    <div class="prod-pic-arrow col-1"></div>
                </div>
            </div>
            <div class="prod-intro">
                <div class="center col-12">
                    <div class="prod-intro-text col-12 col-md-7">
                        <h2 class="prod-title">{{typeTrans}}</h2>
                        <p class="prod-introCont">{{detail}}</p>
                    </div>
                    <div class="prod-intro-btns col-12 col-md-5">
                        <h3 class="prod-name" :psn="psn">{{name}}</h3>
                        <p class="prod-money">NT$ {{price}}</p>
                        <ul>
                            <li class="prod-amount-arrow" @click="count>0?count--:count"><i class="fa fa-minus" aria-hidden="true"></i></i>
                            </li>
                            <li class="prod-amount-show col-4">{{count}}</li>
                            <li class="prod-amount-arrow" @click="count++;"><i class="fa fa-plus" aria-hidden="true"></i></i>
                            </li>
                        </ul>
                        <div>
                            <input type="button" class="prod-buy-join col-4 col-lg-10" value="加入購物車" @click="addToCart">
                            <input type="button" class="prod-save col-5" value="加入收藏" @click="addToFavor">
                        </div>
                        <p>付款方式: 信用卡 <i class="fa fa-credit-card" aria-hidden="true"></i></p>
                        <p>交貨方式: 貨運宅配 <i class="fa fa-car" aria-hidden="true"></i></p>
                        <p>服務承諾: 提供統一發票或免用統一發票收據</p>
                    </div>
                </div>
            </div>
        </div>
        `,
    });

    Vue.component('prod-spec', {
        data(){
            return {
                body: {年度: 2019, 車架: "GIANT ALUXX SL 輕量鋁合金車架", 前叉: "GIANT 碳纖維前叉 (鋁合金 OverDrive Steerer)", 前避震器: "N/A", 尺寸: "XS(42.5), S(44.5), M(47), M / L(47.0)", 顏色: "黑/紅"},
                ctrl: {車把手: "GIANT Connect 鋁合金 31.8", 車手豎桿: "GIANT 鋁合金"},
                spd: {變速把手: "SHIMANO Tiagra", 前變速器: "SHIMANO Tiagra", 後變速器: "SHIMANO Tiagra", 速別: "20"},
                brk: {煞車把手: "SHIMANO TIAGRA", 煞車組: "TEKTRO TKB177"},
                mve: {大齒盤: "SHIMANO TIAGRA 50/34T", 飛輪: "SHIMANO Tiagra 11-34T", 鏈條: "KMC X10", 腳踏: "WELLGO"},
                rtt: {輪圈: "GIANT S-R2 支援無內胎外胎", 花鼓: "GIANT S-R2", 鋼絲: "GIANT S-R2", 外胎: "GIANT GAVIA AC 2 700X25C WIRE TR"},
                oth: {坐墊: "Giant Contact Forward", 座管: "GIANT VARIANT 碳纖維"},
            }
        },
        template: `
            <div>
                <ul>車架系統
                    <li v-for="(value, key) in body">
                        <div>{{ key }}</div>
                        <div>{{ value }}</div>
                    </li>
                </ul>
                <ul>操控系統
                    <li v-for="(value, key) in ctrl">
                        <div>{{ key }}</div>
                        <div>{{ value }}</div>
                    </li>
                </ul>
                <ul>變速系統
                    <li v-for="(value, key) in spd">
                        <div>{{ key }}</div>
                        <div>{{ value }}</div>
                    </li>
                </ul>
                <ul>剎車系統
                    <li v-for="(value, key) in brk">
                        <div>{{ key }}</div>
                        <div>{{ value }}</div>
                    </li>
                </ul>
                <ul>傳動系統
                    <li v-for="(value, key) in brk">
                        <div>{{ key }}</div>
                        <div>{{ value }}</div>
                    </li>
                </ul>
                <ul>轉動系統
                    <li v-for="(value, key) in rtt">
                        <div>{{ key }}</div>
                        <div>{{ value }}</div>
                    </li>
                </ul>
                <ul>其他
                    <li v-for="(value, key) in oth">
                        <div>{{ key }}</div>
                        <div>{{ value }}</div>
                    </li>
                </ul>
            </div>
        `,
    });

    Vue.component('price-slider', {
        props: ['top', 'less'],
        template: `
            <div style="margin-top: 20px;">
                <div id="priceSlider"></div>
                <p id="priceSliderNum" style="color: #fff; margin-top: 20px; float: right;">{{this.less}}</p>
            </div>
        `,
        mounted(){
            $(this.$el).slider({
                min: this.less,
                max: this.top,
                slide(e, ui){
                    $('#priceSliderNum').html(ui.value);
                }
            });
            bannerSlider();
        },
        beforeDestroy(){
            $(this.$el).slider('hide').slider('destroy');
        },
        methods: {
            emitPrice(){
                this.$emit('update');
            },
        },
        computed: {
            getNowPrice(){
                return $('#priceSliderNum').html();
            }
        },
    });


    //fix
    squareFix();

    //resize
    window.addEventListener('resize', function(){
        squareFix();
    }, false);

}

//排序
let order = function(object, key, orderby = 0){ //[{}, {}, {}]
    let row = object.slice();
    let len = row.length;
    if(orderby == 0){
        for(var i=0; i<len; i++){
            for(var j=0; j<len-1-i; j++){
                if(parseInt(row[j][key]) > parseInt(row[j+1][key])){
                    let tmp = row[j];
                    row[j] = row[j+1];
                    row[j+1] = tmp;
                }
            }
        }
    }else{
        for(var i=0; i<len; i++){
            for(var j=0; j<len-1-i; j++){
                if(parseInt(row[j][key]) < parseInt(row[j+1][key])){
                    let tmp = row[j];
                    row[j] = row[j+1];
                    row[j+1] = tmp;
                }
            }
        }
    }
    return row
}

//bannerSlider
function bannerSlider(){
    var banner = new TimelineMax();
    banner.to( '#bannerRow' , .3, {
        x: -$('#bannerRow').width()/3 ,
        delay: 1.5,
    }).to( '#bannerRow' , .3, {
        x: -$('#bannerRow').width() * 2 / 3 ,
        delay: 1.5,
    }).to( '#bannerRow' , 0, {
        x: 0,
        delay: 1.5,
        onComplete: bannerSlider,
    });
}

//fix
function squareFix(){
    $('.square').css({
        height: $('.square').width()
    });
}

window.addEventListener('load', init, false);