class SceneBegin extends eui.Component {
    private static shared: SceneBegin;

    public static Shared() {  
        if(SceneBegin.shared == null) {
            SceneBegin.shared = new SceneBegin();
        }
        return SceneBegin.shared;
    }
    private btn_begin:eui.Button;
    private continue:eui.Button;
    private littlegame:eui.Button;
    public constructor() {
          super();
          this.skinName = "resource/eui_skins/SceneBeginSkin.exml";
          this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_begin,this);   
          this.continue.addEventListener(egret.TouchEvent.TOUCH_TAP,this.continueGame,this);
          this.littlegame.addEventListener(egret.TouchEvent.TOUCH_TAP,this.litterGame,this);

          egret.Tween.removeAllTweens();
 }
 private onclick_begin(){ 
        SoundMenager.Shared().PlayClick();   
        this.parent.addChild(new Cartoon());
        this.parent.removeChild(this);
}
private continueGame(){
        SoundMenager.Shared().PlayClick();  
        SaveFile.Shared().switchRead(); 
        this.parent.addChild(SaveFile.Shared());
        this.parent.removeChild(this);
}
private litterGame(){
      var gameContainer:fighter.GameContainer = new fighter.GameContainer();
      this.parent.addChild(gameContainer);
      this.parent.removeChild(this);
}

}