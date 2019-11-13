function init(){
    // alert("cyshop");
    ajax();
}

function ajax(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            alert(xhr.response);
        }else{
            alert(xhr.status);
        }
    };
    xhr.open('get', './php/CYShop.php', true);
    xhr.send(null);
}

window.addEventListener('load', init, false);