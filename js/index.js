$(function(){
    banner()
    // nav()
    goodsList()
})

function banner(){
     // 动态生成轮播图结构
     $.ajax({
        type:'get',
        url:'home/swiperdata',
        dataType:'json',
        success:function(result){
            if(result.meta.status == 200){
                // 只有获取数据成功了，才有必要生成动态结构
                // 生成图片结构
                var html = template('pyg_bannerTemp',result)
                $('.pyg_indexbanner').html(html)
                // 生成点标记结构
                var indiHTML = template('indicatorTemp',result)
                $('.mui-slider-indicator').html(indiHTML)
                // 如果轮播图是动态生成就需要重新手动初始化
                mui('.mui-slider').slider({
                    interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
                });
            }
        }
    })
}

function nav(){
    $.ajax({
        type:'get',
        url:'home/catitems',
        dataType:'json',
        success:function(result){
            console.log(result)
        }
    })
}

function goodsList(){
    $.ajax({
        type:'get',
        url:'home/goodslist',
        dataType:'json',
        success:function(result){
            console.log(result)
            var html = template('prolistTemp',result)
            $('.pyg_goodsList').html(html)
        }
    })
}