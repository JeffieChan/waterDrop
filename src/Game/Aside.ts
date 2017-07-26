class Aside extends eui.Component{

	//单例
private static shared: Aside;
public static Shared() {
    if(Aside.shared == null) {
        Aside.shared = new Aside();
    }
    return Aside.shared;
}

    private asidetext:eui.Label;
	public constructor() {
		super();
	}

	public setAside(value:string){
		this.asidetext.text=value;
	}
	// public getAside():string{
	// 	return 
	// }
	
}