$(function () {
    // 1.给登录设置点击事件
    $('.input_sub').on('click', function (e) {
        e.preventDefault()

        // 2.获取用户输入的账号和密码
        var username = $('.input_txt').val().trim();
        var password = $('.input_pass').val().trim();
        // 3.判断内容非空
        if (username == '' || password == '') {
            $('#myModal').modal();
            $('.modal-content').text('账号或密码不能为空');
            return;
        };
        // 4.发送请求
        $.ajax({
            type: 'post',
            url: bigNews.login,
            data: {
                username: username,
                password: password
            },
            success: function (backData) {
                // 5.正确后跳转到首页
                // 6.在成功登录后，把token放入本地浏览器的缓存里
                if (backData.code == 200) {
                    window.localStorage.setItem('token', backData.token)
                    window.location.href = './index.html'
                } else {
                    $('#myModal').modal();
                    $('.modal-content').text('账号或密码错误');
                }
            }
        })
    })

})