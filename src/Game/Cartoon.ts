class Cartoon extends eui.Component implements  eui.UIComponent {
	private current:eui.Group;
	private skip:eui.Group;
	public constructor() {
		super();
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE,
		function(){this.skip.addEventListener(egret.TouchEvent.TOUCH_TAP,this.forSkip,this);},this);
	}
	private forSkip(){
	    this.skip.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.forSkip,this);
		this.parent.addChild(SceneBlock.Shared());
        this.parent.removeChild(this);
	}
	private currenty;
	private mouseDown(evt:egret.TouchEvent){
		this.currenty=evt.stageY;
	}
	private distanceY;
	private mouseUp(evt:egret.TouchEvent){
		this.distanceY=evt.stageY-this.currenty;	
		this.forNext();
	}
	private _txInfo:egret.TextField;
	private forNext(){
		if(this.current.y>-8320){
		if(this.distanceY<0){
		   var tw = egret.Tween.get( this.current );
           tw.to( {y:this.current.y-640}, 1000 ,egret.Ease.sineInOut);
		    this.current.y=this.current.y-640;
		}
        else if(this.distanceY>0){
			 var tw = egret.Tween.get( this.current );
            tw.to( {y:this.current.y+640}, 1000 ,egret.Ease.sineInOut);
			this.current.y=this.current.y+640;
		}
		}else{
			console.log("结束了！");
			 this.parent.addChild(SceneBlock.Shared());
             this.parent.removeChild(this);
		}
	}

}