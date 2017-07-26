
class AtrributeManager extends eui.Component {
	public Num=["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"];
	private static shared:AtrributeManager;
	public static Share():AtrributeManager{
		
		if(AtrributeManager.shared==null)
		  AtrributeManager.shared=new AtrributeManager();
		return AtrributeManager.shared;
	}

	private force:number;
	private wit:number;
	private popularity:number;
	private qing:number;
	private si:number;
	private liu:number;
	private qingLabel:eui.Label;
	private siLabel:eui.Label;
	private liuLabel:eui.Label;
	private forceLabel:eui.Label;
	private witLabel:eui.Label;
    private popLabel:eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/eui_skins/Attribute.exml";
		this.force=0;
		this.wit=0;
		this.popularity=0;
		this.qing=0;
		this.si=0;
		this.liu=0;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clear,this);
		
	}
	private clear(){
		   this.parent.removeChild(this);
	}
	//获取属性值
	public getFoece():number{
		return this.force;
	}
	public getWit():number{
		return this.wit;
	}
	public getPopularity():number{
		return this.popularity;
	}
	public getQing():number{
		return this.qing;
	}
	public getSi():number{
		return this.si;
	}
	public getLiu():number{
		return this.liu;
	}

	//对游戏进行存档
	public setAtrribute(value:number){
		var a=this.force+"-"+this.wit+"-"+this.popularity+"-"+this.qing+"-"+this.si+"-"+this.liu;
		console.log(a);
		egret.localStorage.setItem("myAtrribute"+value,a);
	}
	//对游戏进行读档
	public getAtrribute(value){
		var a=[];
	    a=egret.localStorage.getItem("myAtrribute"+value).split("-");
		this.force=parseInt(a[0]);
		this.wit=parseInt(a[1]);
		this.popularity=parseInt(a[2]);
		this.qing=parseInt(a[3]);
		this.si=parseInt(a[4]);
		this.liu=parseInt(a[5]);	
	}

	public addAtrr(index,num){
		index=parseInt(index);
		num=parseInt(num);
		switch(index){
			case 1:this.force+=num;break;
			case 2:this.wit+=num;break;
			case 3:this.popularity+=num;break;
			case 4:this.qing+=num;break;
			case 5:this.si+=num;break;
			case 6:this.liu+=num;break;
		}
		this.toString();
	}

	public toString(){
		var a=this.force+"-"+this.wit+"-"+this.popularity+"-"+this.qing+"-"+this.si+"-"+this.liu;
	}
	public redrawLabel(){
		this.qingLabel.text=this.convertNum(this.qing.toString());
		this.siLabel.text=this.convertNum(this.si.toString());
		this.liuLabel.text=this.convertNum(this.liu.toString());
		this.witLabel.text=this.convertNum(this.wit.toString());
		this.popLabel.text=this.convertNum(this.popularity.toString());
		this.forceLabel.text=this.convertNum(this.force.toString());
	}
//转繁体数字
public convertNum(numstr:string):string{
	var str="";
	for(var i=0;i<numstr.length;i++){
		str+=this.Num[parseInt(numstr.charAt(i))];
	}
	return str;
}

}