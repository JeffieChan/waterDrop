
class GameOver extends eui.Component {

    	//单例
	private static shared: GameOver;
	public static Shared() {
		if(GameOver.shared == null) {
			GameOver.shared = new GameOver();
		}
		return GameOver.shared;
	}

    private label:eui.Label;
    private returnGame:eui.Label;
    private bg:eui.Image;
	public constructor() {
	super();
    this.skinName = "resource/eui_skins/GameOver.exml";
    
    this.label = new eui.Label();
	this.label.x=280;
    this.label.y=150;
    this.label.text = "游戏结束,进行判定";
    this.label.textColor=0x000000;
	this.label.width = 750;//设置宽度
    this.label.height = 330;//设置高度
    this.label.fontFamily = "Tahoma";//设置字体
    this.label.size = 35;//设置文本字号
    this.label.bold = true;//设置是否加粗
    this.label.italic = true;//设置是否斜体
    this.label.textAlign = "center";//设置水平对齐方式
    this.label.verticalAlign = "middle";//设置垂直对齐方式
    this.addChild(this.label);

    this.returnGame=new eui.Label();
    this.returnGame.x=1100;
    this.returnGame.y=40;
    this.returnGame.text="返回游戏";
    this.addChild(this.returnGame);
    this.returnGame.addEventListener(egret.TouchEvent.TOUCH_TAP,this.returnGAME,this)
	}

	public modifyTabel(index:number){
        if(index>0) index=0;
		else index=Math.abs(index);

        switch(index){
            case 2:if(AtrributeManager.Share().getQing()<60) this.returnScene(294);break;
            case 3:if(AtrributeManager.Share().getLiu()<60) index=5;break;
            case 4:if(AtrributeManager.Share().getSi()<60) index=5;break;
        }
        if(index>1) 
           this.bg.source=EndManage.Shared().getEnding(index).bg;
        else
           this.bg.source="endbg_png";
		this.label.text=EndManage.Shared().getEnding(index).content;
	}

    private returnGAME(){
        SceneBlock.Shared().InitScene(0);
        this.parent.addChild(SceneBegin.Shared());
        this.parent.removeChild(this);
    }

    private returnScene(num:number){     
        this.parent.addChild(SceneBlock.Shared());
        this.parent.removeChild(this);
        SceneBlock.Shared().InitScene(num);
    }
}