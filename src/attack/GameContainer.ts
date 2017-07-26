module fighter {
	export class GameContainer extends egret.DisplayObjectContainer{
		private stageW:number;
		private stageH:number;
		private btnStart:egret.Bitmap;//开始按钮
		private bg:fighter.BgMap;//可滚动背景
		private myFighter:fighter.Airplane;//我的飞机
        private myBullets:fighter.Bullet[] = [];//我的子弹
		private enemyFighters:fighter.Airplane[] = [];//敌人的飞机
        private enemyFightersTimer:egret.Timer = new egret.Timer(1000);//触发创建敌人的间隔
		private enemyBullets:fighter.Bullet[] = [];//敌人的子弹
		private scorePanel:fighter.ScorePanel;//成绩显示
		private myScore:number = 0;//我的成绩
		private _lastTime:number;
        private _touchStatus:boolean = false;//触摸状态
        private _distance:egret.Point = new egret.Point();
        private btnReturn:egret.TextField;//返回游戏
		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		private onAddToStage(event:egret.Event){
			this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.creatGameScene();
		}
		private creatGameScene():void{
			this.stageW = this.stage.stageWidth;
			this.stageH = this.stage.stageHeight;
			// //开始按钮
			// this.btnStart = fighter.createBitmapByName("start_png");
			// this.btnStart.x = (this.stageW-this.btnStart.width)/2;
			// this.btnStart.y = (this.stageH-this.btnStart.height)/2;
			
			this.bg = new fighter.BgMap();
			// this.btnStart.touchEnabled = true;
			this.gameStart();
			this.addChild(this.bg);
			// this.addChild(this.btnStart);
			this.myFighter = new fighter.Airplane(RES.getRes("plane_png"),100,"plane_png");
			this.myFighter.x = this.stageW-this.myFighter.width-600;
			this.myFighter.y = this.stageH-this.myFighter.height-100;
			this.myFighter.fire();
            // this.myFighter.touchEnabled = true;
            this.myFighter.addEventListener(egret.Event.ADDED_TO_STAGE, this.touchHandler, this);
			this.addChild(this.myFighter);
            this.btnReturn=new egret.TextField();
            this.btnReturn.text = "返回游戏";
            this.btnReturn.x = 20;
            this.btnReturn.y = 15;
            this.btnReturn.touchEnabled=true;
            this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                this.removeEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
                console.log("退出小游戏");
                this.parent.addChild(SceneBegin.Shared());
                this.parent.removeChild(this);
            },this);
            this.addChild(this.btnReturn);
            this.scorePanel = new fighter.ScorePanel();
		}

		private gameStart():void{
			this.bg.start();
			//this.myFighter.fire();
			this.enemyFightersTimer.addEventListener(egret.TimerEvent.TIMER,this.createEnemyFighter,this);
			this.enemyFightersTimer.start();
			this.addEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
			// var imgLoader:egret.ImageLoader = new egret.ImageLoader;
            // imgLoader.once(egret.Event.COMPLETE, this.touchHandler,this);
            
		}

		private createEnemyFighter(evt:egret.TimerEvent):void{
			var enemyFighter:fighter.Airplane = fighter.Airplane.produce("enemyplane_png",1000);
			enemyFighter.x = Math.random()*(this.stageW-enemyFighter.width);
			enemyFighter.y = this.stageH-enemyFighter.height-460;
			// enemyFighter.y = -enemyFighter.height-Math.random()*300;
			enemyFighter.fire();
			this.addChildAt(enemyFighter,this.numChildren-1);
			this.enemyFighters.push(enemyFighter);
			this.myFighter.addEventListener("createBullet",this.createBulletHandler,this);
			enemyFighter.addEventListener("createBullet",this.createBulletHandler,this);
		}

		private createBulletHandler(evt:egret.Event):void{
			var bullet:fighter.Bullet;
			if(evt.target==this.myFighter){
				for(var i:number=0;i<2;i++){
					bullet = fighter.Bullet.produce("b2_png");
					bullet.x = this.myFighter.x+28;
					bullet.y = this.myFighter.y+30;
					this.addChildAt(bullet,this.numChildren-1-this.enemyBullets.length);
					this.myBullets.push(bullet);
				}
			}else{
				var theFighter:fighter.Airplane = evt.target;
				bullet = fighter.Bullet.produce("b3_png");
				bullet.x = theFighter.x+20;
				bullet.y = theFighter.y+80;
                this.addChildAt(bullet,this.numChildren-1-this.enemyBullets.length);
				this.enemyBullets.push(bullet);
			}
		}

		private gameViewUpdate(evt:egret.Event):void{
           //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
            var nowTime:number = egret.getTimer();
            var fps:number = 1000/(nowTime-this._lastTime);
            this._lastTime = nowTime;
            var speedOffset:number = 60/fps;
            //我的子弹运动
            var i:number = 0;
            var bullet:fighter.Bullet;
            var myBulletsCount:number = this.myBullets.length;
            for(;i < myBulletsCount;i++){
                bullet = this.myBullets[i];
                if(bullet.y < -bullet.height){
                    this.removeChild(bullet);
                    Bullet.reclaim(bullet,"b2_bng");
                    this.myBullets.splice(i,1);
                    i--;
                    myBulletsCount--;
                }
                bullet.y -= 12 * speedOffset;

            }
            //敌人飞机运动
            var theFighter:fighter.Airplane;
            var enemyFighterCount:number = this.enemyFighters.length;
            for(i = 0;i < enemyFighterCount;i++){
                theFighter = this.enemyFighters[i];
                if(this.stage.stageWidth&&theFighter.x>this.stage.stageWidth){
                    this.removeChild(theFighter);
                    Airplane.reclaim(theFighter);
                    theFighter.removeEventListener("createBullet",this.createBulletHandler,this);
                    theFighter.stopFire();
                    this.enemyFighters.splice(i,1);
                    i--;
                    enemyFighterCount--;
                }
                theFighter.x += 4 * speedOffset;

            }
            //敌人子弹运动
            var enemyBulletsCount:number = this.enemyBullets.length;
            for(i = 0;i < enemyBulletsCount;i++){
                bullet = this.enemyBullets[i];
                if(bullet.y>this.stage.stageHeight){
                    this.removeChild(bullet);
                    Bullet.reclaim(bullet,"b3_bng");
                    this.enemyBullets.splice(i,1);
                    i--;
                    enemyBulletsCount--;//数组长度已经改变
                }

                bullet.y += 8 * speedOffset;

            }
            this.gameHitTest();
         }

		 private touchHandler(evt:egret.Event):void{
             evt.target == this.myFighter;
             evt.target.touchEnabled = true;
             evt.target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
             evt.target.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
             
         }

         private mouseDown(evt: egret.TouchEvent) {
             this._touchStatus = true;
             this._distance.x = evt.stageX - this.myFighter.x;
             this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
         }

         private mouseMove(evt: egret.TouchEvent) {
             if (this._touchStatus) {
                 this.myFighter.x = evt.stageX - this._distance.x;
             }
         }

         private mouseUp(evt: egret.TouchEvent) {
             this._touchStatus = false;
             this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
         }

		 private gameHitTest():void {
            var i:number,j:number;
            var bullet:fighter.Bullet;
            var theFighter:fighter.Airplane;
            var myBulletsCount:number = this.myBullets.length;
            var enemyFighterCount:number = this.enemyFighters.length;
            var enemyBulletsCount:number = this.enemyBullets.length;
            //将需消失的子弹和飞机记录
            var delBullets:fighter.Bullet[] = [];
            var delFighters:fighter.Airplane[] = [];
            //我的子弹可以消灭敌机
            for(i=0;i<myBulletsCount;i++) {
                bullet = this.myBullets[i];
                for(j=0;j<enemyFighterCount;j++) {
                    theFighter = this.enemyFighters[j];
                    if(fighter.GameUtil.hitTest(theFighter,bullet)) {
                        theFighter.blood -= 2;
                        if(delBullets.indexOf(bullet)==-1)
                            delBullets.push(bullet);
                        if(theFighter.blood<=0 && delFighters.indexOf(theFighter)==-1)
                            delFighters.push(theFighter);
                    }
                }
            }
            //敌人的子弹可以减我血
            for(i=0;i<enemyBulletsCount;i++) {
                bullet = this.enemyBullets[i];
                if(fighter.GameUtil.hitTest(this.myFighter,bullet)) {
                    this.myFighter.blood -= 2;
                    if(delBullets.indexOf(bullet)==-1)
                        delBullets.push(bullet);
                }
            }
            if(this.myFighter.blood<=0) {
                this.gameStop();
            } else {
                while(delBullets.length>0) {
                    bullet = delBullets.pop();
                    this.removeChild(bullet);
                    if(bullet.textureName=="b2_png")
                        this.myBullets.splice(this.myBullets.indexOf(bullet),1);
                    else
                        this.enemyBullets.splice(this.enemyBullets.indexOf(bullet),1);
                    fighter.Bullet.reclaim(bullet,bullet.textureName);
                }
                this.myScore += delFighters.length;
                while(delFighters.length>0) {
                    theFighter = delFighters.pop();
                    theFighter.stopFire();
                    theFighter.removeEventListener("createBullet",this.createBulletHandler,this);
                    this.removeChild(theFighter);
                    this.enemyFighters.splice(this.enemyFighters.indexOf(theFighter),1);
                    fighter.Airplane.reclaim(theFighter);
                }
            }
        }

		 private gameStop():void{
			 this.bg.pause();
			 this.removeEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
             this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
			 this.myFighter.stopFire();
			 this.myFighter.removeEventListener("createBullet",this.createBulletHandler,this);
			 this.enemyFightersTimer.removeEventListener(egret.TimerEvent.TIMER,this.createEnemyFighter,this);
			 this.enemyFightersTimer.stop();
			 //清理子弹
			 var i:number = 0;
			 var bullet:fighter.Bullet;
			 while(this.myBullets.length>0) {
				 bullet = this.myBullets.pop();
				 this.removeChild(bullet);
				 fighter.Bullet.reclaim(bullet,bullet.textureName);
			}
			while(this.enemyBullets.length>0) {
				 bullet = this.enemyBullets.pop();
				 this.removeChild(bullet);
				 fighter.Bullet.reclaim(bullet,bullet.textureName);
			}
			//清理飞机
			var theFighter:fighter.Airplane;
			while(this.enemyFighters.length>0) {
				theFighter = this.enemyFighters.pop();
				theFighter.stopFire();
				theFighter.removeEventListener("createBullet",this.createBulletHandler,this);
				this.removeChild(theFighter);
				fighter.Airplane.reclaim(theFighter);
			}
			//显示成绩
			this.scorePanel.showScore(this.myScore);
			this.scorePanel.x = (this.stageW-this.scorePanel.width)/2;
			this.scorePanel.y = 100;
			this.addChild(this.scorePanel);
		 }
	 }
}