// 所有的课程
var allClass;

$(function () {

    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();

    //2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();


    //删除
    $("#btn_delete").click(function (){
        var temp= $("#supplierTable").bootstrapTable('getSelections');
        if(temp.length<=0) {
            alert("请至少选中一行")
        } else {
            var putTemp = new Array();
            var bb = "";
            for(var i=0;i<temp.length;i++){
               /* putTemp[i]=temp[i].id;
                var aa = temp[i].id;*/
                bb =bb+ "ids="+temp[i].staffId+"&";
            }
            bb = bb.substr(0,bb.length-1);
            console.log(bb);
            $.ajax({
                type: "DELETE",
                url: "/staff/deletes"+"?"+ bb,
               /* data: {"ids": bb},*/
                dataType: "json",
                success: function(data) {
                    if(data.code == "200"){
                        alert("删除成功");
                        window.location.href="manageStaff.html";
                    }
                    else{
                        alert("删除失败");
                        window.location.href="manageStaff.html";
                    }
                },
                error: function() {
                    alert("删除失败");
                    window.location.href="manageStaff.html";
                }
            });
        }
    });

    /*********************编辑弹框出现************************/
    $("#btn_edit").click(function(){
       var temp= $("#supplierTable").bootstrapTable('getSelections');
       if(temp.length<=0){
           alert("请至少选中一行");
       }else if(temp.length==1){

           $("#supplierEdit").modal({show: true});

           //勾选id对应的那条数据内容注入到弹框里面
           $("#staffNameEdit").val(temp[0].staffName);
           $("#staffEmailEdit").val(temp[0].staffEmail);
           $(".staffRoleEdit").val(temp[0].staffRole);

           //提交
           $("#btn_submit_Edit").click(function () {
               var staffName = $("#staffNameEdit").val();
               var staffEmail = $("#staffEmailEdit").val();
               var staffRole = $(".staffRoleEdit").val();


               if(validateEdit(staffName,staffEmail,staffRole)){
                   $.ajax({
                       type: "put",
                       url: '/staff/update',
                       data: {
                           "staffName": staffName,
                           "staffEmail": staffEmail,
                           "staffRole": staffRole,
                           "staffId":temp[0].staffId
                       },
                       dataType: "json",
                       success: function (data) {
                           if (data.code == 200) {
                               alert("修改成功");
                               $("#supplierEdit").modal({show: false});
                               window.location.href="managerStaff.html";
                           }
                           else {
                               alert("修改失败");
                               $("#supplierEdit").modal({show: false});
                               window.location.href="managerStaff.html";
                           }
                       },
                       error: function () {
                           alert("修改失败");
                           $("#supplierEdit").modal({show: false});
                           window.location.href="managerStaff.html";
                       }
                   });
               }

           });
       }else{
           alert('最多只能选择一行');
       }
    });


    /*****************************************新增弹框出现*************************/
    $("#btn_add").click(function (){
       $("#supplierAdd").modal({show:true});

    });
    $("#btn_submit").click(function (){
        var staffEmail = $("#staffEmail").val();
        var staffName = $("#staffName").val();
        var staffPassword = $("#staffPassword").val();
        var rePassword = $("#rePassword").val();
        var staffRole = $(".staffRole").val();

        if(validateAddForm(staffEmail,staffName,staffPassword,rePassword,staffRole)){
            console.log("add");
            $.ajax({
                type: "post",
                url: '/staff/add',
                data: {
                    "staffEmail": staffEmail,
                    "staffName": staffName,
                    "staffPassword": staffPassword,
                    "staffRole":staffRole
                },
                dataType: "json",
                success: function (data) {
                    if(data.code==200) {
                        alert("新增成功");
                        $("#supplierAdd").modal({show:false});
                        window.location.href="managerStaff.html";
                    }
                    else{
                        alert(data.msg);
                        $("#supplierAdd").modal({show:false});
                        window.location.href="managerStaff.html";
                    }
                },
                error: function () {
                    alert("新增失败");
                    $("#supplierAdd").modal({show:false});
                    window.location.href="managerStaff.html";
                }
            });
        }
    });

});

var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {

        $('#supplierTable').bootstrapTable({
            url: '/staff/list',         //请求后台的URL（*）
            method: 'get',                      //请求方式（*）
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [5,10,20],        //可供选择的每页的行数（*）
            search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: true,                  //是否显示所有的列
            showRefresh: true,                  //是否显示刷新按钮
            minimumCountColumns: 3,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 526,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
            showToggle:true,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            responseHandler: function(result) {
                return {
                    //总页数,前面的key必须为"total"
                    total : result.amount,

                    //行数据，前面的key要与之前设置的dataField的值一致.
                    data : result.data
                };
            },
            onLoadSuccess: function(backDate) {
                console.log(backDate.data);
                $('#supplierTable').bootstrapTable('removeAll');

                $('#supplierTable').bootstrapTable('append',backDate.data);
            },

            columns: [{
                checkbox: true
            }, {
                field: 'staffId',
                title: '职工号',
            },{
                field: 'staffName',
                title: '姓名',
            },{
                field: 'staffEmail',
                title: '邮箱',
            },{
                field: 'staffRole',
                title: '角色',
                formatter:function(value,row,index){
                    var element = "";
                    switch (value){
                        case 1:
                            element = '<span>'+'操作员'+'</span>';
                            break;
                        case 2:
                            element = '<span>'+'维修员'+'</span>';
                            break;
                    }
                    return element;
                }
            }]
        });
    };

    //查询
    $("#btn_query").click(function (){
        console.log($("#Name").val());

        searName = $("#searName").val();
        searNo = $("#searNo").val();
        searRole = $("#searRole").val();
        $.ajax({
            type: 'get',
            url: "/staff/list",
            dataType: 'json',
            data: {
                limit: 10,   //页面大小
                curPage: 1,  //页码
                staffName:searName ,
                staffId:searNo ,
                staffRole:searRole
            },
            success: function(data){
                console.log(data);
                total:data.amount;
                $('#supplierTable').bootstrapTable('removeAll');

                $('#supplierTable').bootstrapTable('append',data.data);
            },
        })
    });

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            curPage: parseInt(params.offset)/parseInt(params.limit)+1,  //页码
            // goodsName: $("#Name").val()  //名称
        };
        return temp;
    };
    return oTableInit;
};


var ButtonInit = function () {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function () {
        //初始化页面上面的按钮事件
    };

    return oInit;
};

/*添加数据校验*/
function validateAddForm(staffEmail,staffName,staffPassword,rePassword,staffRole) {
    console.log("validate:"+staffEmail+","+staffName+","+staffPassword+","+rePassword+","+staffRole);
    if(staffEmail == "" ||staffName == "" ||staffPassword == "" ||rePassword == "" ||staffRole == ""){
        alert("请填写必要的信息");
        return false;
    }

    if(staffPassword != rePassword){
        alert("两次输入的密码不一样");
        return false;
    }


    if(!isEmail(staffEmail)){
        alert("邮箱的格式不正确");
        return false;
    }

    return true;
}

/*修改校验*/
function validateEdit(staffName,staffEmail,staffRole) {
    if(staffName == "" || staffEmail == "" || staffRole == "" ){
        alert("请填写必要的信息");
        return false;
    }
    if(!isEmail(staffEmail)){
        alert("邮箱的格式不正确");
        return false;
    }

    return true;
}

/*正则表达式验证邮箱*/
function isEmail(str){
    if(str==null) return;

    var reg=new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);

    return reg.test(str);//检测字符串是否符合正则表达式
}