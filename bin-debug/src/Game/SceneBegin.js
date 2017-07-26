var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SceneBegin = (function (_super) {
    __extends(SceneBegin, _super);
    function SceneBegin() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/SceneBeginSkin.exml";
        _this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_begin, _this);
        _this.continue.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.continueGame, _this);
        _this.littlegame.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.litterGame, _this);
        egret.Tween.removeAllTweens();
        return _this;
    }
    SceneBegin.Shared = function () {
        if (SceneBegin.shared == null) {
            SceneBegin.shared = new SceneBegin();
        }
        return SceneBegin.shared;
    };
    SceneBegin.prototype.onclick_begin = function () {
        SoundMenager.Shared().PlayClick();
        this.parent.addChild(new Cartoon());
        this.parent.removeChild(this);
    };
    SceneBegin.prototype.continueGame = function () {
        SoundMenager.Shared().PlayClick();
        SaveFile.Shared().switchRead();
        this.parent.addChild(SaveFile.Shared());
        this.parent.removeChild(this);
    };
    SceneBegin.prototype.litterGame = function () {
        var gameContainer = new fighter.GameContainer();
        this.parent.addChild(gameContainer);
        this.parent.removeChild(this);
    };
    return SceneBegin;
}(eui.Component));
__reflect(SceneBegin.prototype, "SceneBegin");
//# sourceMappingURL=SceneBegin.js.map