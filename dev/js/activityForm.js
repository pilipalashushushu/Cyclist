{/* <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script> */}
{/* <script type="module" src="js/dropkick.js"></script> */}

$(document).ready(function(){


    // $('#title').focus(function(){
    //     console.log("test");
        
    //     $(this).parent().next().addClass('focus');
    // }).blur(function(){
    //     $(this).parent().next().removeClass('focus');
    // })

    

    $('#twzipcode').twzipcode({
        onCountySelect:function(){
            $('.county').addClass("dk-select-open-up");
        }
    });
    document.getElementById("drag-box").ondragover = dragOver;
    document.getElementById("drag-box").ondrop = dropped;
    document.getElementById("the-file").onchange = fileChange

    function dragOver(e) {
        e.preventDefault();

    }

    let image = document.getElementById('drag-img');

    function dropped(e) {
        e.preventDefault();
        let file = e.dataTransfer.files[0];
        document.getElementById("the-file").innerText = file.name;

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', function (e) {


        image.src = this.result;

            // image.style.maxWidth = '500px';
            // image.style.maxHeight = '400px';

        });
    }

    function fileChange() {
        let file = document.getElementById("the-file").files[0];

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', function () {
            image.src = this.result;
        })
    }


    
    // $('.county').dropkick();
    // $('.district').dropkick();
    
    $('#level').dropkick(
        // initialize(){},

    );


    // ============================表單==================================
    


//    -----------------------縣市區域-----------------------
    var countyList ={
         north:['台北市','新北市','基隆市','桃園市','新竹市','新竹縣','宜蘭縣','連江縣'],
         central:['苗栗縣','台中市','彰化縣','南投縣','雲林縣','金門縣'],
         south:['嘉義市','嘉義縣','台南市','高雄市','屏東縣','澎湖縣'],
         east:['花蓮縣','台東縣'],
    }


    let region="";
    let selectedCounty;
    // $('#twzipcode').find('input[type="select"][name="county"]').on("change",function(){
    
    $('#twzipcode').find('select[name="county"]').on("change",function(){
        
        console.log($(this).val());
        selectedCounty = $(this).val();
        
        if($.inArray(selectedCounty,countyList.north)!==-1){
            // console.log(selectedCounty);
            // console.log(countyList.north);
            region = "北部";
        }else if($.inArray(selectedCounty,countyList.central)!==-1){
            region = "中部";
        }else if($.inArray(selectedCounty,countyList.south)!==-1){
            region = "南部";
        }else{
            region = "東部";
        }
        console.log(region);
    })

    
    
    // ===============表單送出==============================
    

    // $('#act-submit').on("click",formData);
    $('#act-submit').on("click",function(){

        
        // e.preventDefault();
                // var form = $('#act-form')
                // var formData = new FormData(form);
                
                // 表單驗證 正規表達
                // 1.如果維空

                // -------------活動地點------------------
                var actLoc='';
                var county,district;
                function getLocation(){
                    
                    county = selectedCounty;
                    district = $('#twzipcode').find('select[name="district"]').val()
                    loc =$('#loc').val();
                    actLoc += county;
                    actLoc += district;
                    actLoc += loc;
                    console.log(actLoc);
                
                }

                getLocation();


            
                // --------活動車種---------
                let checkedValue = $('input[name^=type]:checked').map(function(){
                    // return item.val();
                    return $(this).val();
                });

                let typeStr = Array.from(checkedValue).join('');
                // console.log(typeStr);
                console.log($('#the-file').val());
                console.log($('#title').val());
                console.log(actLoc);
                console.log(region);
                console.log($('#act-content').val());
                console.log($('#date').val());
                console.log($('#time').val());
                console.log($('#DeadLineDate').val());
                console.log(typeStr);
                console.log($('#level').val());
                console.log($('#limit').val());
                
            
                // 少了舉辦人會員 他同時是一個參加人
                // total預設值1
                // id圖片
                

                $.ajax({
                    url:"./php/actForm.php",
                    type:"POST",
                    data:{
                        
                        act_img:$('#the-file').val(),
                        act_title:$('#title').val(),
                        // act_twzip:$('#twzipcode').val(),
                        act_location:actLoc,
                        act_region:region,
                        act_content:$('#act-content').val(),
                        act_date:$('#date').val(),
                        act_time:$('#time').val(), //時間格式
                        act_DeadLineDate:$('#DeadLineDate').val(),
                        act_type:typeStr,
                        act_stren:$('#level').val(),
                        act_limit:$('#limit').val() //下拉取值

                        
                    },
                    // dataType:"JSON",
                    success:function(msg){

                        // alert(msg);

                        // alert("成功");
                        // var msg = JSON.parse(jsonStr)
                        // if (msg.json_msg=="success"){
                        //     alert("成功");
                        //     // $("#result").text(msg.json_msg);
                        // }else{
                        //     alert("半成功");
                        //     // $("#result").text(msg.json_msg);
        

                        // }
                    },err:function(res){
                        console.log(res);
                        // alert("回傳失敗");
                    }

                })

                alert("成功建立活動");
                location.href="activity.html";


    });
   
        

        


    


    
})