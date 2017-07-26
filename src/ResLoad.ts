enum groupname{"preload","two"}
/**
 * 判断当前所需的资源组是否加载完成
 * 如果没有加载完成，则调整当前加载的资源组
 */

class ResLoad {
	private static shared: ResLoad;

    public static Shared() {
       
        if(ResLoad.shared == null) {
            ResLoad.shared = new ResLoad();
        }
        return ResLoad.shared;
    }
	
	public constructor() {
		console.log("创建ResLoad");
	}
	public IsExit(groupnum:number){
		console.log(groupname[groupnum]);
		if(!RES.isGroupLoaded(groupname[groupnum])){
			console.log("未找到");
		}else{
			console.log("存在");
		}
	}

}