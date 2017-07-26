class GameFile extends eui.Component {
    //标记是第几个存档
	public static index:number=0;
	private num:number;
	private file_sc:eui.Image;
	public constructor() {
		super();
		this.num=GameFile.index;
		GameFile.index++;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.saveFile,this);
        //一开始加载判断是否存在存档
		var dialogNum=egret.localStorage.getItem("dialogNum"+this.num);
		if(dialogNum){
			this.redraw(parseInt(dialogNum));
		}
	}
    //存档
	private saveFile(){

		var dialogNum=egret.localStorage.getItem("dialogIndex");
		// ResLoad.Shared().IsExit(1);
		//保存呢当前任务属性和故事进展速度
		egret.localStorage.setItem("dialogNum"+this.num,dialogNum);
		AtrributeManager.Share().setAtrribute(this.num);
			var now=new Date();
			var time=now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes();
			egret.localStorage.setItem("saveTime"+this.num,time);
		this.redraw(parseInt(dialogNum));

	}

	//重绘制存档框
	private redraw(dialogNum){
		var dialogdata=DialogManager.Shared().getDialogue(dialogNum);

		    var image = new eui.Image();
			image.source = dialogdata.scene;
			image.scaleX=0.25;
			image.scaleY=0.25;
			image.x = 0;
			image.y = 0;
			this.addChild(image);

			var image = new eui.Image();
			image.source = dialogdata.figure;
			image.scaleX=0.25;
			image.scaleY=0.25;
			image.bottom = 0;
			image.right = 0;
			this.addChild(image);

			var time = new eui.Label;
			time.text=egret.localStorage.getItem("saveTime"+this.num)
			time.top=5;
			time.right=5;
			time.size=20;
			this.addChild(time);

	}
//读档
	private readFile(){
		var groupnum=0;
		var dialogNum=egret.localStorage.getItem("dialogNum"+this.num);
			if(parseInt(dialogNum)>60) groupnum=1;
			// ResLoad.Shared().IsExit(groupnum);
		//如果存在存档，就进行读档
		if(dialogNum!=null){
		AtrributeManager.Share().getAtrribute(this.num);

		SceneBlock.Shared().InitScene(parseInt(dialogNum));
		//判断是否在首页加载，Main中有无SceneBlock.Shared()子类
		if(!this.parent.parent.contains(SceneBlock.Shared()))
		   this.parent.parent.addChild(SceneBlock.Shared());
		this.parent.parent.removeChild(this.parent);
		}
	}
//读存档切换
	public switchToRead(){
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.saveFile,this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.readFile,this)
	}

	public switchToSave(){
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.readFile,this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.saveFile,this);
	}

}