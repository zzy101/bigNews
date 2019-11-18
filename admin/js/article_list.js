$(function () {
    // 一.发送请求获取文章分类
    $.ajax({
        url: bigNews.artice_list,
        success: function (backData) {
            // 1.1 创建文章分类的模板引擎
            if (backData.code == 200) {
                // 1.2 渲染到分类下拉框
                var retHtml = template('listTemp', backData)
                $('#selCategory').html(retHtml)
            }
        }
    })

    // 优化代码
    // 封装文章数据的ajax的方法
    var myPage = 1;
    getAjax(myPage, null)
    function getAjax(myPage, callData) {
        $.ajax({
            url: bigNews.artice_query,
            data: {
                type: $('#selCategory').val().trim(),
                state: $('#selStatus').val().trim(),
                page: myPage,
                perpage: 7
            },
            success: function (backData) {
                // 2.1 获取成功后，渲染到页面，创建模板引擎
                var retHtml = template('searchTemp', backData);
                $('.table-striped tbody').html(retHtml)

                // 2.2 获取数据后插入分页
                if (callData != null) {
                    callData(backData)
                }
            }
        })
    }

    // 二.获取文章分类的名字，渲染到页面
    // 发送请求，根据id获取文章数据
    getAjax(1, function (backData) {
        // 2.2 获取数据后插入分页
        $('#pagination-demo').twbsPagination({
            totalPages: backData.data.totalPage,
            visiblePages: 9,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            // 点击页签触发的事件
            //  点击页签返回对应的文章数据，发送文章信息的ajax请求
            onPageClick: function (event, page) {
                myPage = page
                getAjax(page, null)
            }
        });
    })

    // 三.点击筛选打印出对应分类的数据
    $('#btnSearch').on('click', function (e) {
        e.preventDefault()
        // 3.1 重新渲染页面
        // 三.点击筛选打印出对应分类的数据
        getAjax(1, function (backData) {
            $('#pagination-demo').twbsPagination('changeTotalPages', backData.data.totalPage, 1)
        })
    })
    //     $.ajax({
    //         url: bigNews.artice_query,
    //         data: {
    //             type: $('#selCategory').val(),
    //             state: $('#selStatus').val().trim(),
    //             page: 1,
    //             perpage: 9
    //         },
    //         success: function (backData) {
    //             // 2.1 获取成功后，渲染到页面，创建模板引擎
    //             var retHtml = template('searchTemp', backData);
    //             $('.table-striped tbody').html(retHtml)

    //             // 分页插件里面的一个方法
    //             // 第一个固定参数：'changeTotalPages'，
    //             // 第二个参数 ： 文章的总页数，
    //             // 第三个参数：   文章当前页面
    //             $('#pagination-demo').twbsPagination('changeTotalPages', backData.data.totalPage, 1)
    //         }
    //     })
    // })

    // 四.删除文章数据
    // 因为删除是动态的，所以要事件委托
    $('.table-striped tbody').on('click', '.delete', function () {
        var id = $(this).attr('data-id');
        console.log(id);

        if (confirm('确定要删除吗')) {
            // 发送ajax请求  删除数据
            $.ajax({
                type: 'post',
                url: bigNews.artice_delete,
                data: {
                    id: id,
                },
                success: function (backData) {
                    // console.log(backData);
                    if (backData.code == 204) {
                        alert('删除成功')
                        // 删除成功之后要重新渲染页面
                        getAjax(myPage, function (backData) {
                            $('#pagination-demo').twbsPagination('changeTotalPages', backData.data.totalPage, myPage)
                        })
                    }
                }
            })
        }
    })
})
