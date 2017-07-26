//每段结局的数据结构
class Ending{
	public num:number;
    public content:string;
	public bg:string
}
class EndManage {
		 //单例
    private static shared:EndManage;
    public static Shared(){
        if(EndManage.shared == null){
            EndManage.shared = new EndManage();
        }
        return EndManage.shared;
    }
	private items:Ending[]=[];
	public constructor() {
		 //使用RES读取和构建JSON数据，JSON数据可以直接解析到目标结构
        this.items = RES.getRes("ending_json");
	}
		public getEnding(num:number):Ending{

		//判断加载条件
		return this.items[num];
	}
}