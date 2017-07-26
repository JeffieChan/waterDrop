class SceneBlock extends eui.Component {

//单例
private static shared: SceneBlock;
public static Shared() {
    if(SceneBlock.shared == null) {
		console.log("创建SceneBlock对象");
        SceneBlock.shared = new SceneBlock();
    }
    return SceneBlock.shared;
}
private dialogbox:Dialog;
private figure:eui.Image;
private dialogIndex:number;
private aside:Aside;
private touchRect:eui.Rect;
private scene:eui.Image;
private menu:eui.Image;
public info:eui.Label;//信件提示段

    //新加设置按钮
    private btn_setting: eui.Button;
	//新加纹理
	// private system;
	private ann:annex;

	public constructor() {
		super();
	    this.skinName = "resource/eui_skins/SceneBlock.exml";
		this.touchRect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_next,this);
		this.aside.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hidaside,this);
        this.menu.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toMenu,this);
		this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_setting,this);
		this.dialogIndex=0;
		this.InitScene(0);
		//开始播放背景音乐
        SoundMenager.Shared().PlayBGM();
}

private onclick_setting() {
    SoundMenager.Shared().PlayClick();
    this.addChild(GameSetting.Shared());
}
	private toMenu(){
       this.addChild(Menu.Shared());
}
	
	private dialogdata:DialogueData;
	private texturestring=null;
	public InitScene(num:number){
		console.log("加载"+num+"段对话");
		this.dialogbox.init();

		this.aside.visible=false;
		this.figure.visible=false;
		this.dialogbox.visible=false;
		this.dialogbox.disselect();
		
		this.dialogIndex=num;
		this.dialogdata=DialogManager.Shared().getDialogue(num);
		//初始化背景图
		var sc=this.dialogdata.scene;
		if(this.isExit(sc))
		   this.scene.source=sc;
		var as=this.dialogdata.aside;

		//判断是否添加纹理
		var texture=this.dialogdata.texture;
		if(this.isExit(texture)){
				if(!this.texturestring)
				    this.ann.addTexture(texture);
			    else if(texture!=this.texturestring){
					this.ann.removeTexturn();
                    this.ann.addTexture(texture);}
				this.texturestring=texture;
		}else{
			if(this.texturestring){
			this.ann.removeTexturn();
			this.texturestring=null;}
		}

		//加载旁白
		if(this.isExit(as)){
		  this.touchRect.visible=false;
		  this.aside.visible=true;
		  this.aside.setAside(as);
		}else{
			this.touchRect.visible=true;
			this.loadingScene();
		}

	}

	//加载人物和对话内容
	private loadingScene(){
        this.dialogbox.visible=true;
		this.figure.visible=true;
		this.figure.source=this.dialogdata.figure;
		
		var selectnum=this.dialogdata.select.length;
		if (!selectnum) {
		this.setIndex(0);
		this.setAdd();
		this.dialogbox.setNameText(this.dialogdata.name);
		this.dialogbox.setDialogText(this.dialogdata.content[0]);		
		//增加下一段对话自定义设定
		} else {		
			this.dialogbox.setSelection(this.dialogdata);
		}
	}

	// private getTexture(text){
	// 		//获取纹理
	// 		var texture = RES.getRes(text+"_png");
	// 		//获取配置
	// 		var config = RES.getRes(text+"_json");
	// 		//创建 GravityParticleSystem
	// 		this.system = new particle.GravityParticleSystem(texture, config);
	// 		//启动粒子库
	// 		this.system.start();
	// 		//将例子系统添加到舞台
	// 		this.addChildAt(this.system,1);
		    
	// 		// var spr:egret.Sprite=new egret.Sprite();
	// 		// spr.graphics.beginFill(0x00ff00);
	// 		// spr.graphics.drawRect(100,100,200,200);
	//         // spr.graphics.endFill();
	// 		// this.addChildAt(spr,2 );
	// }

	private onclick_next(){
		SoundMenager.Shared().PlayClick();
		if(this.dialogbox.offselection){
		
		this.InitScene(this.dialogIndex+1);
        //存下当下对话索引号，以便存档
		egret.localStorage.setItem("dialogIndex",this.dialogIndex.toString());
		}
    }
	//隐藏旁白框
	private hidaside(){
		SoundMenager.Shared().PlayClick();
		this.touchRect.visible=true;
		this.aside.visible=false;
		this.loadingScene();
	}

    //判断是否存在
	private isExit(sc):boolean{
		if(sc==undefined||sc==null||sc.length==0)
		   return false;
		else
		  return true;
	}

	//设置下一次对话的编号（注意减一）
	public setIndex(index:number){
		var next=this.dialogdata.next;
		if(this.isExit(next)){
			// console.log("存在下一次对话");
		   var next_num=parseInt(next[index])-1;
		   this.dialogIndex=next_num;
		   if(next_num<0){
			   this.parent.addChild(GameOver.Shared());
               this.parent.removeChild(this);
			   GameOver.Shared().modifyTabel(next_num+1);
		   }		     
		}		
	}
//属性加成
private setAdd(){
	var add=this.dialogdata.add;
	if(this.isExit(add)){
			var a=[];
	       a=add[0].split("-");
       console.log(add);
	   AtrributeManager.Share().addAtrr(a[0],a[1]);
	}
}
}