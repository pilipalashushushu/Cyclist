var container = $('#chatBot-box'); //外層固定高 捲軸
var content = $('#chatBot-content'); //內層超出範圍



// 捲軸維持跑到最底端
function chatBotScrollTo(container, content) {

    let content_h = content.outerHeight(true)+60,
        container_h = container.outerHeight();
    // container.scrollTo({
    //     top: h,
    //     left: 0,
    //     behavior: "smooth"
    // });
    console.log(container_h);
    console.log(content_h);
    if(content_h > container_h)
    {
        container.scrollTop(content_h-container_h);
    }
    // container.animate({
    //     scrollTop: content.offset().top
    // }, 2000);
    
}


var chatData = [];
var userText = $('#chat-bot').find(".input");
// var userText=$('chat-box').find(".input");
var content = $('#chatBot-content');





// -----------------------------------------------------


function botReply(reply) {
 
    var frag = document.createDocumentFragment();
    frag = `
        <div class="dialog official">
        <div class="avatar">
            <div class="pic">
                <img src="./images/chat_bot/offical-1.jpg" alt="">
            </div>
            <div class="name">官方A</div>
        </div>
        <div class="msg">
            ${reply}
        </div>
    </div>
    `;
    content.append(frag);
    //更新卷軸
    // chatBotScrollTo(container, content);

}


function checkUserText(userMsg) {

    // for(let i=0;i<chatDate;)
    var ans = "";
    console.log(userMsg);

    chatData.forEach(function (item) {
        console.log(item.csKey);

        if (userMsg.indexOf(item.csKey) != -1 || item.csKey.indexOf(userMsg) != -1) {
            ans = item.csAns;
        }


    })

    if (ans == "") {
        ans = "稍等片刻，將請專人為您處理!"
    };

    console.log(ans);

    botReply(ans);

}

function putUserText(params) {
    let userText = $('#chat-bot').find(".input");
    let container = $('#chatBot-box'); //外層固定高 捲軸
    let content = $('#chatBot-content'); //內層超出範圍
    if (userText.val() == "") {
        return;
    } else {


        let frag = document.createDocumentFragment();
        let dialog = $('<div class="dialog customer"></div>').get(0);
        // console.log(dialog);

        // let avatar = $('<div/>').addClass('avatar'
        //     ).append(
        //         $('<div/>').get(0).addClass("pic").append(
        //             $('<img>').attr(src,"./images/chat_bot/customr-1.jpg")
        //         )
        //     ).append(
        //         $('<div/>').get(0).addClass("name").text("顧客A")
        //     )
        let avatar = "";
        avatar += '<div class="avatar">';
        avatar += '<div class="pic">';
        avatar += '<img src="./images/chat_bot/customr-1.jpg" alt="">';
        avatar += '</div>';
        avatar += '<div class="name">顧客A</div>';
        avatar += '</div>';


        // console.log(userText.val());

        let msg = $('<div class="msg"></div>').text(userText.val()).get(0);

        // dialog.appendChild(avatar).appendChild(msg);
        // dialog.innerHtml=avatar;

        dialog.innerHTML = avatar;
        dialog.appendChild(msg);
        console.log(dialog);

        frag.appendChild(dialog);
        content.append(frag);
        //傳送顧客輸入文字
        // getUserText();
        chatBotScrollTo(container, content);

        checkUserText(userText.val());
        
        // userText.val()="";
        userText.val("");
    }

}




// ---------------------------init--------------------------------------

function botTag(tags) {

    var qq = '';
    var group = $('#chat-box').find('#QA-group');
    // var group = $('#chat-box').find('.QA-group')[0];
    for (let i = 0; i < tags.length; i++) {
        //創造節點
        // var qa = $(`<div class='QA'>${tags[i].csKey}</div>`).get(0);
        // var newlab=$("<li><li>")[0];
        // console.log(newlab);
        qq += "<li class='QA'>"+tags[i].csKey+"</li>";
        // var qq = $("<li></li>").addClass("QA").text(tags[i].csKey).get(0);
        // qa.on('click', function(){
        //     let tagText = $(this).text();
        //     chatBot.find('.input').val() = tagText;
        //     chatBot.find('.send').click();
        // }); //??先綁定事件再插入 還是插入後再綁定事件

        // var keytag = document.createElement("li");
        // //定義元素樣式
        // keytag.className = "QA";
        // //創造節點
        // var textnodeB = document.createTextNode(tags[i].csKey);
        // keytag.appendChild(textnodeB);

        // console.log(group);
        // group.appendChild(qq);


        // console.log(qa);

    }
    console.log(qq);
    $("#QA-group").append(qq);

// $('#QA-group').on("click",".QA",function(){
    $(document).on("click",".QA", function(){
        var chatBot = $("#chat-bot");
        let tagText = $(this).text();
        console.log(tagText);
        chatBot.find('.input').val(tagText);
        putUserText();
        // chatBot.find('.send').click(putUserText);
    });


    // $('.QA').click(function(){
    //     console.log("QAQAQA");
        

    // })
    
    // for(let i=0; i<document.getElementsByClassName("QA").length;i++){

    //         document.getElementsByClassName("QA")[i].onclick=function(){
    //         let tagText = $(this).text();
    //         chatBot.find('.input').val() = tagText;
    //         chatBot.find('.send').click();
    //     }

    // }
   
}



function getTag() {

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {

            var data = JSON.parse(xhr.responseText);
            console.log(data);
            // console.log(xhr.responseText);
            botTag(data); //倒出標籤
            chatData = data;

        } else {
            console.log(xhr.status);

        }
    }

    var url = "php/robot.php";
    xhr.open("Get", url, true);
    xhr.send(null);
}



$(document).ready(function () {


    var chatBot = $("#chat-bot");

    //隱藏招呼
    // $('#greet').hide();

    $('.chat-bot-btn').click(function () {
        $('#chat-bot').toggleClass('open');
        // setTimeout(function () {
        //     $('#greet').show()
        // }, 1000)
    })
    getTag();
    chatBot.find('.send').on('click', putUserText);


})