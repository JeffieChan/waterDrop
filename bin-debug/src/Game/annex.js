var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var annex = (function (_super) {
    __extends(annex, _super);
    function annex() {
        return _super.call(this) || this;
    }
    annex.Shared = function () {
        if (annex.shared == null) {
            console.log("创建annex对象");
            annex.shared = new annex();
        }
        return annex.shared;
    };
    annex.prototype.addTexture = function (text) {
        //获取纹理
        var texture = RES.getRes(text + "_png");
        //获取配置
        var config = RES.getRes(text + "_json");
        //创建 GravityParticleSystem
        this.system = new particle.GravityParticleSystem(texture, config);
        //启动粒子库
        this.system.start();
        //将例子系统添加到舞台
        this.addChild(this.system);
    };
    annex.prototype.removeTexturn = function () {
        this.removeChild(this.system);
    };
    return annex;
}(eui.Component));
__reflect(annex.prototype, "annex");
//# sourceMappingURL=annex.js.map