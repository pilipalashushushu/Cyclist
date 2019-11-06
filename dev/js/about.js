$(function () {

    $("#aboutsection").fullpage({
        verticalCentered: false,
        navigation: true, // 顯示導行列
        navigationPosition: "left", // 導行列位置
        anchors: ["cyclist", "專屬騎行", "單車體驗", "最新活動", "Cy嚴選", "不可不知", "關於Cy"],
        showActiveTooltip: true,
        keyboardScrolling: true,
        loopBottom: true,
    });

});