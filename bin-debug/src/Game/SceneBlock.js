var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SceneBlock = (function (_super) {
    __extends(SceneBlock, _super);
    function SceneBlock() {
        var _this = _super.call(this) || this;
        _this.texturestring = null;
        _this.skinName = "resource/eui_skins/SceneBlock.exml";
        _this.touchRect.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_next, _this);
        _this.aside.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.hidaside, _this);
        _this.menu.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.toMenu, _this);
        _this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_setting, _this);
        _this.dialogIndex = 0;
        _this.InitScene(0);
        //开始播放背景音乐
        SoundMenager.Shared().PlayBGM();
        return _this;
    }
    SceneBlock.Shared = function () {
        if (SceneBlock.shared == null) {
            console.log("创建SceneBlock对象");
            SceneBlock.shared = new SceneBlock();
        }
        return SceneBlock.shared;
    };
    SceneBlock.prototype.onclick_setting = function () {
        SoundMenager.Shared().PlayClick();
        this.addChild(GameSetting.Shared());
    };
    SceneBlock.prototype.toMenu = function () {
        this.addChild(Menu.Shared());
    };
    SceneBlock.prototype.InitScene = function (num) {
        console.log("加载" + num + "段对话");
        this.dialogbox.init();
        this.aside.visible = false;
        this.figure.visible = false;
        this.dialogbox.visible = false;
        this.dialogbox.disselect();
        this.dialogIndex = num;
        this.dialogdata = DialogManager.Shared().getDialogue(num);
        //初始化背景图
        var sc = this.dialogdata.scene;
        if (this.isExit(sc))
            this.scene.source = sc;
        var as = this.dialogdata.aside;
        //判断是否添加纹理
        var texture = this.dialogdata.texture;
        if (this.isExit(texture)) {
            if (!this.texturestring)
                this.ann.addTexture(texture);
            else if (texture != this.texturestring) {
                this.ann.removeTexturn();
                this.ann.addTexture(texture);
            }
            this.texturestring = texture;
        }
        else {
            if (this.texturestring) {
                this.ann.removeTexturn();
                this.texturestring = null;
            }
        }
        //加载旁白
        if (this.isExit(as)) {
            this.touchRect.visible = false;
            this.aside.visible = true;
            this.aside.setAside(as);
        }
        else {
            this.touchRect.visible = true;
            this.loadingScene();
        }
    };
    //加载人物和对话内容
    SceneBlock.prototype.loadingScene = function () {
        this.dialogbox.visible = true;
        this.figure.visible = true;
        this.figure.source = this.dialogdata.figure;
        var selectnum = this.dialogdata.select.length;
        if (!selectnum) {
            this.setIndex(0);
            this.setAdd();
            this.dialogbox.setNameText(this.dialogdata.name);
            this.dialogbox.setDialogText(this.dialogdata.content[0]);
        }
        else {
            this.dialogbox.setSelection(this.dialogdata);
        }
    };
    // private getTexture(text){
    // 		//获取纹理
    // 		var texture = RES.getRes(text+"_png");
    // 		//获取配置
    // 		var config = RES.getRes(text+"_json");
    // 		//创建 GravityParticleSystem
    // 		this.system = new particle.GravityParticleSystem(texture, config);
    // 		//启动粒子库
    // 		this.system.start();
    // 		//将例子系统添加到舞台
    // 		this.addChildAt(this.system,1);
    // 		// var spr:egret.Sprite=new egret.Sprite();
    // 		// spr.graphics.beginFill(0x00ff00);
    // 		// spr.graphics.drawRect(100,100,200,200);
    //         // spr.graphics.endFill();
    // 		// this.addChildAt(spr,2 );
    // }
    SceneBlock.prototype.onclick_next = function () {
        SoundMenager.Shared().PlayClick();
        if (this.dialogbox.offselection) {
            this.InitScene(this.dialogIndex + 1);
            //存下当下对话索引号，以便存档
            egret.localStorage.setItem("dialogIndex", this.dialogIndex.toString());
        }
    };
    //隐藏旁白框
    SceneBlock.prototype.hidaside = function () {
        SoundMenager.Shared().PlayClick();
        this.touchRect.visible = true;
        this.aside.visible = false;
        this.loadingScene();
    };
    //判断是否存在
    SceneBlock.prototype.isExit = function (sc) {
        if (sc == undefined || sc == null || sc.length == 0)
            return false;
        else
            return true;
    };
    //设置下一次对话的编号（注意减一）
    SceneBlock.prototype.setIndex = function (index) {
        var next = this.dialogdata.next;
        if (this.isExit(next)) {
            // console.log("存在下一次对话");
            var next_num = parseInt(next[index]) - 1;
            this.dialogIndex = next_num;
            if (next_num < 0) {
                this.parent.addChild(GameOver.Shared());
                this.parent.removeChild(this);
                GameOver.Shared().modifyTabel(next_num + 1);
            }
        }
    };
    //属性加成
    SceneBlock.prototype.setAdd = function () {
        var add = this.dialogdata.add;
        if (this.isExit(add)) {
            var a = [];
            a = add[0].split("-");
            console.log(add);
            AtrributeManager.Share().addAtrr(a[0], a[1]);
        }
    };
    return SceneBlock;
}(eui.Component));
__reflect(SceneBlock.prototype, "SceneBlock");
//# sourceMappingURL=SceneBlock.js.map