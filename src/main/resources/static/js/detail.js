var status;
var id = window.location.href.split('=')[1];

$(function () {
       /*打开维修记录的弹窗*/
    $("#submitRepair").click(function () {
        if(status != 2){
            alert("当前状态的维修单不可提交维修记录");
            return;
        }
        $("#submitRepairBody").modal({show: true});
    });

    $("#btn_submit").click(function () {
        var causes = $("#causes").val();
        var parts = $("#parts").val();
        $.ajax({
            type: "put",
            url: '/repair/update',
            data: {
                "repairCause": causes,
                "repairPart": parts,
                "repairId":id,
                "repairStatus":3

            },
            dataType: "json",
            success: function (data) {
                if (data.code == 200) {
                    alert("操作成功");
                    window.history.go(-1);
                }
                else {
                    alert("操作失败");
                }
            },
            error: function () {
                alert("操作失败");
            }
        });
    });
});

