$(function () {
    // 1.导入htt.js文件
    // 2.发送请求获取用户信息,渲染到页面
    // 3.从login页面传入token
    $.ajax({
        url: bigNews.admin,
        success: function (backData) {
            if (backData.code == 200) {
                $('.user_info img').attr('src', backData.data.userPic)
                $('.user_info > span > i').text(backData.data.nickname)
                $('.user_center_link img').attr('src', backData.data.userPic)
            }
        }
    })
    // 4.点击退出返回到login界面，并且清除token
    $('.logout').on('click', function () {
        $('#myModal').modal()
    })
    // 5.点击确认返回登录界面
    $('.btn-tc').on('click', function () {
        location.href = './login.html'
        localStorage.removeItem('token')
    })


    // 二.左侧导航栏的高亮显示
    $('.menu > .level01').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).index() == 1) {
            $(this).find('b').toggleClass('rotate0')
            $('.level02').slideToggle()
            // dom对象的触发点击方法
            // jQuery的clikc事件不能触发a标签的跳转事件
            $('.level02 li > a')[0].click()
            return false;
        }
    })
    // 给ul里的li设置点击事件
    $('.level02 li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })

})