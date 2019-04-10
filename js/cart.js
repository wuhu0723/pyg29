$(function () {
    // 初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false //是否显示滚动条，默认为True
    });


    // 获取数据生成动态结构
    function init() {
        $.ajax({
            type: 'get',
            url: 'my/cart/all',
            dataType: 'json',
            success: function (result) {
                console.log(result)
                if (result.meta.status == 401) {
                    location.href = './login.html'
                } else {
                    // 我们获取到的数据是json格式字符串，所以在使用之前先进行格式转换
                    var data = JSON.parse(result.data.cart_info)
                    // console.log(data)
                    var html = template('orderTemp', { list: data })
                    $('.order_list').html(html)
                    // 重新对number-box进行初始化，否则不能使用
                    mui('.pyg_userNum').numbox()
                    // 计算总价格
                    calcTotalPrice()
                }
            }
        })
    }
    init()

    // 单击编辑
    $('.pyg-orderEdit').on('tap', function () {
        // 切换body的样式，实现元素的统一的显示和隐藏
        $('body').toggleClass('eleToggle')
        // 判断当前按钮的显示文本是‘编辑’还是'完成'
        if ($(this).text() == '编辑') {
            // 设置文本内容
            $(this).text('完成')
        } else {
            $(this).text('编辑')
            // 将用户编辑更新到数据库 -- 同步购物车
            syncCart($('.order-singer'))
        }
    })

    // 同步购物车
    // allList：就是你需要同步的数据
    function syncCart(allList) {
        // 收集数据：一定要符合后台的需求
        var list_obj = {}
        for (var i = 0; i < allList.length; i++) {
            var data = $(allList[i]).data('order')
            console.log(data)
            // 注意重置用户修改的数量
            data.amount = $(allList[i]).find('#test').val()
            // 后台所需要的数据格式是键值对
            list_obj[data.goods_id] = data
        }
        console.log(list_obj)
        // 发起ajax请求
        $.ajax({
            type: 'post',
            url: 'my/cart/sync',
            data: { 'infos': JSON.stringify(list_obj) },
            success: function (result) {
                console.log(result)
                init()
            }
        })
    }


    // 计算总价
    var total
    function calcTotalPrice() {
        total = 0
        // 1.获取所有商品列表
        var allOrders = $('.order-singer')
        allOrders.each(function (index, value) {
            console.log(value)
            // 计算价格进行累加：数量 * 价格
            // 获取价格
            var price = $(value).data('order').goods_price
            // 获取数量：用户可以随时修改数量，所以不能从自定义属性中进行数据的获取
            var num = $(value).find('#test').val()
            // 计算总价
            total = total + (price * num)
        })
        // 赋值到元素
        $('.price').text('￥ ' + total)
    }

    // 单击修改数量重新计算价格
    $('.order_list').on('tap', '.pyg_userNum .mui-btn', function () {
        calcTotalPrice()
    })

    // 删除购物车商品信息
    $('.pyg_orderDel').on('tap', function () {
        // 关键是获取到没有被选择的复选框所对应的商品信息列表
        var list = $('.order_list').find("[type='checkbox']").not(':checked').parents('.order-singer')
        syncCart(list)
        init()
    })

    // 生成订单
    $('.pyg_createOrder').on('tap',function(){
        // 最关键的就是生成后台接口所需要的数据
        var order = {
            "order_price":total,
            "consignee_addr":$('.userAddress').text(),
            "goods":[]
        }
        var allOrders = $('.order-singer')
        allOrders.each(function (index, value) {
            var singer = {}
            var temp = $(value).data('order')
            singer.goods_id = temp.goods_id
            singer.goods_number = temp.amount
            singer.goods_price = temp.goods_price
            order.goods.push(singer)
        })
        console.log(order)
        $.ajax({
            type:'post',
            url:'my/orders/create',
            data:order,
            dataType:'json',
            success:function(result){
                console.log(result)
                location.href = './orderList.html'
            }
        })
    })

    $('.selectAddress').on('tap',function(){
        // 使得picker进行地址选择
        // 1.创建对象，设置为三级联动
        var picker = new mui.PopPicker({
            layer: 3
        }); 
        // 2.给picker对象添加数据,添加的数据只能是数组
        picker.setData(data)
        // 3.显示picker，参数是一个回调函数，在回调函数有一个参数
        picker.show(function (items) {
            console.log(items);
            $('.userAddress').text(items[0].text+"-"+items[1].text+"-"+items[2].text)
          })
    })
})