var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dialog = (function (_super) {
    __extends(Dialog, _super);
    function Dialog() {
        var _this = _super.call(this) || this;
        _this.offselection = true;
        return _this;
    }
    Dialog.prototype.setNameText = function (value) {
        this.dialogbox.visible = true;
        this.person.text = value;
    };
    Dialog.prototype.getNameText = function () {
        return this.person.text;
    };
    Dialog.prototype.setDialogText = function (value) {
        this.dialog.text = value;
    };
    Dialog.prototype.getDialogText = function () {
        return this.dialog.text;
    };
    //设置选择框
    Dialog.prototype.setSelection = function (dialogdata) {
        this.offselection = false;
        this.dialogbox.visible = false;
        this.dialogdata = dialogdata;
        var selectnum = this.dialogdata.select.length;
        if (selectnum > 0) {
            this.select1.visible = true;
            this.selection1.text = this.dialogdata.select[0];
            this.selection1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.s1, this);
            if (selectnum > 1) {
                this.select2.visible = true;
                this.selection2.text = this.dialogdata.select[1];
                this.selection2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.s2, this);
                if (selectnum > 2) {
                    this.select3.visible = true;
                    this.selection3.text = this.dialogdata.select[2];
                    this.selection3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.s3, this);
                }
            }
        }
    };
    Dialog.prototype.selected = function (name, content, attr, num) {
        this.offselection = true;
        var a = [];
        this.disselect();
        this.setNameText(name);
        this.setDialogText(content);
        a = attr.split("-");
        if (a[0] > 0)
            AtrributeManager.Share().addAtrr(a[0], a[1]);
        if (num != undefined) {
            SceneBlock.Shared().setIndex(num);
        }
    };
    Dialog.prototype.s1 = function () {
        this.selected(this.dialogdata.name, this.dialogdata.content[0], this.dialogdata.add[0], 0);
    };
    Dialog.prototype.s2 = function () {
        this.selected(this.dialogdata.name, this.dialogdata.content[1], this.dialogdata.add[1], 1);
    };
    Dialog.prototype.s3 = function () {
        this.selected(this.dialogdata.name, this.dialogdata.content[2], this.dialogdata.add[2], 2);
    };
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
    Dialog.prototype.disselect = function () {
        this.selection1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.s1, this);
        this.selection2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.s2, this);
        this.selection3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.s3, this);
        this.select3.visible = false;
        this.select1.visible = false;
        this.select2.visible = false;
    };
    Dialog.prototype.init = function () {
        this.offselection = true;
    };
    return Dialog;
}(eui.Component));
__reflect(Dialog.prototype, "Dialog");
//# sourceMappingURL=Dialog.js.map