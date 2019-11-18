$(function () {

    getAjax()
    // 发送请求信息
    function getAjax() {
        $.ajax({
            url: bigNews.artice_list,
            success: function (backData) {
                // 2.建立模板
                var resHtml = template('artice', backData);
                $('tbody').html(resHtml)
            }
        })
    }
    // 判断点击的是编辑还是新增
    // e.relatedTarget 是bootsarp模态框里的事件
    $('#myModal').on('show.bs.modal', function (e) {
        // console.log(e.relatedTarget); //可以看是谁触发了这个事件

        if (e.relatedTarget == $('#xinzengfenlei')[0]) {
            $('#recipient-name').val('').prev().text('新增分类名称:')
            $('#message-text').val('').prev().text('新增分类Sulg:')
            $('.modal-footer > .btn-primary').addClass('btn-success')
        } else {
            $('#recipient-name').val($(e.relatedTarget).parent().prev().prev().text().trim()).prev().text('编辑分类名称:')
            $('#message-text').val($(e.relatedTarget).parent().prev().text().trim()).prev().text('编辑分类Sulg:')
            $('.modal-footer > .btn-primary').removeClass('btn-success').text('编辑')
            $('#artice_id').val($(e.relatedTarget).attr('data_id').trim())
        }
    })

    // 点击取消清空里面的内容
    $('.btn-quxiao').on('click', function () {
        $('#myModal form')[0].reset();
    })

    // 点击新增发送请求
    $('.modal-footer > .btn-primary').on('click', function () {
        // 判断模态框里面点的是新增按钮还是编辑按钮
        if ($(this).hasClass('btn-success')) {
            // true是新增，flase是编辑
            //获取输入文本的内容
            var name = $('#recipient-name').val().trim()
            var slug = $('#message-text').val().trim()
            // 判断非空
            if (name == '' || slug == '') {
                alert('内容不能为空')
                return;
            }
            // 发送ajax请求
            $.ajax({
                type: 'post',
                url: bigNews.artice_add,
                data: {
                    name: name,
                    slug: slug
                },
                success: function (backData) {
                    if (backData.code == 201) {
                        alert(backData.msg)
                        $('.btn-quxiao').trigger('click')
                        getAjax()
                    }
                }
            })
        } else {
            // var name = $('#recipient-name').val().trim()
            // var slug = $('#message-text').val().trim()
            // var id = $('#artice_id').val()


            // jquery的formData的方法，但是不能获取文件
            var data = $('#myModal form').serialize();

            // 判断非空
            if (name == '' || slug == '') {
                alert('内容不能为空')
                return;
            }
            $.ajax({
                type: 'post',
                url: bigNews.artice_edit,
                data: data,
                success: function (backData) {
                    if (backData.code == 200) {
                        alert(backData.msg)
                        $('.btn-quxiao').trigger('click')
                        getAjax()
                    }
                }
            })
        }
    })

    //删除对应的信息
    $('.category_table > tbody').on('click', '.btn-danger', function () {
        // 发送请求
        var id = $(this).attr('data_id');
        $.ajax({
            type: 'post',
            url: bigNews.artice_remover,
            data: {
                id: id
            },
            success: function (backData) {
                if (backData.code == 204) {
                    if (confirm('确认要删除？')) {
                        $('.btn-quxiao').trigger('click')
                        getAjax()

                    }
                }
            }
        })
    })

})