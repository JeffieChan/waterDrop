module fighter {
	export class BgMap extends egret.DisplayObjectContainer{
		private bmpArr:egret.Bitmap[];//图片引用
		private rowCount:number;
		private stageW:number;
		private stageH:number;
		private textureWidth:number;
		private speed:number = 2;

		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}

		private onAddToStage(event:egret.Event){
			this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.stageW = this.stage.stageWidth;
			this.stageH = this.stage.stageHeight;
			var texture:egret.Texture = RES.getRes("wall_jpg");
            this.textureWidth = texture.textureWidth;
			this.rowCount = Math.ceil(this.stageW/this.textureWidth)+1;
			this.bmpArr = [];
			for(var i:number = 0;i<this.rowCount;i++)
			{
				var bgBmp:egret.Bitmap = fighter.createBitmapByName("wall_jpg");
				bgBmp.x = this.textureWidth*i-(this.textureWidth*this.rowCount-this.stageW);
				this.bmpArr.push(bgBmp);
				this.addChild(bgBmp);
     		}
		}

		public start():void{
			this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
			this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
		}
        //逐帧运动
		private enterFrameHandler(event:egret.Event):void{
			for(var i:number=0;i<this.rowCount;i++){
				var bgBmp:egret.Bitmap = this.bmpArr[i];
				bgBmp.x +=this.speed;
				if(bgBmp.x>this.stageW){
					bgBmp.x = this.bmpArr[0].x-this.textureWidth;
					this.bmpArr.pop();
					this.bmpArr.unshift(bgBmp);
				}
			}
		}

		public pause():void{
			this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
		}
	}
}