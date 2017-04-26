$(function () {
    var course = [
        {
            id: 1,
            classify: "第一学期",
            title: "HTML+CSS",
            grade: "欣才第146期",
            state: "已发布",
            creation: "2016-11-03",
            creator: "三日",
            area: "南京",
            operate: "删除",
        },
        {
            id: 2,
            classify: "第一学期",
            title: "HTML+CSS",
            grade: "欣才第146期",
            state: "已发布",
            creation: "2016-11-03",
            creator: "三日",
            area: "南京",
            operate: "删除",
        },
        {
            id: 3,
            classify: "第一学期",
            title: "HTML+CSS",
            grade: "欣才第146期",
            state: "已发布",
            creation: "2016-11-03",
            creator: "三日",
            area: "南京",
            operate: "删除",
        },
        {
            id: 4,
            classify: "第一学期",
            title: "HTML+CSS",
            grade: "欣才第146期",
            state: "已发布",
            creation: "2016-11-03",
            creator: "三日",
            area: "南京",

        },
        {
            id: 5,
            classify: "第一学期",
            title: "HTML+CSS",
            grade: "欣才第146期",
            state: "已发布",
            creation: "2016-11-03",
            creator: "三日",
            area: "南京",

        },
        {
            id: 6,
            classify: "第一学期",
            title: "HTML+CSS",
            grade: "欣才第146期",
            state: "已发布",
            creation: "2016-11-03",
            creator: "三日",
            area: "南京",

        },
        {
            id: 7,
            classify: "第一学期",
            title: "HTML+CSS",
            grade: "欣才第146期",
            state: "已发布",
            creation: "2016-11-03",
            creator: "三日",
            area: "南京",
        },
    ];

    // 渲染页面方法
    function cour(json) {
        var course = "<tr>" +
            "<td>" + '<input type="checkbox" name="id" class="selAll2" value="">' + json.id + "</td>" +
            "<td>" + '<input type="text" value="' + json.classify +'" disabled> '+"</td>" +
            "<td>" + '<input type="text" value="' + json.title +'" disabled> '+"</td>" +
            "<td>" + '<input type="text" value="' + json.grade +'" disabled> '+"</td>" +
            "<td>" + '<input type="text" value="' + json.state +'" disabled> '+"</td>" +
            "<td>" + '<input type="text" value="' + json.creation +'" disabled> '+"</td>" +
            "<td>" + '<input type="text" value="' + json.creator +'" disabled> '+"</td>" +
            "<td>" + '<input type="text" value="' + json.area +'" disabled> '+"</td>" +
            '<td>' +
            '<input type="button" class="del" value="删除" title="' + json.id + '">' +
            "</td>'" +
            "</tr>";
        return course;
    }

    // page渲染页面
    function page(course) {
        $("tbody").html("");
        $.each(course, function (key, val) {
            $("tbody").append(cour(val));
        })
    }

        page(course); //调用压面渲染接口/方法



    // 按钮删除指定的行
    $("body").on("click",".del",function () {
            var id = parseInt($(this).attr("title"));//将字符串转化为数值
            var ind = $(this).parent("td").parent("tr").index();//获取当前行的index
            for(var i = 0;i < course.length;i++){
                if(id == course[i].id){
                    course.splice(i,1);// 删除第i个值，删除一个
                    $("tbody tr").eq(ind).remove();
                }
            }

    })

    // 获取id的值
    var nums = null;

    $.each(course, function (key, val) {
        if (nums < val.id) {
            nums = val.id;
        }
    })
    // 录入方法
    function refreshHtml(course, class_) {
        course.unshift({   //在第一行增加
            id: nums,
            classify: $(class_.classify).val(),//获取输入框的值
            title: $(class_.title).val(),
            grade: $(class_.grade).val(),
            state: $(class_.state).val(),
            creation: $(class_.creation).val(),
            creator: $(class_.creator).val(),
            area: $(class_.area).val(),
        })

        $(".add input[type='text']").val("");  //清空输入框

        page(course);  //渲染页面
    }

    // 添加内容
    $(".button").on("click", function () {
        nums = nums + 1;
        refreshHtml(course, {
            id: nums, classify: '.classify', title: '.title', grade: '.grade', state: '.state',
            creation: '.creation', creator: '.creator', area: '.area'
        });
    })

    function dealList(course, sta, fun) { //定义一个方法（数据库名字，状态，回调函数）

        if (sta) {
            // 从小到大排序
            var sort = null;
            for (var i = 0; i < course.length; i++) {
                for (var j = i + 1; j < course.length; j++) {
                    if (course[i].id > course[j].id) {
                        sort = course[i];
                        course[i] = course[j];
                        course[j] = sort;
                    }
                }
            }
        } else {
            // 从大到小排序
            for (var i = 0; i < course.length; i++) {
                for (var j = i + 1; j < course.length; j++) {
                    if (course[i].id < course[j].id) {
                        sort = course[i];
                        course[i] = course[j];
                        course[j] = sort;
                    }
                }
            }
        }

        fun();
    }

    // size switching 大小切换
    $(".icons").on("click", function () {
        if ($(this).hasClass("h")) { //反向
            dealList(course, true, function () {
                page(course);
                $(".icons").html("&#xe603;");
            })
            $(this).removeClass("h");
        } else {
            // 正向
            dealList(course, false, function () {
                page(course);
                $(".icons").html("&#xe646;");
            })
            $(this).addClass("h");
        }
    })

    // 单击修改文本内容
    $("body").on("click","td",function () {
        $(this).children("input[type=text]").removeAttr("disabled");
    })
    $("body").on("blur","td",function () {
        $(this).children("input[type=text]").attr("disabled",true);
    })


    // Keyboard click delete selected  键盘点击删除所选
    $("tbody tr").eq(0).addClass("back").siblings("tr").removeClass("back");

    $(window).keydown(function (e) {

        var key = e.keyCode;
        var ind = $("tbody tr.back").index();
        switch (key) {
            case 38: //上键盘
                if(ind > 0){
                    ind --;
                    $("tbody tr").eq(ind).addClass("back").siblings("tr").removeClass("back");
                }
                break;
            case 40:  //下键盘
                if(ind < $("tbody tr").length - 1){
                    ind ++;
                    $("tbody tr").eq(ind).addClass("back").siblings("tr").removeClass("back");
                }
                break;
            case 46:  //delete删除键
                $("tbody tr.back").remove();
                if(ind <= $("tbody tr").length - 1){
                    $("tbody tr").eq(ind).addClass("back")
                } else {
                    ind = ind - 1
                    $("tbody tr").eq(ind).addClass("back")
                }
                break;
            case 13: //确认选中回车键
                // $("tbody tr.back").children().find("input[name=id]").attr("checked","checked");
                if($("tbody tr.back").children().find("input[name=id]").is(":checked")){
                    $("tbody tr.back").children().find("input[name=id]").attr("checked",false);
                } else {
                    $("tbody tr.back").children().find("input[name=id]").attr("checked",true);
                }
                break;
        }
    })


// Selection or cancel the selection 全选或取消全选
    var status = 0;
    $(".selAll").on("click",function () {
        if ($(".selAll").is(":checked")) {
            $(".selAll2").attr("checked","checked");
            status = 0;
        } else {
            $(".selAll2").removeAttr("checked");
            status = 1;
        }
    })


    // Delete the selected item 删除选中项
    $(".delAll").on("click",function (){
        $("tbody tr input[type='checkbox']:checked").each(function () {
            var ind = $(this).parent("td").parent("tr").index();
            course.splice(ind, 1);
            $("tbody tr").eq(ind).remove();
        })
    })

})