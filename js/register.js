$(function(){
    // 获取验证码
    $('#pyg_code').on('tap',function(){
        var mobile = $('[name="mobile"]').val()
        var reg = /^1[3-9]\d{9}$/
        if(!reg.test(mobile)){
            mui.toast('手机号码输入错误')
            // $('[name="mobile"]')[0].focus()
            return false;
        }
        $.ajax({
            type:'post',
            url:'users/get_reg_code',
            data:{mobile:mobile},
            dataType:'json',
            success:function(result){
                console.log(result)
                if(result.meta.status == 200){
                    $('[name="code"]').val(result.data)
                }
            }
        })
    })

    // 实现注册
    $('.btn-register').on('tap',function(){
        // 验证自己搞定
        // serialize:它可以获取当前表单中所有拥有name属性的表单元素的value值
        console.log($('form').serialize())
        $.ajax({
            type:'post',
            url:'users/reg',
            data:$('form').serialize(),
            dataType:'json',
            success:function(result){
                if(result.meta.status == 200){
                    mui.toast('注册成功')
                    setTimeout(function(){
                        location.href='./login.html'
                    },1000)
                }
            }
        })
    })
})