function init() {
  askQuestion();
}
//判斷螢幕尺寸大小
function askQuestion() {
  if ($(window).width() > 768) {
    main();
  } else {
    rwdMain();
  }
}

////////////////////變數設定開始////////////////////
//背景圖片
var background = ["questionBGI.png", "questionBGI2.png", "questionBGIDark.png"];
//問題
var questions = [
  ["1.請問腳踏車的日常保養要使用什麼油?", "鍊條油", "汽油", "橄欖油"],
  ["2.下列何者不是腳踏車的安全配備?", " 車鈴", "車燈", "火箭筒"],
  ["3.下列何者配戴時，可以保護我們頭部?", "手套", "安全帽", "大衣"],
  ["4.超越前車時應使用何種方式提醒?", "車鈴", "按喇叭", "喊叫"],
  ["5.夜晚騎腳踏車時，通常會在車架上加什麼以策安全?", "菜籃", "反光板", "旗子"]
];
//答案
var ans = ["鍊條油", "火箭筒", "安全帽", "車鈴", "反光板"];
var img = [
  ["ChainOil.png", "gasoline.png", "oliveOil.png"], //ans=1
  ["carBell.png", "carLight.png", "carPegs.png"], //ans=3
  ["gloves.png", "helmet.png", "coat.png"], //ans=2
  ["carBell.png", "horn.png", "Shouting.png"], //ans=1
  ["basket.png", "carLight.png", "flag.png"], //ans=2
];

////////////////////電腦動畫開始////////////////////
var count = 0;

function main() { //執行函式
  $('#question').text(questions[count][0]); //換qa的題目
  $('#ans1 img').attr("src", `./images/${img[count][0]}`); //換ans1的圖
  $('#ans2 img').attr("src", `./images/${img[count][1]}`); //換ans2的圖
  $('#ans3 img').attr("src", `./images/${img[count][2]}`); //換ans3的圖

  $('#ans1 p').text(questions[count][1]); //換ans1的文字
  $('#ans2 p').text(questions[count][2]); //換ans2的文字
  $('#ans3 p').text(questions[count][3]); //換ans3的文字

  //按下選項執行正確或錯誤,之後重複
  $('.box').click(function () {
    if ($(this).find('p').text() == ans[count]) {
      rightOut(); //正確動畫
    } else {
      wrongOut(); //錯誤動畫
    }
  });
  bikeIn(); //進場動畫
}
//此處判斷答題次數，小於5次重複答題，大於5次接結算畫面
function pcEnd() {
  count++;
  if (count < 5) {
    main();
  } else {
    score(); //呼叫結算畫面
    $('.scoreWindow').css("pointerEvents", "auto");
  }
}
//結算畫面
function score() {
  var score = new TimelineMax({});
  score.to('.scoreWindow', .5, {
    css: {
      opacity: 1
    }
  })
}
//腳踏車動態
function bike() {
  TweenMax.to('.bw', 1, {
    repeat: -1,
    rotation: 360,
    ease: Power0.easeNone,
  });
  TweenMax.to('.fw', 1, {
    repeat: -1,
    rotation: 360,
    ease: Power0.easeNone,
  });
  TweenMax.to('.bike', 1.5, {
    x: (screen.width) - 420,
    ease: Power0.easeNone,
  });
}

///動畫js///
function bikeIn() {
  bike();
  var pcMmoveIn = new TimelineMax({});
  pcMmoveIn.to('.qa', 1, {
    css: {
      opacity: 1
    }
  }).to('.ans1', .5, {
    delay: .3,
    css: {
      opacity: 1,
    }
  }).to('.ans2', .5, {
    delay: .3,
    css: {
      opacity: 1,
    }
  }).to('.ans3', .5, {
    delay: .3,
    css: {
      opacity: 1,
    }
  }).to('.bw', .1, {
    rotation: 0
  }).to('.fw', .1, {
    rotation: 0,
  })
}

//答對畫面顯示
function rightBoxShow() {
  var rightBoxIn = new TimelineMax({});
  rightBoxIn.to('.rightBox', 2, {
    css: {
      opacity: 1,
      delay: .5
    },
  }).to('.rightBox', 1, {
    css: {
      delay: .5,
      opacity: 0,
    }
  })
}
//答題正確,顯示答對畫面,腳踏車出去
function rightOut() {
  var rightToOut = new TimelineMax({});
  rightToOut.to('.rightBox', 1, {
    css: {
      onComplete: rightBoxShow,
      opacity: 0
    }
  }).to('.qa', .3, {
    css: {
      opacity: 0,
    }
  }).to('.fw', .5, {
    delay: 1,
    rotation: 360,
    repeat: -1,
    ease: Power0.easeNone,
  }).to('.bw', .5, {
    repeat: -1,
    rotation: 360,
    ease: Power0.easeNone,
  }).to('.ans1', .3, {
    css: {
      opacity: 0,
    }
  }).to('.ans2', .2, {
    css: {
      opacity: 0,
    }
  }).to('.ans3', .1, {
    css: {
      opacity: 0,
    }
  }).to('.bike', 1, {
    x: 2500,
    y: 0,
    opacity: 0,
  }).to('.bike', 1, {
    opacity: 1,
    startAt: {
      x: 300
    },
    onComplete: pcEnd
  })
}

