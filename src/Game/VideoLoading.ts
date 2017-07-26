class VideoLoading extends egret.DisplayObjectContainer{
    public constructor() {
        super();
        this.video = new egret.Video();
        this.video.x = 0;                       //设置视频坐标x
        this.video.y = 0;                       //设置视频坐标y
        this.video.width = 1280;                 //设置视频宽
        this.video.height = 720;                //设置视频高
        // this.video.fullscreen = false;         
        // this.video.poster = "resource/assets/Button/button_up.png"; //设置loding图
        this.video.load("resource/asset/particle/startmv2.mp4");
        this.addChild(this.video);              //将视频添加到舞台
        //监听视频加载完成
        this.video.once(egret.Event.COMPLETE,this.onLoad,this);
        //监听视频加载失败
        this.video.once(egret.IOErrorEvent.IO_ERROR,this.onLoadErr,this);
        //监听视频播放完成
        this.video.once(egret.Event.ENDED,this.ended,this);  	

    }
    private video: egret.Video;
    private onLoad(e: egret.Event) {
	    var btnPlay:eui.Label=new eui.Label();
        btnPlay.text = "播放开场动画";
		btnPlay.width=200;
		btnPlay.textColor=0Xffffff;
        btnPlay.x = 540;
        btnPlay.y = 300;
        this.addChild(btnPlay);
        var btnYes:eui.Label=new eui.Label();
        btnYes.text = "是";
		btnYes.textColor=0Xffffff;
        btnYes.x = 540;
        btnYes.y = 340;
        this.addChild(btnYes);
	    var btnNo:eui.Label=new eui.Label();
        btnNo.text = "否";
		btnNo.textColor=0Xffffff;
        btnNo.x = 690;
        btnNo.y = 340;
        this.addChild(btnNo);
        //监听按钮行为，当按下时调用播放函数。
        btnYes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPlay,this);
        btnNo.addEventListener(egret.TouchEvent.TOUCH_TAP,this.end,this);	
    }
    private onPlay(){
       var btnEnd:eui.Label=new eui.Label();
        btnEnd.text = "结束播放>>";
		btnEnd.width=160;
		btnEnd.textColor=0Xffffff;
        btnEnd.x = 1100;
        btnEnd.y = 20;
        this.addChildAt(btnEnd,2);
        //监听按钮行为，当按下时调用播放函数。
        btnEnd.addEventListener(egret.TouchEvent.TOUCH_TAP,this.end,this);
        this.video.play();
    }
    private onLoadErr(e: egret.Event) {
        console.log("video load error happened");
    }
    private end(e: egret.TouchEvent) {
        console.log("停止");
		this.video.pause();
        this.parent.addChild(SceneBlock.Shared());
        this.parent.removeChild(this);
    }
    private ended(e: egret.Event){
         console.log("停止");
         this.video.pause();
        this.parent.addChild(SceneBlock.Shared());
        this.parent.removeChild(this);
    }
}