$(function () {

    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();

    //2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();

    //删除
    $("#btn_delete").click(function (){
        var temp= $("#orderTable").bootstrapTable('getSelections');
        if(temp.length<=0) {
            alert("请至少选中一行")
        } else {
            var putTemp = new Array();
            var content = "";
            for(var i=0;i<temp.length;i++){
                content += "ids="+temp[i].leaveId+"&";
            }
            $.ajax({
                type: "delete",
                url: "/leave/deletes?"+ content.substr(0,content.length-1),
                /* data: {"ids": bb},*/
                dataType: "json",
                success: function(data) {
                    if(data.code == 200){
                        alert("删除成功");
                        window.location.reload();
                    }
                    else{
                        alert("删除失败");
                    }
                },
                error: function() {
                    alert("连接失败");
                }
            });
        }
    });

    //查询
    $("#btn_query").click(function (){
        var token = JSON.parse(localStorage.getItem("token"));
        $.ajax({
            type: 'get',
            url: "/repair/list",
            dataType: 'json',
            data: {
                limit: 10,   //页面大小
                curPage: 1,  //页码
                repairStatus: $("#statusSelect").val(),
                staffOperId:token.no
            },
            success: function(data){
                $('#orderTable').bootstrapTable('removeAll');
                $('#orderTable').bootstrapTable('append', data.data);
            }
        })
    });

    //新增弹框出现
    $("#btn_add").click(function (){
        $("#leaveAdd").modal({show:true});
    });

    $("#btn_submit_add").click(function (){
        var machineId = $("#machineIdAdd").val();
        var description = $("#descriptionAdd").val();
        var time = $("#timeAdd").val();

        if(validate(machineId,description,time)){

            var token = JSON.parse(localStorage.getItem("token"));
           console.log("得到"+token);
            $.ajax({
                type: "post",
                url: '/repair/add',
                data: {
                    "staffOperId":token.no,
                    "repairDescrp": description,
                    "machineId": machineId,
                    "repairTime": time,
                    "repairStatus":1
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if(data.code==200) {
                        alert("新增成功");
                        $("#supplierAdd").modal({show:false});
                        window.location.href="operIndex.html";
                    }
                    else{
                        alert(data.msg);
                        $("#supplierAdd").modal({show:false});
                        window.location.href="operIndex.html";
                    }
                },
                error: function () {
                    alert("新增失败");
                    $("#supplierAdd").modal({show:false});
                    window.location.href="operIndex.html";
                }
            });
        }
        else {
            // alert("新增失败\n请输入完整信息！！")
        }

    });
});

var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#orderTable').bootstrapTable({
            url: '/repair/list',         //请求后台的URL（*）
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
            pageList: [5, 10],         //可供选择的每页的行数（*）
            search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: true,                  //是否显示所有的列
            showRefresh: true,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
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
            onLoadSuccess: function(data) {
                $('#orderTable').bootstrapTable('removeAll');
                $('#orderTable').bootstrapTable('append',data.data);
            },
            columns: [{
                checkbox: true
            }, {
                field: 'repairId',
                title: '单号'
            }, {
                field: 'machineId',
                title: '机器编号',
                // visible:false
            }, {
                field: 'machine.machineName',
                title: '机器名称'
            }, {
                field: 'repairTime',
                title: '故障时间'
            }, {
                field: 'staffRepairId',
                title: '维修工工作号'
            }, {
                field: 'staffRepairName',
                title: '维修工姓名'
            },{
                field: 'repairStatus',
                title: '状态',
                formatter:function(value,row,index){
                    var element = "";
                    switch (value){
                        case 1:
                            element = '<span style="color:#FF0000">'+'指派中'+'</span>';
                            break;
                        case 2:
                            element = '<span style="color:#0000CC">'+'维修中'+'</span>';
                            break;
                        case 3:
                            element = '<span style="color:#99CC00">'+'待确认'+'</span>';
                            break;
                        case 4:
                            element = '<span style="color:#00ff00">'+'完成'+'</span>'
                            break;
                    }
                    return element;
                }
            }, {
                field: 'tool',
                title: '操作',
                align: 'center',
                formatter:function(value,row,index){
                    var element =
                        "<a class='edit' href='../html/repairDetail.html?id="+row.repairId +"'>详情</a> ";
                    if(row.repairStatus == 3){
                        element += "<a class='edit'onclick='successMaintainer("+row.repairId+")' >确认修复</a> ";
                        element += "<a class='edit' onclick='falseMaintainer("+row.repairId+")'>未修复</a> ";
                    }
                    return element;
                }
            }
            ]
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var token = JSON.parse(localStorage.getItem("token"));
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            curPage: parseInt(params.offset)/parseInt(params.limit)+1,  //页码
            staffOperId:token.no
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

/*添加维修单验证*/
var validate = function (machineId,description,time) {
    console.log("machineId:"+machineId);
    console.log("description:"+description);
    console.log("time:"+time);
    if(machineId == ""){
        alert("请求输入机器编号");
        return false;
    }
    if(description == ""){
        alert("请求输入故障描述");
        return false;
    }
    if(time == ""){
        alert("请求输入时间，故障时间需要精确到分钟");
        return false;
    }
    return true;
};

/*成功修复*/
function successMaintainer(id) {
    $.ajax({
        type: "put",
        url: '/repair/update',
        data: {
            "repairId":id,
            "repairStatus": 4
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if(data.code==200) {
                alert("操作成功");
                $("#supplierAdd").modal({show:false});
                window.location.href="operIndex.html";
            }
            else{
                alert("操作失败");
                $("#supplierAdd").modal({show:false});
                window.location.href="operIndex.html";
            }
        },
        error: function () {
            alert("操作失败");
            $("#supplierAdd").modal({show:false});
            window.location.href="operIndex.html";
        }
    });
}

/*未成功修复*/
function falseMaintainer(id) {
    $.ajax({
        type: "put",
        url: '/repair/update',
        data: {
            "repairId":id,
            "repairStatus": 2
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if(data.code==200) {
                alert("操作成功");
                $("#supplierAdd").modal({show:false});
                window.location.href="operIndex.html";
            }
            else{
                alert(data.msg);
                $("#supplierAdd").modal({show:false});
                window.location.href="operIndex.html";
            }
        },
        error: function () {
            alert("操作失败");
            $("#supplierAdd").modal({show:false});
            window.location.href="operIndex.html";
        }
    });
}
