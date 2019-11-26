$(document).ready(function () {
    $("#memsign-in").click(function () {
        $.ajax({
            url: './php/sign_in.php',
            type: 'POST',
            data: {
                memId: $("#memId-in").val(),
                memPsw: $("#memPsw-in").val(),
            },
            success(data) {
                meminfo = JSON.parse(data);
                // window.open('member.html', '_self');
                //撈取會員資料寫入session
                if (sessionStorage['member'] == null) {
                    sessionStorage['member'] = meminfo;
                    sessionStorage['memId'] = meminfo.memId;
                    sessionStorage['memNo'] = meminfo.memNo;
                    sessionStorage['memNickName'] = meminfo.memNickName;
                    sessionStorage['memPic'] = meminfo.memPic;
                }
            },
        });
    });

    var memId = sessionStorage.getItem('memId');
    // alert(sessionStorage.getItem['memId'])
    if(sessionStorage['member'] != null || sessionStorage['member'] != undefined ){
        $('.memberId').innerText(memId);
        $('#login').innerText('登出');
    }
})

// $(document).ready(function () {
//     $('#sign-up-btn').click(function () {
//         // console.log( $("#memNickName0").val() );
//         // console.log( $("#memId0").val() );
//         // console.log( $("#memPsw0").val() );
//         // console.log( $("#memEmail0").val() );

//         $.ajax({
//             url: './php/sign_up.php',
//             type: 'POST',
//             data: {
//                 memNickName: $("#memNickName0").val(),
//                 memId: $("#memId0").val(),
//                 memPsw: $("#memPsw0").val(),
//                 memEmail: $("#memEmail0").val(),
//             },
//             success(data) {
//                 alert(data);
//                 window.open('member.html', '_self');
//             },
//         });
//     });
// })