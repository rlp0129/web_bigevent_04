// 1.开发服务器地址
var baseURL = 'http://ajax.frontend.itheima.net';
//2.拦截所有ajax请求
$.ajaxPrefilter(function(options) {
    // alert(options.url)
    options.url = baseURL + options.url;
})