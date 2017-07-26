class Menu extends eui.Component implements  eui.UIComponent {
	//单例
private static shared: Menu;
public static Shared() {
    if(Menu.shared == null) {
        Menu.shared = new Menu();
    }
    return Menu.shared;
}
	private letter:eui.Image;
	private save:eui.Image;
	private read:eui.Image;
	private attributes:eui.Image;

	public constructor() {
		super();
		 this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		 this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clear,this);
	}

	private onAddToStage(){
		
        this.save.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toSave,this);
		this.read.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toRead,this);
		this.attributes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toAtrr,this);
		this.letter.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toLetter,this);
	}
	private clear(){
		   this.parent.removeChild(this);
	}
	//跳到存档
	private toSave(){
		SoundMenager.Shared().PlayClick();
		SaveFile.Shared().switchSave();
		this.parent.addChild(SaveFile.Shared());
	}

	//跳到读档
	private toRead(){
		SoundMenager.Shared().PlayClick();
		SaveFile.Shared().switchRead();
		this.parent.addChild(SaveFile.Shared());
	}
	//查看属性
	public toAtrr(){
		SoundMenager.Shared().PlayClick();
		AtrributeManager.Share().redrawLabel();
		this.parent.addChild(AtrributeManager.Share());
	}

	//查看信件
	public toLetter(){
		SoundMenager.Shared().PlayClick();	
		this.parent.addChild(Letters.Shared());
	}
}