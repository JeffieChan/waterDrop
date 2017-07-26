class LoadingUI extends egret.Sprite {

public constructor() {
        super();
        this.createView();

    }

    private textField:egret.TextField;
    private shape:egret.Shape;
    private sun:egret.Shape;
    private lights:Array<egret.Shape>;
    private moon1:egret.Shape;
    private moon2:egret.Shape;
     private stars:Array<egret.Shape>;
        private  h=360;
        private  w=640;
    private createView():void {
        //背景填充
        var ground=new egret.Shape();
        ground.graphics.beginFill(0xF2ECF0);
        ground.graphics.drawRect(0,0,1280,720);
        ground.graphics.endFill();
        this.addChild(ground);
         //进度更新
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = this.h-50;
        this.textField.x = this.w-50;
        this.textField.width = 100;
        this.textField.height =100;
        this.textField.textColor=0x7A88AB;
        this.textField.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.textField.textAlign=egret.HorizontalAlign.CENTER;

        var title=new egret.TextField();
        this.addChild(title);
        title.y=18;
        title.x=32;
        title.verticalAlign = egret.VerticalAlign.MIDDLE;
        title.textColor= 0x6F8286;
        title.size=46;
        title.bold=true;
        title.textFlow = <Array<egret.ITextElement>>[
              {text: "雨", style: { "size": 46}},
              {text: "滴", style: {"size": 30}},
               {text: "石", style: {"size": 50}},
              {text: "阶", style: {"size": 36}}
              ];
                      this.createSunMoon();
        this.createTween();
        
    }

public setProgress(current:number, total:number):void {
        this.addChild(this.getSectorProgress());
        this.textField.text = `${current}/${total}`;                    
                
    }

    private getSectorProgress():egret.Shape {

    var shape:egret.Shape = new egret.Shape();
    // var di=new egret.TextField();
    // var angle:number = 0;
    // egret.startTick(function (timeStamp:number):boolean {
    //     angle += 1;
    //     angle = angle % 360;
    //     changeGraphics(angle);
    //     return true;
    // }, this);

    return shape;

    // function changeGraphics(angle) {
    //     shape.graphics.clear();
    //     shape.graphics.lineStyle(2, 0xF9F9F8);
    //     shape.graphics.drawArc(640, 360, 50, 0, angle * Math.PI / 180, false);
    //     shape.graphics.endFill();
    // }
}

    private createSunMoon(){
       //画个太阳
       this.sun=new egret.Shape();
       this.sun.graphics.beginFill(0xF371B1);
       this.sun.graphics.drawCircle(640,720,80);
       this.sun.graphics.endFill();
       this.addChild(this.sun);
       //画光芒
       this.lights=new Array<egret.Shape>();
       for(var i=0;i<12;i++){
        var dot=this.circlexy(640,340,110,30*i);
        var light=new egret.Shape();
        light.graphics.lineStyle( 5, 0xF3A0CA );
        light.graphics.moveTo( dot.x,dot.y );
        dot=this.circlexy(640,340,120,30*i);
        light.graphics.lineTo( dot.x,dot.y );
        light.graphics.endFill();
        this.lights.push(light);
        this.addChild(this.lights[i]);
        this.lights[i].visible=false;
       }
       //画月亮
    //    this.moon=new egret.Sprite();
       this.moon1=new egret.Shape();
       this.moon1.graphics.beginFill(0x5E485D);
       this.moon1.graphics.drawArc(640,830,100,-Math.PI/2,Math.PI/2,true);
       this.moon1.graphics.endFill();
    //    this.moon.addChild(moon1);
       this.moon2=new egret.Shape();
       this.moon2.graphics.beginFill(0xF2ECF0);
       this.moon2.graphics.drawArc(700,830,110,-Math.PI/2,Math.PI/2,true);
       this.moon2.graphics.endFill();
    //    this.addChild(this.moon);
    //    this.moon.visible=false;
       this.addChild(this.moon1);
       this.addChild(this.moon2);

      //画星星
      this.stars=new Array<egret.Shape>();
      for(var i=0;i<12;i++){
          var x=Math.random()*1080+100;
          var y=Math.random()*200+50;
        var star=new egret.Shape();
        star.graphics.beginFill(0x898A9F);
        star.graphics.drawCircle(x,y,8);
        star.graphics.endFill();
        this.stars.push(star);
        // this.addChild(this.stars[i]);
       }
    }
    private createTween() {
         egret.Tween.get( this.sun).to( {x:0,y:-380}, 1000, egret.Ease.sineOut ).call(()=>{
            egret.Tween.get(this.lights[0]).set({visible:true},300).wait(300).call(()=>{
                egret.Tween.get(this.lights[1]).wait(300).set({visible:true}).call(()=>{
                egret.Tween.get(this.lights[2]).wait(300).set({visible:true}).call(()=>{
                egret.Tween.get(this.lights[3]).wait(300).set({visible:true}).call(()=>{
                egret.Tween.get(this.lights[4]).wait(300).set({visible:true}).call(()=>{
                egret.Tween.get(this.lights[5]).wait(300).set({visible:true}).call(()=>{
                egret.Tween.get(this.lights[6]).wait(300).set({visible:true}).call(()=>{
                egret.Tween.get(this.lights[7]).wait(300).set({visible:true}).call(()=>{
                egret.Tween.get(this.lights[8]).wait(300).set({visible:true}).call(()=>{
                egret.Tween.get(this.lights[9]).wait(300).set({visible:true}).call(()=>{
                egret.Tween.get(this.lights[10]).wait(300).set({visible:true}).call(()=>{
                egret.Tween.get(this.lights[11]).wait(300).set({visible:true}).wait(1000).call(()=>{
                    for(var i=0;i<12;i++){
                                 this.lights[i].visible=false;
                            }
                    egret.Tween.get( this.sun).to( {x:0,y:380}, 1000, egret.Ease.sineIn ).wait(500).call(()=>{
                            for(var i=0;i<12;i++){
                                 this.addChild(this.stars[i]);
                            }
                        egret.Tween.get( this.moon2).to( {x:0,y:-500}, 1000, egret.Ease.sineOut );
                        egret.Tween.get( this.moon1).to( {x:0,y:-500}, 1000, egret.Ease.sineOut ).wait(1500).call(()=>{

                            egret.Tween.get( this.moon2).to( {x:0,y:500}, 1000, egret.Ease.sineIn );
                            egret.Tween.get( this.moon1).to( {x:0,y:500}, 1000, egret.Ease.sineIn ).call(()=>{
                                for(var i=0;i<12;i++){
                                 this.removeChild(this.stars[i]);
                            }
                            this.createTween();
                            });
                        })
                  
                    });
                    
            });
            });
            });
            });
            });
            });
            });
            });
            });
            });
            });
            });
        });

}

//根据圆心坐标a,b和半径还有度数angle 求圆的横坐标和纵坐标
public circlexy(a:number,b:number,r:number,angle:number):Dot{
    var dot=new Dot();
    dot.x=a + Math.sin(2*Math.PI / 360*angle) * r;
    dot.y=b + Math.cos(2*Math.PI / 360*angle) * r;
    return dot;
}
}
class Dot{
    x:number;
    y:number;
}