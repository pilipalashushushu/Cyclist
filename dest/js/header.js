 //滾動收起nav-bar
 $(window).scroll(function (e) {

     var before = parseInt($(window).scrollTop());

     $(window).scroll((e) => {

         var after = parseInt($(window).scrollTop());

         let direction = (after - before > 0) ? "down" : "up"

         if (direction == "down") {
             $("header").animate({
                 "top": "-60px"
             }, 500)
         }

         before = after;
         if (direction == "up") {
             $("header").animate({
                 "top": "0px"
             }, 500)
         }

         before = after;

         console.log(direction)

     })

 })
 //滑鼠移動到原本nav-bar位置時  nav-bar出現

 $(window).mousemove(function (e) {
     // values: e.clientX, e.clientY, e.pageX, e.pageY

 });