//答錯畫面顯示
function wrongBoxShow() {
  var wrongBoxIn = new TimelineMax({});
  wrongBoxIn.to('.wrongBox', 2, {
    css: {
      opacity: 1,
      delay: .5
    },
  }).to('.wrongBox', 1, {
    css: {
      delay: .5,
      opacity: 0,
    }
  })
}
//答題錯誤,顯示答錯畫面,腳踏車出去
function wrongOut() {
  var wrongToOut = new TimelineMax({});
  wrongToOut.to('.wrongBox', 1, {
    css: {
      onComplete: wrongBoxShow,
      opacity: 0
    }
  }).to('.qa', .3, {
    css: {
      opacity: 0,
    }
  }).to('.ans1', .3, {
    css: {
      opacity: 0,
    }
  }).to('.ans2', .3, {
    css: {
      opacity: 0,
    }
  }).to('.ans3', .3, {
    css: {
      opacity: 0,
    }
  }).to('.fw', .2, {
    delay: .2,
    rotation: 360,
    ease: Power0.easeNone,
    repeat: -1,
  }).to('.bw', .2, {
    repeat: -1,
    rotation: 360,
    ease: Power0.easeNone,
  }).to('.bike', 1, {
    x: 2500,
    y: 0,
    opacity: 0,
  }).to('.bike', 1, {
    opacity: 1,
    startAt: {
      x: 300
    },
    onComplete: pcEnd
  })
}

////////////////////電腦動畫結束////////////////////

////////////////////手機動畫開始////////////////////
var count = 0;

function rwdMain() { //執行函式
  $('#question').text(questions[count][0]); //換qa的題目
  $('#ans1 img').attr("src", `./images/${img[count][0]}`); //換ans1的圖
  $('#ans2 img').attr("src", `./images/${img[count][1]}`); //換ans2的圖
  $('#ans3 img').attr("src", `./images/${img[count][2]}`); //換ans3的圖

  $('#ans1 p').text(questions[count][1]); //換ans1的文字
  $('#ans2 p').text(questions[count][2]); //換ans2的文字
  $('#ans3 p').text(questions[count][3]); //換ans3的文字

  //按下選項執行正確或錯誤,之後重複
  $('.box').click(function () {
    if ($(this).find('p').text() == ans[count]) {
      rightOut2(); //正確動畫
    } else {
      wrongOut2(); //錯誤動畫
    }
  });
  mbikeIn(); //進場動畫
}
//此處判斷答題次數，小於5次重複答題，大於5次接結算畫面
function phoneEnd() {
  count++;
  if (count < 5) {
    rwdMain();
  } else {
    score(); //呼叫結算畫面
    $('.scoreWindow').css("pointerEvents", "auto");
  }
}
//手機腳踏車動態
function mbike() {
  TweenMax.to('.bw', 1, {
    repeat: -1,
    rotation: 360,
    ease: Power0.easeNone,
  });
  TweenMax.to('.fw', 1, {
    repeat: -1,
    rotation: 360,
    ease: Power0.easeNone,
  });
  TweenMax.to('.bike', 1.5, {
    x: 580,
    y: 0,
    ease: Power0.easeNone,
  });
}
///動畫js///
function mbikeIn() {
  mbike();
  var pcMmoveIn = new TimelineMax({});
  pcMmoveIn.to('.qa', 1, {
      css: {
        opacity: 1
      }
    }).to('.ans1', .5, {
      delay: .3,
      css: {
        opacity: 1,
      }
    }).to('.ans2', .5, {
      delay: .3,
      css: {
        opacity: 1,
      }
    }).to('.ans3', .5, {
      delay: .3,
      css: {
        opacity: 1,
      }
    })
    .to('.bw', .1, {
      rotation: 0
    }).to('.fw', .1, {
      rotation: 0,
    })
}
//答題正確,顯示答對畫面,腳踏車出去
function rightOut2() {
  var rightToOut = new TimelineMax({});
  rightToOut.to('.rightBox', 1, {
    css: {
      onComplete: rightBoxShow,
      opacity: 0
    }
  }).to('.qa', .3, {
    css: {
      opacity: 0,
    }
  }).to('.fw', .5, {
    delay: 1,
    rotation: 360,
    repeat: -1,
    ease: Power0.easeNone,
  }).to('.bw', .5, {
    repeat: -1,
    rotation: 360,
    ease: Power0.easeNone,
  }).to('.ans1', .3, {
    css: {
      opacity: 0,
    }
  }).to('.ans2', .2, {
    css: {
      opacity: 0,
    }
  }).to('.ans3', .1, {
    css: {
      opacity: 0,
    }
  }).to('.bike', 1, {
    x: 1000,
    y: 0,
    opacity: 0,
  }).to('.bike', 1, {
    opacity: 1,
    startAt: {
      x: 100
    },
    onComplete: phoneEnd
  })
}

//答題錯誤,顯示答錯畫面,腳踏車出去
function wrongOut2() {
  var wrongToOut = new TimelineMax({});
  wrongToOut.to('.wrongBox', 1, {
    css: {
      onComplete: wrongBoxShow,
      opacity: 0
    }
  }).to('.qa', .3, {
    css: {
      opacity: 0,
    }
  }).to('.ans1', .3, {
    css: {
      opacity: 0,
    }
  }).to('.ans2', .3, {
    css: {
      opacity: 0,
    }
  }).to('.ans3', .3, {
    css: {
      opacity: 0,
    }
  }).to('.fw', .2, {
    delay: .2,
    rotation: 360,
    ease: Power0.easeNone,
    repeat: -1,
  }).to('.bw', .2, {
    repeat: -1,
    rotation: 360,
    ease: Power0.easeNone,
  }).to('.bike', 1, {
    x: 1000,
    y: 0,
    opacity: 0,
  }).to('.bike', 1, {
    opacity: 1,
    startAt: {
      x: 100
    },
    onComplete: phoneEnd
  })
}



////////////////////手機動畫結束////////////////////

window.addEventListener('load', init);