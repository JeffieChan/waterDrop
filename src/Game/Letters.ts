class Letters extends eui.Component {
	private mo1:eui.Image;//莫青虹的信封
	private liu1:eui.Image;//柳的信封
	private si1:eui.Image;//赵的信封
	private data:eui.Image;//信内容
	private menu:eui.Image;

	public constructor() {		
		super();
		this.skinName = "resource/eui_skins/Letters.exml";//先设定皮肤名字
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	public onAddToStage(){

		this.menu.addEventListener(egret.TouchEvent.TOUCH_TAP,this.returnMenu,this);
		this.mo1.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){this.data.source="mo_letter1_jpg";this.data.visible=true},this);
		this.liu1.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){this.data.source="liu_letter_jpg";this.data.visible=true},this);
		this.si1.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){this.data.source="zhao_letter_jpg";this.data.visible=true},this);
		this.data.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hideLetter,this);

	}

	private hideLetter(){
		SceneBlock.Shared().info.visible=false;//隐藏新信件提示段
		this.data.visible=false;
	}

	private returnMenu(){
		SoundMenager.Shared().PlayClick();
		this.parent.removeChild(this);
	}
	//判断对话时段，显示信封
	public receiveLetter(name:string){
     switch(name){
		 case "mo1":this.mo1.visible=true;break;
		 case "liu1":this.liu1.visible=true;break;
		 case "si1":this.si1.visible=true;break;
		 default:break;	 
	 }
	}
	
	//单例
	private static shared: Letters;
	public static Shared() {
		if(Letters.shared == null) {
			Letters.shared = new Letters();
		}
		return Letters.shared;
	}
}