$(function () {
    $.ajax({
        url: bigNews.user,
        success: function (backData) {
            console.log(backData)
            if (backData.code == 200) {
                // $('#inputEmail1').val(backData.data.username);
                // $('#inputEmail2').val(backData.data.nickname);
                // $('#inputEmail3').val(backData.data.email);
                // $('#inputEmail4').val(backData.data.password);
                for (var key in backData.data) {
                    $('input.' + key).val(backData.data[key])
                }
                $('.user_pic').attr('src', backData.data.userPic);
            }
        }
    })

    // 1.图片预览
    $('#exampleInputFile').on('change', function () {
        var url = URL.createObjectURL($(this)[0].files[0])
        $('.user_pic').attr('src', url)
    })
    // 2.给修改按钮增加点击事件
    $('.btn-success').on('click', function (e) {
        e.preventDefault();
        // 3.使用fromData,获取用户文本的内容
        var fd = new FormData(document.querySelector('.form-horizontal'))
        // 3.发送请求

        $.ajax({
            type: 'post',
            url: bigNews.userEdit,
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                if (backData.code == 200) {
                    alert('修改成功!');
                    // 重新渲染首页面 获取用户信息
                    $.ajax({
                        url: bigNews.admin,
                        success: function (backData) {
                            if (backData.code == 200) {
                                // ifarme标签子页面调用父页面元素的方法
                                // 因为现在是子页面，要调用父页面的元素，前面加parent
                                parent.$('.user_info img').attr('src', backData.data.userPic)
                                parent.$('.user_info > span > i').text(backData.data.nickname)
                                parent.$('.user_center_link img').attr('src', backData.data.userPic)
                            }
                        }
                    })
                }
            }
        })
    })
})