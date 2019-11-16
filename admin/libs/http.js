//使用沙盒模式 创建基地址和接口的拼接
;(function(w){
    var site = 'http://localhost:8080/api/v1';
    var bigNews = {
        site : site,
        login : site + '/admin/user/login',     //登录接口
        admin : site + '/admin/user/info',      //获取用户信息 
        user : site + '/admin/user/detail',      //获取用户详情(邮箱....)
        userEdit  : site + '/admin/user/edit',    //编辑用户信息
        artice_list : site + '/admin/category/list',    //文章分类数据
        artice_add : site + '/admin/category/add',      //文章新增
        artice_edit : site + '/admin/category/edit',     //文章编辑
        artice_remover : site + '/admin/category/delete',   //删除文章分类
    }
    w.bigNews = bigNews;
}(window))