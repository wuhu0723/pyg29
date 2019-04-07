$(function(){
    // 初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators:false //是否显示滚动条，默认为True
    });

    // alert($.getParameter(location.search).goods_id)
    // 发送请求，获取当前商品详细数据
    $.ajax({
        type:'get',
        url:'goods/detail',
        data:$.getParameter(location.search),
        dataType:'json',
        success:function(result){
            console.log(result)
            var html = template('gdTemp',result.data)
            $('.mui-scroll').html(html)
            mui('.mui-slider').slider({
                interval:2000
            });
        }
    })
})