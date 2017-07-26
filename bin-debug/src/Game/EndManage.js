var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//每段结局的数据结构
var Ending = (function () {
    function Ending() {
    }
    return Ending;
}());
__reflect(Ending.prototype, "Ending");
var EndManage = (function () {
    function EndManage() {
        this.items = [];
        //使用RES读取和构建JSON数据，JSON数据可以直接解析到目标结构
        this.items = RES.getRes("ending_json");
    }
    EndManage.Shared = function () {
        if (EndManage.shared == null) {
            EndManage.shared = new EndManage();
        }
        return EndManage.shared;
    };
    EndManage.prototype.getEnding = function (num) {
        //判断加载条件
        return this.items[num];
    };
    return EndManage;
}());
__reflect(EndManage.prototype, "EndManage");
//# sourceMappingURL=EndManage.js.map