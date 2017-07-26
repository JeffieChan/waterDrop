class Dialog extends eui.Component{

	protected person:eui.Label;
	protected dialog:eui.Label;
    protected dialogbox:eui.Group;
    protected select1:eui.Group;
    protected select2:eui.Group;
    protected select3:eui.Group;
    protected selection1:eui.Label;
    protected selection2:eui.Label;
    protected selection3:eui.Label;

    //判断选择框是否开启
    public offselection:boolean;

	public constructor() {
		super();
        this.offselection=true;
	}

	public setNameText(value:string){
        this.dialogbox.visible=true;
        this.person.text = value;
    }
    public getNameText():string{
        return this.person.text;
    }
	public setDialogText(value:string){
        this.dialog.text = value;
    }
    public getDialogText():string{
        return this.dialog.text;
    }
	

    private dialogdata:DialogueData;
    //设置选择框
	public setSelection(dialogdata:DialogueData){
        this.offselection=false;
        this.dialogbox.visible=false;
        this.dialogdata=dialogdata;
        var selectnum=this.dialogdata.select.length;
        if(selectnum>0){
        this.select1.visible=true;
        this.selection1.text=this.dialogdata.select[0];
        this.selection1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.s1,this);
                if(selectnum>1){
                this.select2.visible=true;
                this.selection2.text=this.dialogdata.select[1];
                this.selection2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.s2,this)
                      if(selectnum>2){
                        this.select3.visible=true;
                        this.selection3.text=this.dialogdata.select[2];
                        this.selection3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.s3,this) 
                      }
             }
        }
    }

    private selected(name:string,content:string,attr:string,num:number){
        
        this.offselection=true;
        var a=[];
        this.disselect();
        this.setNameText(name);
        this.setDialogText(content);
        a=attr.split("-");
        if(a[0]>0)
        AtrributeManager.Share().addAtrr(a[0],a[1]);
         
        if(num!=undefined){
          SceneBlock.Shared().setIndex(num);
        }

    }
        private s1(){
            
            this.selected(this.dialogdata.name,this.dialogdata.content[0],this.dialogdata.add[0],0);
        }
        private s2(){
            this.selected(this.dialogdata.name,this.dialogdata.content[1],this.dialogdata.add[1],1);
        }
        private s3(){
            this.selected(this.dialogdata.name,this.dialogdata.content[2],this.dialogdata.add[2],2)
        }

/**
    	public setSelection2(value:string,dialog:string,per:string){
        this.select2.visible=true;
        this.selection2.text=value;
        this.selection2.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
             this.disselect();
             this.setNameText(per);
             this.setDialogText(dialog);
        },this)        
    }
    	public setSelection3(value:string,dialog:string,per:string){
        this.select3.visible=true;
        this.selection3.text=value;
        this.selection3.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
             this.disselect();
             this.setNameText(per);
             this.setDialogText(dialog);
        },this)          
    }
 */

    public disselect(){
        this.selection1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.s1,this);
        this.selection2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.s2,this);
        this.selection3.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.s3,this);
        this.select3.visible=false;
        this.select1.visible=false;
        this.select2.visible=false;
    }

    public init(){
        this.offselection=true;
    }
    
}