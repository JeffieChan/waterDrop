var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.clear, _this);
        return _this;
    }
    Menu.Shared = function () {
        if (Menu.shared == null) {
            Menu.shared = new Menu();
        }
        return Menu.shared;
    };
    Menu.prototype.onAddToStage = function () {
        this.save.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toSave, this);
        this.read.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toRead, this);
        this.attributes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toAtrr, this);
        this.letter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toLetter, this);
    };
    Menu.prototype.clear = function () {
        this.parent.removeChild(this);
    };
    //跳到存档
    Menu.prototype.toSave = function () {
        SoundMenager.Shared().PlayClick();
        SaveFile.Shared().switchSave();
        this.parent.addChild(SaveFile.Shared());
    };
    //跳到读档
    Menu.prototype.toRead = function () {
        SoundMenager.Shared().PlayClick();
        SaveFile.Shared().switchRead();
        this.parent.addChild(SaveFile.Shared());
    };
    //查看属性
    Menu.prototype.toAtrr = function () {
        SoundMenager.Shared().PlayClick();
        AtrributeManager.Share().redrawLabel();
        this.parent.addChild(AtrributeManager.Share());
    };
    //查看信件
    Menu.prototype.toLetter = function () {
        SoundMenager.Shared().PlayClick();
        this.parent.addChild(Letters.Shared());
    };
    return Menu;
}(eui.Component));
__reflect(Menu.prototype, "Menu", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Menu.js.map