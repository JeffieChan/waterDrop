var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.h = 360;
        _this.w = 640;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        //背景填充
        var ground = new egret.Shape();
        ground.graphics.beginFill(0xF2ECF0);
        ground.graphics.drawRect(0, 0, 1280, 720);
        ground.graphics.endFill();
        this.addChild(ground);
        //进度更新
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = this.h - 50;
        this.textField.x = this.w - 50;
        this.textField.width = 100;
        this.textField.height = 100;
        this.textField.textColor = 0x7A88AB;
        this.textField.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.textField.textAlign = egret.HorizontalAlign.CENTER;
        var title = new egret.TextField();
        this.addChild(title);
        title.y = 18;
        title.x = 32;
        title.verticalAlign = egret.VerticalAlign.MIDDLE;
        title.textColor = 0x6F8286;
        title.size = 46;
        title.bold = true;
        title.textFlow = [
            { text: "雨", style: { "size": 46 } },
            { text: "滴", style: { "size": 30 } },
            { text: "石", style: { "size": 50 } },
            { text: "阶", style: { "size": 36 } }
        ];
        this.createSunMoon();
        this.createTween();
    };
    LoadingUI.prototype.setProgress = function (current, total) {
        this.addChild(this.getSectorProgress());
        this.textField.text = current + "/" + total;
    };
    LoadingUI.prototype.getSectorProgress = function () {
        var shape = new egret.Shape();
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
    };
    LoadingUI.prototype.createSunMoon = function () {
        //画个太阳
        this.sun = new egret.Shape();
        this.sun.graphics.beginFill(0xF371B1);
        this.sun.graphics.drawCircle(640, 720, 80);
        this.sun.graphics.endFill();
        this.addChild(this.sun);
        //画光芒
        this.lights = new Array();
        for (var i = 0; i < 12; i++) {
            var dot = this.circlexy(640, 340, 110, 30 * i);
            var light = new egret.Shape();
            light.graphics.lineStyle(5, 0xF3A0CA);
            light.graphics.moveTo(dot.x, dot.y);
            dot = this.circlexy(640, 340, 120, 30 * i);
            light.graphics.lineTo(dot.x, dot.y);
            light.graphics.endFill();
            this.lights.push(light);
            this.addChild(this.lights[i]);
            this.lights[i].visible = false;
        }
        //画月亮
        //    this.moon=new egret.Sprite();
        this.moon1 = new egret.Shape();
        this.moon1.graphics.beginFill(0x5E485D);
        this.moon1.graphics.drawArc(640, 830, 100, -Math.PI / 2, Math.PI / 2, true);
        this.moon1.graphics.endFill();
        //    this.moon.addChild(moon1);
        this.moon2 = new egret.Shape();
        this.moon2.graphics.beginFill(0xF2ECF0);
        this.moon2.graphics.drawArc(700, 830, 110, -Math.PI / 2, Math.PI / 2, true);
        this.moon2.graphics.endFill();
        //    this.addChild(this.moon);
        //    this.moon.visible=false;
        this.addChild(this.moon1);
        this.addChild(this.moon2);
        //画星星
        this.stars = new Array();
        for (var i = 0; i < 12; i++) {
            var x = Math.random() * 1080 + 100;
            var y = Math.random() * 200 + 50;
            var star = new egret.Shape();
            star.graphics.beginFill(0x898A9F);
            star.graphics.drawCircle(x, y, 8);
            star.graphics.endFill();
            this.stars.push(star);
        }
    };
    LoadingUI.prototype.createTween = function () {
        var _this = this;
        egret.Tween.get(this.sun).to({ x: 0, y: -380 }, 1000, egret.Ease.sineOut).call(function () {
            egret.Tween.get(_this.lights[0]).set({ visible: true }, 300).wait(300).call(function () {
                egret.Tween.get(_this.lights[1]).wait(300).set({ visible: true }).call(function () {
                    egret.Tween.get(_this.lights[2]).wait(300).set({ visible: true }).call(function () {
                        egret.Tween.get(_this.lights[3]).wait(300).set({ visible: true }).call(function () {
                            egret.Tween.get(_this.lights[4]).wait(300).set({ visible: true }).call(function () {
                                egret.Tween.get(_this.lights[5]).wait(300).set({ visible: true }).call(function () {
                                    egret.Tween.get(_this.lights[6]).wait(300).set({ visible: true }).call(function () {
                                        egret.Tween.get(_this.lights[7]).wait(300).set({ visible: true }).call(function () {
                                            egret.Tween.get(_this.lights[8]).wait(300).set({ visible: true }).call(function () {
                                                egret.Tween.get(_this.lights[9]).wait(300).set({ visible: true }).call(function () {
                                                    egret.Tween.get(_this.lights[10]).wait(300).set({ visible: true }).call(function () {
                                                        egret.Tween.get(_this.lights[11]).wait(300).set({ visible: true }).wait(1000).call(function () {
                                                            for (var i = 0; i < 12; i++) {
                                                                _this.lights[i].visible = false;
                                                            }
                                                            egret.Tween.get(_this.sun).to({ x: 0, y: 380 }, 1000, egret.Ease.sineIn).wait(500).call(function () {
                                                                for (var i = 0; i < 12; i++) {
                                                                    _this.addChild(_this.stars[i]);
                                                                }
                                                                egret.Tween.get(_this.moon2).to({ x: 0, y: -500 }, 1000, egret.Ease.sineOut);
                                                                egret.Tween.get(_this.moon1).to({ x: 0, y: -500 }, 1000, egret.Ease.sineOut).wait(1500).call(function () {
                                                                    egret.Tween.get(_this.moon2).to({ x: 0, y: 500 }, 1000, egret.Ease.sineIn);
                                                                    egret.Tween.get(_this.moon1).to({ x: 0, y: 500 }, 1000, egret.Ease.sineIn).call(function () {
                                                                        for (var i = 0; i < 12; i++) {
                                                                            _this.removeChild(_this.stars[i]);
                                                                        }
                                                                        _this.createTween();
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
            });
        });
    };
    //根据圆心坐标a,b和半径还有度数angle 求圆的横坐标和纵坐标
    LoadingUI.prototype.circlexy = function (a, b, r, angle) {
        var dot = new Dot();
        dot.x = a + Math.sin(2 * Math.PI / 360 * angle) * r;
        dot.y = b + Math.cos(2 * Math.PI / 360 * angle) * r;
        return dot;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI");
var Dot = (function () {
    function Dot() {
    }
    return Dot;
}());
__reflect(Dot.prototype, "Dot");
//# sourceMappingURL=LoadingUI.js.map