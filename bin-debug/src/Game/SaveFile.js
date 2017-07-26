var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SaveFile = (function (_super) {
    __extends(SaveFile, _super);
    function SaveFile() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/SaveFile.exml";
        _this.menu.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.returnMenu, _this);
        return _this;
    }
    SaveFile.Shared = function () {
        if (SaveFile.shared == null) {
            SaveFile.shared = new SaveFile();
        }
        return SaveFile.shared;
    };
    SaveFile.prototype.switchSave = function () {
        this.file1.switchToSave();
        this.file2.switchToSave();
        this.file3.switchToSave();
        this.file4.switchToSave();
        this.title.text = "存档";
    };
    SaveFile.prototype.switchRead = function () {
        this.file1.switchToRead();
        this.file2.switchToRead();
        this.file3.switchToRead();
        this.file4.switchToRead();
        this.title.text = "读档";
    };
    SaveFile.prototype.returnMenu = function () {
        if (!this.parent.contains(SceneBlock.Shared()))
            this.parent.addChild(SceneBlock.Shared());
        SoundMenager.Shared().PlayClick();
        this.parent.removeChild(this);
    };
    return SaveFile;
}(eui.Component));
__reflect(SaveFile.prototype, "SaveFile");
//# sourceMappingURL=SaveFile.js.map