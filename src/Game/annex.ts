class annex extends eui.Component{

	//单例
private static shared: annex;
public static Shared() {
    if(annex.shared == null) {
		console.log("创建annex对象");
        annex.shared = new annex();
    }
    return annex.shared;
}
    
	private system;
	public constructor() {
		super();
	}
    public addTexture(text){
			//获取纹理
			var texture = RES.getRes(text+"_png");
			//获取配置
			var config = RES.getRes(text+"_json");
			//创建 GravityParticleSystem
			this.system = new particle.GravityParticleSystem(texture, config);
			//启动粒子库
			this.system.start();
			//将例子系统添加到舞台
			this.addChild(this.system);
	}
	public removeTexturn(){
		this.removeChild(this.system);
	}
}