$(function(){
    // 初始化iscroll
    var myScroll = new IScroll('.left');
    // 为左侧li绑定单击操作
    $('.left').on('tap','li',function(){
        // 样式的切换
        $(this).addClass('active').siblings().removeClass('active')
        // 实现 元素置顶
        myScroll.scrollToElement(this)
    })
})