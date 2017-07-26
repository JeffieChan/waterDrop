var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var groupname;
(function (groupname) {
    groupname[groupname["preload"] = 0] = "preload";
    groupname[groupname["two"] = 1] = "two";
})(groupname || (groupname = {}));
/**
 * 判断当前所需的资源组是否加载完成
 * 如果没有加载完成，则调整当前加载的资源组
 */
var ResLoad = (function () {
    function ResLoad() {
        console.log("创建ResLoad");
    }
    ResLoad.Shared = function () {
        if (ResLoad.shared == null) {
            ResLoad.shared = new ResLoad();
        }
        return ResLoad.shared;
    };
    ResLoad.prototype.IsExit = function (groupnum) {
        console.log(groupname[groupnum]);
        if (!RES.isGroupLoaded(groupname[groupnum])) {
            console.log("未找到");
        }
        else {
            console.log("存在");
        }
    };
    return ResLoad;
}());
__reflect(ResLoad.prototype, "ResLoad");
//# sourceMappingURL=ResLoad.js.map