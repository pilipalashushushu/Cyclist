
function askQuestion(){

    if ($(window).width() > 768) {
        main();
     }
     else {
        rwdMain();
     }
}
////////////////////////////////////////////////

var background = ["questionBGI.png", "questionBGI2.png", "questionBGIDark.png"];
var questions =[
["1.請問腳踏車的日常保養要使用什麼油?","鍊條油","汽油","橄欖油"],
["2.下列何者不是腳踏車的安全配備?"," 車鈴","車燈","火箭筒"],
["3.下列何者配戴時，可以保護我們頭部?","手套","安全帽","大衣"],
["4.超越前車時應使用何種方式提醒?","車鈴","按喇叭","喊叫"],
["5.夜晚騎腳踏車時，通常會在車架上加什麼以策安全?","菜籃","反光板","旗子"]
];

var ans= ["鍊條油","火箭筒","安全帽","車鈴","反光板"];

var img = [
    ["ChainOil.png", "gasoline.png", "oliveOil.png"], //ans=1
    ["carBell.png", "carLight.png", "carPegs.png"], //ans=3
    ["gloves.png", "helmet.png", "coat.png"], //ans=2
    ["carBell.png", "horn.png", "Shouting.png"], //ans=1
    ["basket.png", "carLight.png", "flag.png"], //ans=2
];
count = 0;
function main(){  
    $('#question').text(questions[count][0]);   //換題目
    $('#ans1 img').attr("src",`./images/${img[count][0]}`); //換選項一的圖
    $('#ans2 img').attr("src",`./images/${img[count][1]}`); //換選項二的圖
    $('#ans3 img').attr("src",`./images/${img[count][2]}`); //換選項三的圖

    $('#ans1 p' ).text(questions[count][1]);    //換選項一的文字
    $('#ans2 p' ).text(questions[count][2]);    //換選項二的文字
    $('#ans3 p' ).text(questions[count][3]);    //換選項三的文字

    $('.box').click(function(){
        if($(this).find('p').text()==ans[count]){
            rightOut();
        }else{
            wrongOut();
        }          
    });
        bikeIn();
}
    function isEnd(){
        count++;
        if(count<5){
            main();
        }else{
           score();
        }
    }


    function rwdMain(){
        $('#question').text(questions[count][0]);   //換題目
        $('#ans1 img').attr("src",`./images/${img[count][0]}`); //換選項一的圖
        $('#ans2 img').attr("src",`./images/${img[count][1]}`); //換選項二的圖
        $('#ans3 img').attr("src",`./images/${img[count][2]}`); //換選項三的圖

        $('#ans1 p' ).text(questions[count][1]);    //換選項一的文字
        $('#ans2 p' ).text(questions[count][2]);    //換選項二的文字
        $('#ans3 p' ).text(questions[count][3]);    //換選項三的文字

        $('.box').click(function(){
            if($(this).find('p').text()==ans[count]){
                out();
            }else{
                out2();
            }          
        });
        bikeInRwd();
    }   

    function isEnd(){
        count++;
        if(count<5){
            rwdMain();
        }else{
           score();
        }
    }

///////



window.addEventListener('load', askQuestion);

