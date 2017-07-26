var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var VideoLoading = (function (_super) {
    __extends(VideoLoading, _super);
    function VideoLoading() {
        var _this = _super.call(this) || this;
        _this.video = new egret.Video();
        _this.video.x = 0; //设置视频坐标x
        _this.video.y = 0; //设置视频坐标y
        _this.video.width = 1280; //设置视频宽
        _this.video.height = 720; //设置视频高
        // this.video.fullscreen = false;         
        // this.video.poster = "resource/assets/Button/button_up.png"; //设置loding图
        _this.video.load("resource/asset/particle/startmv2.mp4");
        _this.addChild(_this.video); //将视频添加到舞台
        //监听视频加载完成
        _this.video.once(egret.Event.COMPLETE, _this.onLoad, _this);
        //监听视频加载失败
        _this.video.once(egret.IOErrorEvent.IO_ERROR, _this.onLoadErr, _this);
        //监听视频播放完成
        _this.video.once(egret.Event.ENDED, _this.ended, _this);
        return _this;
    }
    VideoLoading.prototype.onLoad = function (e) {
        var btnPlay = new eui.Label();
        btnPlay.text = "播放开场动画";
        btnPlay.width = 200;
        btnPlay.textColor = 0Xffffff;
        btnPlay.x = 540;
        btnPlay.y = 300;
        this.addChild(btnPlay);
        var btnYes = new eui.Label();
        btnYes.text = "是";
        btnYes.textColor = 0Xffffff;
        btnYes.x = 540;
        btnYes.y = 340;
        this.addChild(btnYes);
        var btnNo = new eui.Label();
        btnNo.text = "否";
        btnNo.textColor = 0Xffffff;
        btnNo.x = 690;
        btnNo.y = 340;
        this.addChild(btnNo);
        //监听按钮行为，当按下时调用播放函数。
        btnYes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlay, this);
        btnNo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.end, this);
    };
    VideoLoading.prototype.onPlay = function () {
        var btnEnd = new eui.Label();
        btnEnd.text = "结束播放>>";
        btnEnd.width = 160;
        btnEnd.textColor = 0Xffffff;
        btnEnd.x = 1100;
        btnEnd.y = 20;
        this.addChildAt(btnEnd, 2);
        //监听按钮行为，当按下时调用播放函数。
        btnEnd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.end, this);
        this.video.play();
    };
    VideoLoading.prototype.onLoadErr = function (e) {
        console.log("video load error happened");
    };
    VideoLoading.prototype.end = function (e) {
        console.log("停止");
        this.video.pause();
        this.parent.addChild(SceneBlock.Shared());
        this.parent.removeChild(this);
    };
    VideoLoading.prototype.ended = function (e) {
        console.log("停止");
        this.video.pause();
        this.parent.addChild(SceneBlock.Shared());
        this.parent.removeChild(this);
    };
    return VideoLoading;
}(egret.DisplayObjectContainer));
__reflect(VideoLoading.prototype, "VideoLoading");
//# sourceMappingURL=VideoLoading.js.map