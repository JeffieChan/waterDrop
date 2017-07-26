var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameFile = (function (_super) {
    __extends(GameFile, _super);
    function GameFile() {
        var _this = _super.call(this) || this;
        _this.num = GameFile.index;
        GameFile.index++;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.saveFile, _this);
        //一开始加载判断是否存在存档
        var dialogNum = egret.localStorage.getItem("dialogNum" + _this.num);
        if (dialogNum) {
            _this.redraw(parseInt(dialogNum));
        }
        return _this;
    }
    //存档
    GameFile.prototype.saveFile = function () {
        var dialogNum = egret.localStorage.getItem("dialogIndex");
        // ResLoad.Shared().IsExit(1);
        //保存呢当前任务属性和故事进展速度
        egret.localStorage.setItem("dialogNum" + this.num, dialogNum);
        AtrributeManager.Share().setAtrribute(this.num);
        var now = new Date();
        var time = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes();
        egret.localStorage.setItem("saveTime" + this.num, time);
        this.redraw(parseInt(dialogNum));
    };
    //重绘制存档框
    GameFile.prototype.redraw = function (dialogNum) {
        var dialogdata = DialogManager.Shared().getDialogue(dialogNum);
        var image = new eui.Image();
        image.source = dialogdata.scene;
        image.scaleX = 0.25;
        image.scaleY = 0.25;
        image.x = 0;
        image.y = 0;
        this.addChild(image);
        var image = new eui.Image();
        image.source = dialogdata.figure;
        image.scaleX = 0.25;
        image.scaleY = 0.25;
        image.bottom = 0;
        image.right = 0;
        this.addChild(image);
        var time = new eui.Label;
        time.text = egret.localStorage.getItem("saveTime" + this.num);
        time.top = 5;
        time.right = 5;
        time.size = 20;
        this.addChild(time);
    };
    //读档
    GameFile.prototype.readFile = function () {
        var groupnum = 0;
        var dialogNum = egret.localStorage.getItem("dialogNum" + this.num);
        if (parseInt(dialogNum) > 60)
            groupnum = 1;
        // ResLoad.Shared().IsExit(groupnum);
        //如果存在存档，就进行读档
        if (dialogNum != null) {
            AtrributeManager.Share().getAtrribute(this.num);
            SceneBlock.Shared().InitScene(parseInt(dialogNum));
            //判断是否在首页加载，Main中有无SceneBlock.Shared()子类
            if (!this.parent.parent.contains(SceneBlock.Shared()))
                this.parent.parent.addChild(SceneBlock.Shared());
            this.parent.parent.removeChild(this.parent);
        }
    };
    //读存档切换
    GameFile.prototype.switchToRead = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.saveFile, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.readFile, this);
    };
    GameFile.prototype.switchToSave = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.readFile, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.saveFile, this);
    };
    return GameFile;
}(eui.Component));
//标记是第几个存档
GameFile.index = 0;
__reflect(GameFile.prototype, "GameFile");
//# sourceMappingURL=GameFile.js.map