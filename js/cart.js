$(function(){
    // 初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false //是否显示滚动条，默认为True
    });


    // 获取数据生成动态结构
    $.ajax({
        type:'get',
        url:'my/cart/all',
        dataType:'json',
        success:function(result){
            console.log(result)
            var data = JSON.parse(result.data.cart_info)
            console.log(data)
            var html = template('orderTemp',{list:data})
            $('.order_list').html(html)
        }
    })
})