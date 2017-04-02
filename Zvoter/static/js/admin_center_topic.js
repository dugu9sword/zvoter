/**
 * Created by walle on 2017/2/14.
 */
$(function(){
    // 启动时渲染状态颜色
    $(".current_status").each(function(){
        var $this = $(this);
        var current_status = $.trim($this.attr("data-status"));
        $this.css("color", get_color(current_status));
        console.log(get_color(current_status))
    });


// end!
});