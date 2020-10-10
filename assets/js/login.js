$(function() {
    //1.点击显示隐藏区域
    //1.1点击去注册账号，隐藏登录区域
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    //1.2点击去登陆，隐藏去注册区域
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });
    //2.定义验证规则
    var form = layui.form;
    form.verify({
        //2.1密码规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //2.2确认密码规则
        repwd: function(value) {
            // 选择的是后代中的input,name为password的标签
            var pwd = $('.reg-box input[name = password]').val();
            if (value !== pwd) {
                return '两次密码输入不一致'
            }
        }
    });

    //3.注册功能
    var layer = layui.layer;
    $('#form_reg').on('submit', function(e) {
        // 3.1阻止表单的默认提交行为
        e.preventDefault();
        //3.2发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            //  $(this).serialize()传入三个数据，data:{}传入两个数据
            // 传入数据多可以，少不可以
            // data: {
            //     username: $('.reg-box [name=username]').val(),
            //     password: $('.reg-box [name=password]').val(),
            // },
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('恭喜您，注册成功，请登录');
                // 3.3手动切换到登录表单
                $('#link_login').click();
                // 3.4重置form表单
                // console.log($('#form_reg'));
                $('#form_reg')[0].reset();
            }
        })
    });

    //4.登录功能
    $('#form_login').on('submit', function(e) {
        //4.1阻止表单默认提交行为
        // alert(1)
        e.preventDefault();
        //4.2发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('恭喜您，登陆成功');
                // 保存token 
                localStorage.setItem('token', res.token);
                // 跳转页面
                location.href = "/index.html";
            }
        })
    })
})