//每段对话的数据结构
class DialogueData{
    public pre_conditions:string;
    public aside:string;//旁白很特殊，在对话数据中，但是由场景类进行管理
    public name:string;
    public content:string[];
    public skins:string;
    public figure:string;
    public scene:string;
    public post_conditions:string;
	public next:string[];
	public select:string[];
    public add:string[];
    public texture:string;
}
//对话数据管理器
class DialogManager {
	 //单例
    private static shared:DialogManager;
    public static Shared(){
        if(DialogManager.shared == null){
            DialogManager.shared = new DialogManager();
        }
        return DialogManager.shared;
    }
	//一个对话的保存数据组
	private items:DialogueData[]=[];
	public constructor() {
		 //使用RES读取和构建JSON数据，JSON数据可以直接解析到目标结构
        this.items = RES.getRes("dialogue_json");
	}

	public getDialogue(num:number):DialogueData{
		if(num<0) num=0;
		//判断是否显示信件
        switch(num){
            case 74:SceneBlock.Shared().info.visible=true;break;
            case 166:SceneBlock.Shared().info.visible=true;break;
            case 295:SceneBlock.Shared().info.visible=true;break;
            default:break;
        }
        if(num>73)
           Letters.Shared().receiveLetter("mo1");
        if(num>165)
           Letters.Shared().receiveLetter("si1");
        if(num>294){
           //只要存档里有超过294的存档就能读取到，这里是收集信件
           Letters.Shared().receiveLetter("liu1");
        }
		return this.items[num];
	}

    //获取当前进度
    
    //设置当前进度
}