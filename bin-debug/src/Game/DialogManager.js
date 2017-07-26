var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//每段对话的数据结构
var DialogueData = (function () {
    function DialogueData() {
    }
    return DialogueData;
}());
__reflect(DialogueData.prototype, "DialogueData");
//对话数据管理器
var DialogManager = (function () {
    function DialogManager() {
        //一个对话的保存数据组
        this.items = [];
        //使用RES读取和构建JSON数据，JSON数据可以直接解析到目标结构
        this.items = RES.getRes("dialogue_json");
    }
    DialogManager.Shared = function () {
        if (DialogManager.shared == null) {
            DialogManager.shared = new DialogManager();
        }
        return DialogManager.shared;
    };
    DialogManager.prototype.getDialogue = function (num) {
        if (num < 0)
            num = 0;
        //判断是否显示信件
        switch (num) {
            case 74:
                SceneBlock.Shared().info.visible = true;
                break;
            case 166:
                SceneBlock.Shared().info.visible = true;
                break;
            case 295:
                SceneBlock.Shared().info.visible = true;
                break;
            default: break;
        }
        if (num > 73)
            Letters.Shared().receiveLetter("mo1");
        if (num > 165)
            Letters.Shared().receiveLetter("si1");
        if (num > 294) {
            //只要存档里有超过294的存档就能读取到，这里是收集信件
            Letters.Shared().receiveLetter("liu1");
        }
        return this.items[num];
    };
    return DialogManager;
}());
__reflect(DialogManager.prototype, "DialogManager");
//# sourceMappingURL=DialogManager.js.map