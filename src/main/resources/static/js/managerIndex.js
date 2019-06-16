$(function () {

    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();

    //2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();


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
            },
            success: function(data){
                console.log(data);
                $('#orderTable').bootstrapTable('removeAll');
                $('#orderTable').bootstrapTable('append', data.data);
            }
        })
    });

    //编辑弹框出现
    $("#btn_edit").click(function(){
        var temp= $("#orderTable").bootstrapTable('getSelections');
        if(temp.length<=0 || temp.length > 1){
            alert("请选择一行数据操作");
            return;
        }

        $("#distributionTable").modal({show: true});

        var maintainors = maintainers();

        //向地址下拉框里面注入数据
        var str;
        str+='<option value="">'+"--请选择--"+'</option>'
        for(var i = 0;i<maintainors.length;i++){
            str+='<option value='+maintainors[i].staffId+'>'+maintainors[i].staffId+" - "+
            maintainors[i].staffName+'</option>'
        }
        $("#selectRepair").html(str);
        //   $(".selectpickerEdit" ).selectpicker('refresh');


        //勾选id对应的那条数据内容注入到弹框里面
        str = "";
        for(var i = 0; i < temp.length; i++){
            str += temp[i].repairId+" "
        }
        $("#serialNumber").val(str);

        //提交
        $("#btn_submit").click(function () {
            var id = temp[0].repairId;
            var maintainerId = $("#selectRepair").val();

            if(validate(temp[0].repairStatus,maintainerId)){
                $.ajax({
                    type: "put",
                    url: '/repair/update',
                    data: {
                        "repairId":id,
                        "staffRepairId": maintainerId,
                        "repairStatus": 2
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.code == 200) {
                            alert("指派成功");
                            $("#distributionTable").modal({show: false});
                            window.location.href="managerIndex.html";
                        }
                        else {
                            alert("指派失败");
                            $("#distributionTable").modal({show: false});
                            window.location.href="managerIndex.html";
                        }
                    },
                    error: function () {
                        alert("指派失败");
                        $("#distributionTable").modal({show: false});
                        window.location.href="managerIndex.html";
                    }
                });
            }
            else{
                // 输入的信息不完整
            }
        });
    });


});

function maintainers() {
    var maintainers = [];
    /**获取所有的机修工**/
    $.ajax({
        type:"get",
        url:"/staff/maintainers",
        async:false,
        dataType: 'json',
        success:function (data) {
            maintainers = data.data;
        }
    });
    return maintainers;
};

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
            pageList: [5,10],         //可供选择的每页的行数（*）
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
                console.log(result);
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
            columns: [ {
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

function validate(status,maintainerId) {
    if(status != 1){
        alert("当前维修单不可指派");
        return false;
    }
    if(maintainerId == ""){
        alert("必须选择一位维修工");
        return false;
    }
    return true;
}




