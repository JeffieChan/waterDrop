class SaveFile extends eui.Component{

	//单例
	private static shared: SaveFile;
	public static Shared() {
		if(SaveFile.shared == null) {
			SaveFile.shared = new SaveFile();
		}
		return SaveFile.shared;
	}

	private title:eui.Label;
	private menu:eui.Image;
	private file1:GameFile;
	private file2:GameFile;
	private file3:GameFile;
	private file4:GameFile;
	public constructor() {
		super();
		this.skinName="resource/eui_skins/SaveFile.exml";
		this.menu.addEventListener(egret.TouchEvent.TOUCH_TAP,this.returnMenu,this);
	}

	public switchSave(){
		this.file1.switchToSave();
		this.file2.switchToSave();
		this.file3.switchToSave();
		this.file4.switchToSave();
		this.title.text="存档";
	}

	public switchRead(){
		this.file1.switchToRead();
		this.file2.switchToRead();
		this.file3.switchToRead();
		this.file4.switchToRead();
		this.title.text="读档";
	}
    
	private returnMenu(){
		if(!this.parent.contains(SceneBlock.Shared()))
		   this.parent.addChild(SceneBlock.Shared());
		SoundMenager.Shared().PlayClick();
		this.parent.removeChild(this);
	}
	

	
}