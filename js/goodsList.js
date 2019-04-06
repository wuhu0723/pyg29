$(function () {
    // 单击搜索实现侧滑效果
    $('.mui-icon-search').on('tap',function(){
        mui('.mui-off-canvas-wrap').offCanvas('show');
    })

    // 参数
    var data = {
        query:'',
        cid:getParameter(location.search).cid,
        pagenum:1,
        pagesize:10
    }

    renderMainData()
    // 获取数据
    // 封装函数原因是：后期下拉和上拉的时候需要重新加载数据
    function renderMainData(){
        console.log(data)
        $.ajax({
            type:'get',
            url:'goods/search',
            data:data,
            dataType:'json',
            success:function(result){
                console.log(result)
            }
        })
    }



    mui.init({
        swipeBack:false,
        pullRefresh: {
            container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            // down:说明这是下拉的初始化
            down: {
                height: 50,//可选,默认50.触发下拉刷新拖动距离,
                auto: false,//可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function () { //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；

                }
            },
            // 上拉加载更多数据
            up: {
                height: 50,//可选.默认50.触发上拉加载拖动距离
                auto: false,//可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: function(){

                }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    // ?cid=5&name=jack
    function getParameter(url){
        var obj = {}
        // location.search:url中?及?后面的内容
        url = url.substring(1) //cid=5&name=jack
        // 先按&拆分
        var arr = url.split('&') //['cid=5','name=jack']
        // 遍历进行第二次拆分
        for(var i=0;i<arr.length;i++){
            var temp = arr[i].split('=') //['cid',5]
            obj[temp[0]] = temp[1] // obj['cid'] = 5
        }
        return obj
    }
})