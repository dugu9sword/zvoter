/**
 * Created by walle on 2017/1/24.
 */
$(function(){
    // 调整发起投票高度
    function resize(){
        var l = $("#voter_btn_big:visible").length;
        if(l){
            $("#voter_btn_small,#sort_select_btn2").hide(1);
        }
        else{
             $("#voter_btn_small,#sort_select_btn2").show(1);
        }
    }
    resize();
    $(window).resize(function(){
        resize();
    });


    //end!
});