///動畫js///


 //////////電腦版動畫js開始//////////////
 function bikeIn(){
    TweenMax.to('.bw',1,{
      repeat:-1,
      rotation:360,
      ease: Power0.easeNone, 
    })
    TweenMax.to('.fw',1,{
      repeat:-1,
      rotation:360,
      ease: Power0.easeNone, 
    })
    TweenMax.from('.bicycle',3,{
      x:500,
      ease: Power0.easeNone, 
    })
    
    var movein = new TimelineMax({
    })
    movein.to('.bicycle',2,{
      x:500,
    }).to('.qa',1,{
      css:{
        opacity:1
      }
    }).to('.ans1',.5,{
      delay:1,
      css:{
        x:600,
        y:-100,
        opacity:1, 
      }
    }).to('.ans2',.5,{
      delay:.2,
      css:{
        x:-50,
        y:-280,
        opacity:1,
      }
    }).to('.ans3',.5,{
      delay:.2,
      css:{
        x:-100,
        y:-200,
        opacity:1,
      }
    }).to('.bw',.1,{
      rotation:0
    }).to('.fw',.1,{
      rotation:0,
      // onComplete:play,
    })
    }
    //////////答對畫面開始//////////
    function rightBoxIn(){
      var rightBoxIn = new TimelineMax({})
      rightBoxIn.to('.rightBox',2,{
        css:{
          opacity:1,
          delay:.5
        },
      }).to('.rightBox',1,{
          css:{
            delay:.5,
            opacity:0,      
          }   
        })
    }
    //////////答對畫面結束//////////
    
    //////////錯誤畫面開始//////////
    function wrongBoxIn(){
      var wrongBoxIn = new TimelineMax({})
      wrongBoxIn.to('.wrongBox',2,{
        css:{
          opacity:1,
          delay:.5
        },
      }).to('.wrongBox',1,{
          css:{
            delay:.5,
            opacity:0,      
          }   
        })
    }
    //////////錯誤畫面結束//////////
    
    //////////答題正確出去開始//////////
    function rightOut (){
      var moveout = new TimelineMax({})
      moveout.to('.rightBox',1,{
        css:{
          onComplete:rightBoxIn,
          opacity:0
        }
      }).to('.qa',.3,{
        css:{
          opacity:0,
        }
      }).to('.fw',.5,{
        delay:1,
        rotation:360,
        ease: Power0.easeNone, 
        repeat:-1,
      }).to('.bw',.5,{
        repeat:-1,
        rotation:360,
        ease: Power0.easeNone, 
      }).to('.ans1',.3,{
        css:{
          opacity:0, 
        }
      }).to('.ans2',.2,{
        css:{
          opacity:0, 
        }
      }).to('.ans3',.1,{
        css:{
          opacity:0, 
        }
      }).to('.bicycle',1,{
        x:2000,
        onComplete:isEnd
      })
      }
      //////////答題正確出去結束//////////
      
      //////////答題錯誤出去開始//////////
      function wrongOut (){
        var moveout = new TimelineMax({})
        moveout.to('.wrongBox',1,{
          css:{
            onComplete:wrongBoxIn,
            opacity:0
          }
        }).to('.qa1',.3,{
          css:{
            opacity:0,
          }
        }).to('.ans1',.3,{
          css:{
            opacity:0, 
          }
        }).to('.ans2',.3,{
          css:{
            opacity:0, 
          }
        }).to('.ans3',.3,{
          css:{
            opacity:0, 
          }
        }).to('.fw',.2,{
          delay:.2,
          rotation:-360,
          ease: Power0.easeNone, 
          repeat:-1,
        }).to('.bw',.2,{
          repeat:-1,
          rotation:-360,
          ease: Power0.easeNone, 
        }).to('.bicycle',1,{
        //  rotationY:270,
         x:2000,
         onComplete:isEnd,
        })
        }
    //////////答題錯誤出去結束///////
    function score(){
        var score = new TimelineMax({})
        score.to('.scoreWindow',.5,{
            css:{
                opacity:1
            }
        })
    }
    /////////電腦版動畫js結束//////////
    









    
    ///////////手機版動畫js開始//////////
    function bikeInRwd(){ 
      TweenMax.to('.bw',1,{
        repeat:-1,
        rotation:360,
        ease: Power0.easeNone, 
      })
      TweenMax.to('.fw',1,{
        repeat:-1,
        rotation:360,
        ease: Power0.easeNone, 
      })
      TweenMax.from('.bicycle',3,{
        x:500,
        ease: Power0.easeNone, 
      })
     
      var movein = new TimelineMax({})
      movein.to('.bicycle',2,{
        x:550,
        ease: Power0.easeNone,
      }).to('.qa',.3,{
        css:{
          opacity:1,
        }
      }).to('.ans1',.5,{
        delay:1,
        css:{
          // x:100,
          y:-120,
          opacity:1, 
        }
      }).to('.ans2',.5,{
        delay:.2,
        css:{
          // x:-50,
          y:-120,
          opacity:1,
        }
      }).to('.ans3',.5,{
        delay:.2,
        css:{
          // x:-100,
          y:-120,
          opacity:1,
        }
      }).to('.bw',.1,{
        rotation:0
      }).to('.fw',.1,{
        rotation:0,
      })
      }
    //////////答題正確出去開始//////
    function out (){
    var moveout = new TimelineMax({})
    moveout.to('.rightBox',1,{
      css:{
        onComplete:rightBoxIn,
        opacity:0
      }
    }).to('.fw',.5,{
      delay:1,
      rotation:360,
      ease: Power0.easeNone, 
      repeat:-1,
    }).to('.bw',.5,{
      repeat:-1,
      rotation:360,
      ease: Power0.easeNone, 
    }).to('.qa',.3,{
      css:{
        opacity:0,
      }
    }).to('.ans1',.3,{
      css:{
        opacity:0, 
      }
    }).to('.ans2',.2,{
      css:{
        opacity:0, 
      }
    }).to('.ans3',.1,{
      css:{
        opacity:0, 
      }
    }).to('.bicycle',1,{
      x:2000,
      y:0,
      onComplete:isEnd
    })
    }
    //////////答題正確出去結束//////////
    
    //////////答題錯誤出去開始//////////
    function out2 (){
      var moveout = new TimelineMax({})
      moveout.to('.wrongBox',1,{
        css:{
          onComplete:wrongBoxIn,
          opacity:0
        }
      }).to('.qa1',.5,{
        css:{
          opacity:0,
        }
      }).to('.ans1',.3,{
        css:{
          opacity:0, 
        }
      }).to('.ans2',.3,{
        css:{
          opacity:0, 
        }
      }).to('.ans3',.3,{
        css:{
          opacity:0, 
        }
      }).to('.fw',.5,{
        delay:.2,
        rotation:-360,
        ease: Power0.easeNone, 
        repeat:-1,
      }).to('.bw',.3,{
        repeat:-1,
        rotation:-360,
        ease: Power0.easeNone, 
      }).to('.bicycle',1,{
        // rotationY:270,
        // transformOrigin:"center center",
        x:2000,
        y:0,
        onComplete:isEnd
      })
    }
    //////////答題錯誤出去結束////////
    //////////答對畫面開始//////////
    function rightBoxIn(){
      var rightBoxIn = new TimelineMax({})
      rightBoxIn.to('.rightBox',2,{
        css:{
          opacity:1,
          delay:.5
        },
      }).to('.rightBox',1,{
          css:{
            delay:.5,
            opacity:0,      
          }   
        })
    }
    //////////答對畫面結束//////////
    
    //////////錯誤畫面開始//////////
    function wrongBoxIn(){
      var wrongBoxIn = new TimelineMax({})
      wrongBoxIn.to('.wrongBox',2,{
        css:{
          opacity:1,
          delay:.5
        },
      }).to('.wrongBox',1,{
          css:{
            delay:.5,
            opacity:0,      
          }   
        })
    }
    //////////錯誤畫面結束//////////
    
    ///////////手機版動畫js結束/////////

    



