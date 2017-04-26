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
    function initco(json) {
        var course = "<tr>" +
            "<td>" + '<input type="checkbox" name="" value="">' + json.id + "</td>" +
            "<td>" + json.classify + "</td>" +
            "<td>" + json.title + "</td>" +
            "<td>" + json.grade + "</td>" +
            "<td>" + json.state + "</td>" +
            "<td>" + json.creation + "</td>" +
            "<td>" + json.creator + "</td>" +
            "<td>" + json.area + "</td>" +
            '<td>' +
            '<input type="button" class="del" value="删除" title="' + json.id + '">' +
            "</td>'" +
            "</tr>";
        return course;
    }

    //init page渲染页面
    function initpage(course) {
        $("tbody").html("");
        $.each(course, function (key, val) {
            $("tbody").append(initco(val));
        })
    }

    initpage(course); //调用压面渲染接口/方法



    //按钮删除指定的行
    $("body").on("click",".del",function () {
        var id = parseInt($(this).attr("title"));//强制转化json字符串为数值
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
        course.unshift({
            id: nums,
            classify: $(class_.classify).val(),
            title: $(class_.title).val(),
            grade: $(class_.grade).val(),
            state: $(class_.state).val(),
            creation: $(class_.creation).val(),
            creator: $(class_.creator).val(),
            area: $(class_.area).val(),
        })

        $(".add input[type='text']").val("");

        initpage(course);
    }


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

    // size switching
    $(".icons").on("click", function () {
        if ($(this).hasClass("h")) { //反向
            dealList(course, true, function () {
                initpage(course);
            })
            $(this).removeClass("h");
        } else {
            // 正向
            dealList(course, false, function () {
                initpage(course);
            })
            $(this).addClass("h");
        }
    })

    // The keyboard to delete
    $("tbody tr").eq(0).addClass("back").siblings("tr").removeClass("back");

    $(window).keydown(function (e) {

        var key = e.keyCode;
        var ind = $("tbody tr.back").index();
        switch (key) {
            case 38:
                if(ind > 0){
                    ind --;
                    $("tbody tr").eq(ind).addClass("back").siblings("tr").removeClass("back");
                }
                break;
            case 40:
                if(ind < $("tbody tr").length - 1){
                    ind ++;
                    $("tbody tr").eq(ind).addClass("back").siblings("tr").removeClass("back");
                }
                break;
            case 8:
                $("tbody tr.back").remove();
                if(ind <= $("tbody tr").length - 1){
                    $("tbody tr").eq(ind).addClass("back")
                } else {
                    ind = ind - 1
                    $("tbody tr").eq(ind).addClass("back")
                }
                break;
        }

    })

})