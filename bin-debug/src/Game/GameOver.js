var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/GameOver.exml";
        _this.label = new eui.Label();
        _this.label.x = 280;
        _this.label.y = 150;
        _this.label.text = "游戏结束,进行判定";
        _this.label.textColor = 0x000000;
        _this.label.width = 750; //设置宽度
        _this.label.height = 330; //设置高度
        _this.label.fontFamily = "Tahoma"; //设置字体
        _this.label.size = 35; //设置文本字号
        _this.label.bold = true; //设置是否加粗
        _this.label.italic = true; //设置是否斜体
        _this.label.textAlign = "center"; //设置水平对齐方式
        _this.label.verticalAlign = "middle"; //设置垂直对齐方式
        _this.addChild(_this.label);
        _this.returnGame = new eui.Label();
        _this.returnGame.x = 1100;
        _this.returnGame.y = 40;
        _this.returnGame.text = "返回游戏";
        _this.addChild(_this.returnGame);
        _this.returnGame.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.returnGAME, _this);
        return _this;
    }
    GameOver.Shared = function () {
        if (GameOver.shared == null) {
            GameOver.shared = new GameOver();
        }
        return GameOver.shared;
    };
    GameOver.prototype.modifyTabel = function (index) {
        if (index > 0)
            index = 0;
        else
            index = Math.abs(index);
        switch (index) {
            case 2:
                if (AtrributeManager.Share().getQing() < 60)
                    this.returnScene(294);
                break;
            case 3:
                if (AtrributeManager.Share().getLiu() < 60)
                    index = 5;
                break;
            case 4:
                if (AtrributeManager.Share().getSi() < 60)
                    index = 5;
                break;
        }
        if (index > 1)
            this.bg.source = EndManage.Shared().getEnding(index).bg;
        else
            this.bg.source = "endbg_png";
        this.label.text = EndManage.Shared().getEnding(index).content;
    };
    GameOver.prototype.returnGAME = function () {
        SceneBlock.Shared().InitScene(0);
        this.parent.addChild(SceneBegin.Shared());
        this.parent.removeChild(this);
    };
    GameOver.prototype.returnScene = function (num) {
        this.parent.addChild(SceneBlock.Shared());
        this.parent.removeChild(this);
        SceneBlock.Shared().InitScene(num);
    };
    return GameOver;
}(eui.Component));
__reflect(GameOver.prototype, "GameOver");
//# sourceMappingURL=GameOver.js.map