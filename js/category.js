$(function(){
    var myScroll = new IScroll('.left');

    $('.left').on('tap','li',function(){
        $(this).addClass('active').siblings().removeClass('active')
        myScroll.scrollToElement(this)
    })
})