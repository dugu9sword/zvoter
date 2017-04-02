/**
 * Created by walle on 2017/1/26.
 */
$(function(){
    var login_flag = $.trim($("#login_flag").text()) == "1";  // 是否已登录

    // 小屏幕切换按钮
    $(".change_tips").click(function(){
        var $this = $(this);
        if($this.attr("class").indexOf("active") == -1){
            $(".change_tips").toggleClass("active");
            if($this.text().indexOf("A") != -1){
                $(".tips_blue").removeClass("hidden-xs").addClass("col-xs-12");
                $(".tips_red").removeClass("col-xs-12").addClass("hidden-xs");
            }
            else{
                $(".tips_red").removeClass("hidden-xs").addClass("col-xs-12");
                $(".tips_blue").removeClass("col-xs-12").addClass("hidden-xs");

            }
        }

    });

    // 我要评论的锚点
    $("#jump_edit_area").click(function(){
        if(!login_flag){
            var url = "http://"+ location.host+ "/login";
            console.log(url);
            window.open(url);
        }
        else{
            location.href = "#my_message";
        }
    });

    // 优化进度条的样式
    function optimize_progress_bar(){
        var blue_obj = $(".blue_line");
        var red_obj = $(".red_line");
        var blue_num_str = $.trim(blue_obj.text().split("%")[0]);
        var red_num_str = $.trim(red_obj.text().split("%")[0]);
        var blue_num = parseFloat(blue_num_str);
        var red_num = parseFloat(red_num_str);
        var pattern = /^\d+\.0$/;  // 以.0结尾的

        if(pattern.test(blue_num_str) || pattern.test(red_num_str)){
            blue_num = parseInt(blue_num);
            red_num = parseInt(red_num);
        }else{}

        blue_obj.text(blue_num + "%");
        red_obj.text(red_num + "%");
        if(blue_num < 6){
            blue_obj.css("width", "6%");
            red_obj.css("width", "94%");
        }
        else if(red_num < 6){
            red_obj.css("width", "6%");
            blue_obj.css("width", "94%");
        }
        else{}
    }
    optimize_progress_bar();  // 执行优化进度条的样式

    // 回复评论按钮
    $(".receive_btn").click(function(){
        if(!login_flag){
            window.open("/login");
        }
        else{
            $("#to_comment").click();
            var obj = $(this).parents(".comment_bottom:first");
            var parent_comment = $.trim(obj.attr("data-id"));
            var text = $.trim($(this).attr("data-text"));
            $("#comment_obj").attr("data_parent_comment", parent_comment);
            $("#my_message").attr("placeholder", text);
            location.href = "#my_message";
        }
    });

    // 点击切换到回复主题按钮
    $("#to_topic").click(function(){
        if(login_flag){
            $("#to_topic").addClass("btn-primary");
            $("#to_comment").removeClass("btn-primary");
            $("#comment_obj").attr("data_parent_comment", 0);
            $("#my_message").attr("placeholder", "欢迎吐槽");
        }else{}
    });

    // 点击切换到回复评论按钮
    $("#to_comment").click(function(){
        if(login_flag){
            if($("#to_comment").attr("class").indexOf("btn-primary") != -1){
                //nothing...
            }
            else{
                $("#to_topic").removeClass("btn-primary");
                $("#to_comment").addClass("btn-primary");
                $("#my_message").attr("placeholder", "请先点击评论下方的回复按钮");
            }
        }else{}
    });

    // 当选择回复评论，单没有选择对应的评论是，输入字符的时候切换成回复主题状态。
    $("#my_message").keydown(function(){
        if(login_flag){
            if($("#to_comment").attr("class").indexOf("btn-primary") != -1 && $("#comment_obj").attr("data_parent_comment") == "0"){
                $("#to_topic").click();
            }
        }else{}
    });

    // 调整图片的高宽
    $(".img_a,.img_b").css("height", parseInt($(".voter_btn").css("width").split("px")[0])*0.75);

    //end!
});