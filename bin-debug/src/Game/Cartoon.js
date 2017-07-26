var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Cartoon = (function (_super) {
    __extends(Cartoon, _super);
    function Cartoon() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.mouseDown, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.mouseUp, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, function () { this.skip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.forSkip, this); }, _this);
        return _this;
    }
    Cartoon.prototype.forSkip = function () {
        this.skip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.forSkip, this);
        this.parent.addChild(SceneBlock.Shared());
        this.parent.removeChild(this);
    };
    Cartoon.prototype.mouseDown = function (evt) {
        this.currenty = evt.stageY;
    };
    Cartoon.prototype.mouseUp = function (evt) {
        this.distanceY = evt.stageY - this.currenty;
        this.forNext();
    };
    Cartoon.prototype.forNext = function () {
        if (this.current.y > -8320) {
            if (this.distanceY < 0) {
                var tw = egret.Tween.get(this.current);
                tw.to({ y: this.current.y - 640 }, 1000, egret.Ease.sineInOut);
                this.current.y = this.current.y - 640;
            }
            else if (this.distanceY > 0) {
                var tw = egret.Tween.get(this.current);
                tw.to({ y: this.current.y + 640 }, 1000, egret.Ease.sineInOut);
                this.current.y = this.current.y + 640;
            }
        }
        else {
            console.log("结束了！");
            this.parent.addChild(SceneBlock.Shared());
            this.parent.removeChild(this);
        }
    };
    return Cartoon;
}(eui.Component));
__reflect(Cartoon.prototype, "Cartoon", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Cartoon.js.map