var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AtrributeManager = (function (_super) {
    __extends(AtrributeManager, _super);
    function AtrributeManager() {
        var _this = _super.call(this) || this;
        _this.Num = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
        _this.skinName = "resource/eui_skins/Attribute.exml";
        _this.force = 0;
        _this.wit = 0;
        _this.popularity = 0;
        _this.qing = 0;
        _this.si = 0;
        _this.liu = 0;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.clear, _this);
        return _this;
    }
    AtrributeManager.Share = function () {
        if (AtrributeManager.shared == null)
            AtrributeManager.shared = new AtrributeManager();
        return AtrributeManager.shared;
    };
    AtrributeManager.prototype.clear = function () {
        this.parent.removeChild(this);
    };
    //获取属性值
    AtrributeManager.prototype.getFoece = function () {
        return this.force;
    };
    AtrributeManager.prototype.getWit = function () {
        return this.wit;
    };
    AtrributeManager.prototype.getPopularity = function () {
        return this.popularity;
    };
    AtrributeManager.prototype.getQing = function () {
        return this.qing;
    };
    AtrributeManager.prototype.getSi = function () {
        return this.si;
    };
    AtrributeManager.prototype.getLiu = function () {
        return this.liu;
    };
    //对游戏进行存档
    AtrributeManager.prototype.setAtrribute = function (value) {
        var a = this.force + "-" + this.wit + "-" + this.popularity + "-" + this.qing + "-" + this.si + "-" + this.liu;
        console.log(a);
        egret.localStorage.setItem("myAtrribute" + value, a);
    };
    //对游戏进行读档
    AtrributeManager.prototype.getAtrribute = function (value) {
        var a = [];
        a = egret.localStorage.getItem("myAtrribute" + value).split("-");
        this.force = parseInt(a[0]);
        this.wit = parseInt(a[1]);
        this.popularity = parseInt(a[2]);
        this.qing = parseInt(a[3]);
        this.si = parseInt(a[4]);
        this.liu = parseInt(a[5]);
    };
    AtrributeManager.prototype.addAtrr = function (index, num) {
        index = parseInt(index);
        num = parseInt(num);
        switch (index) {
            case 1:
                this.force += num;
                break;
            case 2:
                this.wit += num;
                break;
            case 3:
                this.popularity += num;
                break;
            case 4:
                this.qing += num;
                break;
            case 5:
                this.si += num;
                break;
            case 6:
                this.liu += num;
                break;
        }
        this.toString();
    };
    AtrributeManager.prototype.toString = function () {
        var a = this.force + "-" + this.wit + "-" + this.popularity + "-" + this.qing + "-" + this.si + "-" + this.liu;
    };
    AtrributeManager.prototype.redrawLabel = function () {
        this.qingLabel.text = this.convertNum(this.qing.toString());
        this.siLabel.text = this.convertNum(this.si.toString());
        this.liuLabel.text = this.convertNum(this.liu.toString());
        this.witLabel.text = this.convertNum(this.wit.toString());
        this.popLabel.text = this.convertNum(this.popularity.toString());
        this.forceLabel.text = this.convertNum(this.force.toString());
    };
    //转繁体数字
    AtrributeManager.prototype.convertNum = function (numstr) {
        var str = "";
        for (var i = 0; i < numstr.length; i++) {
            str += this.Num[parseInt(numstr.charAt(i))];
        }
        return str;
    };
    return AtrributeManager;
}(eui.Component));
__reflect(AtrributeManager.prototype, "AtrributeManager");
//# sourceMappingURL=AtrributeManager.js.map