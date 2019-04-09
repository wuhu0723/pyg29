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
            // console.log(data)
            var html = template('orderTemp',{list:data})
            $('.order_list').html(html)
            // 重新对number-box进行初始化，否则不能使用
            mui('.pyg_userNum').numbox()
            // 计算总价格
            calcTotalPrice()
        }
    })

    // 单击编辑
    $('.pyg-orderEdit').on('tap',function(){
        // 切换body的样式，实现元素的统一的显示和隐藏
        $('body').toggleClass('eleToggle')
        // 判断当前按钮的显示文本是‘编辑’还是'完成'
        if($(this).text() == '编辑'){
            // 设置文本内容
            $(this).text('完成')
        }else{
            $(this).text('编辑') 
            // 将用户编辑更新到数据库 -- 同步购物车
        }
    })


    // 计算总价
    function calcTotalPrice(){
        var total = 0
        // 1.获取所有商品列表
        var allOrders = $('.order-singer')
        allOrders.each(function(index,value){
            console.log(value)
            // 计算价格进行累加：数量 * 价格
            // 获取价格
            var price = $(value).data('order').goods_price
            // 获取数量
            var num = $(value).find('#test').val()
            // 计算总价
            total = total + (price * num)
            // 赋值到元素
            $('.price').text('￥ ' + total)
        })
    }
})