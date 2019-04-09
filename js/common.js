$(function () {
    // 默认情况 下，mui不响应click单击事件，这是它的默认行为
    // 我们解决方式就是重新为所有A绑定tap
    mui('body').on('tap', 'a', function (e) {
        e.preventDefault()
        window.top.location.href = this.href;
    });


    const baseURL = 'http://157.122.54.189:9094/api/public/v1/'
    // 添加zepto拦截器：它的作用是可以让每个ajax请求都经过这个函数进行处理
    // beforeSend：每次发送ajax请求都必须经过的处理函数
    $.ajaxSettings.beforeSend = function (xhr, obj) {
        $('body').addClass('loadding')
        // 在这边我们想拼接url
        // console.log(obj)
        // obj.url:就是当前发送请求的url
        obj.url = baseURL + obj.url

        // 在访问私有路径的时候，手动的将token值传递给服务器
        // 值如何传递：通过请求头的方式将token值传递给服务器
        if(obj.url.indexOf('/my/') != -1){
            // xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')

            xhr.setRequestHeader('Authorization',sessionStorage.getItem('pyg_token'))
        }
    }

    // complete：请求完成时触发
    $.ajaxSettings.complete = function () {
        // 在这边我们想拼接url
        // console.log(456)
        $('body').removeClass('loadding')
    }

    // 动态扩展zepto中的成员
    $.extend($, {
        getParameter: function (url) {
            var obj = {}
            // location.search:url中?及?后面的内容
            url = url.substring(1) //cid=5&name=jack
            // 先按&拆分
            var arr = url.split('&') //['cid=5','name=jack']
            // 遍历进行第二次拆分
            for (var i = 0; i < arr.length; i++) {
                var temp = arr[i].split('=') //['cid',5]
                obj[temp[0]] = temp[1] // obj['cid'] = 5
            }
            return obj // {cid:5,name:'jack'}
        }
    });
})