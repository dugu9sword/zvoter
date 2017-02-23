/**
 * Created by zhouyi on 17-2-23.
 */
$(function () {
    $("#starred").click(function () {
        clearAll();
        $(this).addClass("active");
        $("#starred_panel").show();
    });

    $("#joined").click(function () {
        clearAll();
        $(this).addClass("active");
        $("#joined_panel").show();
    });

    $("#created").click(function () {
        clearAll();
        $(this).addClass("active");
        $("#created_panel").show();
    });

    function clearAll() {
        $("#starred").removeClass("active");
        $("#joined").removeClass("active");
        $("#created").removeClass("active");
        $("#starred_panel").hide();
        $("#joined_panel").hide();
        $("#created_panel").hide();
    }

    clearAll();
    $("#joined").click();
});