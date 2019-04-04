$(function(){
    // 默认情况 下，mui不响应click单击事件，这是它的默认行为
    // 我们解决方式就是重新为所有A绑定tap
    mui('body').on('tap', 'a', function (e) {
        e.preventDefault()
        window.top.location.href = this.href;
    });


    const baseURL = 'http://157.122.54.189:9094/api/public/v1/'
    // 添加zepto拦截器：它的作用是可以让每个ajax请求都经过这个函数进行处理
    // beforeSend：每次发送ajax请求都必须经过的处理函数
    $.ajaxSettings.beforeSend = function(xhr,obj){
        $('body').addClass('loadding')
        // 在这边我们想拼接url
        console.log(obj)
        // obj.url:就是当前发送请求的url
        obj.url = baseURL + obj.url
    }

    // complete：请求完成时触发
    $.ajaxSettings.complete = function(){
        // 在这边我们想拼接url
        // console.log(456)
        $('body').removeClass('loadding')
    }
})