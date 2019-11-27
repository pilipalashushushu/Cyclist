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
                location.reload();
            },
        });
    });
})
