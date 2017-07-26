var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Letters = (function (_super) {
    __extends(Letters, _super);
    function Letters() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/Letters.exml"; //先设定皮肤名字
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Letters.prototype.onAddToStage = function () {
        this.menu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.returnMenu, this);
        this.mo1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { this.data.source = "mo_letter1_jpg"; this.data.visible = true; }, this);
        this.liu1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { this.data.source = "liu_letter_jpg"; this.data.visible = true; }, this);
        this.si1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { this.data.source = "zhao_letter_jpg"; this.data.visible = true; }, this);
        this.data.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideLetter, this);
    };
    Letters.prototype.hideLetter = function () {
        SceneBlock.Shared().info.visible = false; //隐藏新信件提示段
        this.data.visible = false;
    };
    Letters.prototype.returnMenu = function () {
        SoundMenager.Shared().PlayClick();
        this.parent.removeChild(this);
    };
    //判断对话时段，显示信封
    Letters.prototype.receiveLetter = function (name) {
        switch (name) {
            case "mo1":
                this.mo1.visible = true;
                break;
            case "liu1":
                this.liu1.visible = true;
                break;
            case "si1":
                this.si1.visible = true;
                break;
            default: break;
        }
    };
    Letters.Shared = function () {
        if (Letters.shared == null) {
            Letters.shared = new Letters();
        }
        return Letters.shared;
    };
    return Letters;
}(eui.Component));
__reflect(Letters.prototype, "Letters");
//# sourceMappingURL=Letters.js.map