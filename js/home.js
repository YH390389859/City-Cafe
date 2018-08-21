$(function () {
    /*
    * 预加载动画
    * */
    $("#preload").delay(2000).fadeOut(500);
    
    /*
    * 顶部导航条
    * */
    $(".nav-item").click(function (e) {
        e.preventDefault();//取消默认行为
        $(this).addClass('selected').siblings().removeClass('selected');//链式写法
        var selector=$(this).attr('data-target');
        $('body,html').animate({
            scrollTop:$(selector).offset().top
        },1000);
    });

    //原生代码窗口滚动改变导航条样式
    // window.onscroll=function () {
    //     var body=document.documentElement||document.body;
    //     body.scrollTop;
    // }

    /*
    * 图片轮播
    * */
    (function ($) {

        var items=$('#myCarousel .item');
        var titles=$("#myCarousel .item>.title");//item里面的文本
        var currentIndex=0;//表示当前显示的图片的脚标

        var timer=setInterval(bannerChange,3000);//定时切换

        //小点设置点击事件
        $('#myCarousel .disc').click(function () {
            bannerChange($(this).index());//index()为获取当前元素的脚标
        });

        //设置移入移出来暂停和重启定时器
        $("#myCarousel").mouseenter(function () {
            clearInterval(timer);
        });
        $("#myCarousel").mouseleave(function () {
            timer=setInterval(bannerChange,3000);
        });

        function bannerChange(index) {
            if(index==undefined){
                index=currentIndex<(items.length-1)?(currentIndex+1):0;
            }
            titles.eq(currentIndex).animate({
                left:'55%',
                opacity:0,
            },500,function () {
                items.eq(index).addClass('active').siblings().removeClass('active');
                $('#myCarousel .disc').eq(index).addClass('active').siblings().removeClass('active');
                titles.eq(index).animate({
                    left:'50%',
                    opacity:1
                },500)
            });

            currentIndex=index;
        }
    })(jQuery);
    //窗口滚动改变导航条样式
    $(window).scroll(function () {
        var scrollTop=$(window).scrollTop();//获取页面滚动过的距离
        var critical=$(window).height()*0.8; //模块进入可视范围的高度
        var anim_list=[
            {
                'name':'.header',
                'anim':'anim-slidown'
            },
            {
                'name':'.stats-header',
                'anim':'anim-slidown'
            },
            {
                'name':'.content',
                'anim':'anim-slidown'
            },
            {
                'name':'#gallery .gallery-content',
                'anim':'anim-toOpacity'
            },
            {
                'name':'#stats .stats-content',
                'anim':'anim-slidup'
            },
            {
                'name':'#menu .left',
                'anim':'anim-slidToleft'
            },
            {
                'name':'#menu .right',
                'anim':'anim-slidToRight'
            },
            {
                'name':'#contact .contact-content',
                'anim':'anim-slidToleft'
            },
            {
                'name':'#chefs .chefs-content',
                'anim':'anim-tohuge'
            },
        ];//添加的动画以及要被添加动画的类
        if(scrollTop>=80&&$(window).width()>768){
            $("#top-nav .navbar-header").hide();
            $("#top-nav").addClass('scroll');
        }else{
            $("#top-nav .navbar-header").show();
            $("#top-nav").removeClass('scroll');
        };
        anim_trigger(anim_list,scrollTop,critical);
    });

    /*
    * 画廊部分的点击显示与隐藏部分图片的效果
    * */
    //使用瀑布流插件渲染动态效果
    $("#gallery .propolor-wrap img").load(function () {//防止图片出现堆叠状况
        $("#gallery .propolor-wrap").isotope({
            itemSelector:'.col'//要实现瀑布流的子项
        });
    });
    $("#gallery .item").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $("#gallery .propolor-wrap").isotope({
            filter:$(this).attr('data-btnname')
        });
    });
    // var btn=$("#gallery .gallery-content .item");//可点击按钮的列表
    // var imgs=$("#gallery .gallery-content>.ALL");//要被改变的图片列表
    // for(var index=0;index<btn.length;index++){
    //     btn.eq(index).bind('click',{index:index},function (event) {
    //         var index= event.data.index;
    //         btn.eq(index).addClass('active').siblings().removeClass('active');
    //         for(var i=0;i<imgs.length;i++){
    //             var reg=new RegExp(btn.eq(index).data('btnname'));
    //             if(reg.test(imgs.eq(i).prop('class'))){//通过正则判断点击事件传进来的data值是否在图片的类名中
    //                 imgs.eq(i).show(500);
    //             }else{                                              //不存在
    //                 imgs.eq(i).hide(500);
    //             }
    //         }
    //     });
    // };

    /**
     *滚动滚轮时为内容添加动画效果
     * @param {number} scrollTop 页面滚动过的距离
     * @param {number} critical 模块进入可视范围的高度
     */
    function anim_trigger(anim_list,scrollTop,critical) {
        for(var index=0;index<anim_list.length;index++){
            for(var i=0;i<$(anim_list[index].name).length;i++){
                if($(anim_list[index].name).eq(i).offset().top-scrollTop<critical&&$(anim_list[index].name).eq(i).offset().top-scrollTop>0){
                    $(anim_list[index].name).eq(i).addClass(anim_list[index].anim);

                    // $('#top-nav .nav-item').eq(index).addClass('selected').siblings().removeClass('selected');
                };
            };
            for(var i=0;i<$(anim_list[0].name).length;i++){
                if($(anim_list[0].name).eq(i).offset().top-scrollTop<critical){
                    // $(anim_list[0].name).eq(i).addClass(anim_list[index].anim);
                    $('#top-nav .nav-item').eq(i+1).addClass('selected').siblings().removeClass('selected');
                };
                if (scrollTop==0) {
                    $('#top-nav .nav-item').eq(0).addClass('selected').siblings().removeClass('selected');
                }
            };
        };
    };
});