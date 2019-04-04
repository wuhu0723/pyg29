$(function(){

    // 渲染页面动态结构
    render()

    // 所有分类数据
    var cateData

    // 创建渲染函数，实现数据的动态渲染
    function render(){
        // 获取本地数据，判断是否超时，如果没有超时就直接使用本地数据进行数据结构的动态渲染
        cateData = JSON.parse(localStorage.getItem('pyg_cateData'))
        if(cateData && Date.now() - cateData.time < 24*60*60*1000){
            // 使用本地存储进行数据的渲染
            leftCateList()
            rightCateList()
        }
        // 如果超时，则再次发起ajax请求
        else{
            alert(1)
            getCateList()
        }
    }

    // 发送请求获取分类数据
    function getCateList(){
        $.get('categories',function(result){
            console.log(result)
            if(result.meta.status == 200){
                // 将数据存储到本地存储
                // 1.客户端和服务器的数据交互只能是字符串
                // 2.文件的读取和写入只能是字符串
                // 3.本地存储的写入和获取也只能是字符串
                cateData = {'list':result.data,time:Date.now()}
                localStorage.setItem('pyg_cateData',JSON.stringify(cateData))
    
                // 动态生成左侧导航项结构-一级分类
                leftCateList()
    
                // 动态生成右侧二级分类数据
                rightCateList()
            }
        },'json')
    }

    // 动态生成左侧导航项结构-一级分类
    function leftCateList(){
        var html = template('leftnavTemp',cateData)
        console.log(html)
        $('.left ul').html(html)
        // 初始化iscroll
        var myScroll = new IScroll('.left');
        
        // 为左侧li绑定单击操作
        $('.left').on('tap','li',function(){
            // 样式的切换
            $(this).addClass('active').siblings().removeClass('active')
            // 实现 元素置顶
            myScroll.scrollToElement(this)
        })
    }

    // 动态生成右侧二级分类数据
    function rightCateList(){}
})