(function () {
    console.log("header.js is load");
})();

;(function () {
    var tt = 0;
    function readyToDo(depends, fn) {
        if (tt >= 9e4) {
            return;
        }
        var loaded = true;
        var depAr = depends.split(",");
        for (var i = 0; i < depAr.length; i++) {
            if (eval("typeof(" + depAr[i] + ")== 'undefined'")) {
                loaded = false;
                break;
            }
        }
        if (!loaded) {
            var self = arguments.callee;
            var arg = arguments;
            var itv = 50;
            tt = tt + itv;
            setTimeout(function () {
                self(arg[0], arg[1]);
            }, itv);
        } else {
            fn();
        }
    }
    function loadJs(url) {
        var headDoc = document.getElementsByTagName("head")[0];
        var js = document.createElement("script");
        js.setAttribute("type", "text/javascript");
        js.setAttribute("src", url);
        headDoc.appendChild(js);
    }
    function checkPhoneNumer($input) {
        var telVal = $input.val();
        if (telVal.length == 12) {
            $input.val(telVal.substring(0, telVal.length - 1));
            return false;
        }
    }
    function SetCookie(name, value) {
        var exp = new Date();
        exp.setTime(exp.getTime() + 1 * 24 * 60 * 60 * 1000); //1天过期  
        document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString() + ";path=/";
        return true;
    };
    function getCookie(name) {
        var arr,
            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        } else {
            return "";
        }
    };

    loadJs("//custom.bxd365.com/dingzhi/getarea");
    loadJs("//s29.9956.cn/res/public/region/region.js");
    readyToDo("areaInfo,Region", function () {
        var inputNode = document.createElement("input");
        inputNode.setAttribute("type", "hidden");
        inputNode.setAttribute("value", areaInfo);
        document.getElementById("region").appendChild(inputNode);
        window.Region = new Region('region', true);
    });
    var __max = 3;
    var _thisreferrer = document.referrer;
    if (_thisreferrer.length < 5) {
        _thisreferrer = getCookie("thisreferrer");
    } else {
        SetCookie("thisreferrer", _thisreferrer);
    };

    $(".who-wrap dd").click(function () {
        $(".who-wrap dd").eq($(this).index()).addClass("on").siblings().removeClass('on');
    });
    $(".where-wrap dd").click(function () {
        var $this = $(".where-wrap dd").eq($(this).index());
        if ($(".where-wrap").find(".on").length + 1 > __max) {
            $this.hasClass("on") ? $this.removeClass("on") : alert("最多只能选" + __max + "个");
        } else {
            $this.hasClass("on") ? $this.removeClass("on") : $this.addClass("on");
        }
    });
    $(".user-tel .phone").on("input propertychange", function () {
        checkPhoneNumer($(this));
    });
    $(".custom-board-component .mask").on("touchmove", function (e) {
        e.preventDefault();
        e.stopPropagation();
    });
    $(".custom-board-component .confirm-btn").on("click", function (e) {
        $(".custom-board-component .mask").hide();
    });
    var hasSubmited = false;
    $(".custom-board-component .submit").click(function () {
        if ($("#nickname").val() == "") {
            alert("姓名不能为空");
            $("#nickname").focus();
            return false;
        }
        if ($(".user-tel .phone").val() == "") {
            alert("手机号不能为空");
            $(".user-tel .phone").focus();
            return false;
        }
        if (!/^1[3|4|5|7|8][0-9]\d{4}\d{4}$/.test($(".user-tel .phone").val())) {
            alert("请输入正确的手机号码");
            $(".user-tel .phone").val("");
            $(".user-tel .phone").focus();
            return false;
        }
        if (hasSubmited) {
            alert("请勿重复提交~");
            return false;
        }
        var _demand = [],
            _demandObj = $(".where-wrap").find(".on");
        for (var i = 0; i < _demandObj.length; i++) {
            _demand[i] = _demandObj.eq(i).attr("val");
        }
        var subData = {
            nickname: $("#nickname").val(),
            phone: $(".user-tel .phone").val().replace(/-/g, ""),
            keyword: _thisreferrer,
            from: (document.location.search.match(new RegExp("(?:^\\?|&)from=(.*?)(?=&|$)")) || ['', null])[1],
            region: $('input[name="region"]').val(),
            insure: $('.who-wrap dd.on').text(),
            demand: _demand.join(","),
            page: "",
            needVerify: "0"
        };
        hasSubmited = true;
        $.ajax({
            type: "POST",
            url: "/nproduct/addcustom",
            dataType: 'json',
            data: subData,
            error: function () {
                alert('很抱歉，定制提交失败，请与客服联系 0371-56007780，或稍后重试');
                hasSubmited = false;
            },
            success: function (msg) {
                hasSubmited = false;
                if (msg.code != 0) {
                    alert(msg.msg);
                } else {
                    $(".custom-board-component .mask").show();
                    $("input").val("");
                }
            }
        });
    });
})();