window.onload=function(){
  (function() {
    var canvas_id = 'canv';
    var text = 'Happy, Halloween 2015';
    var text_space = 30;

    var SPRITE_NUM = 15;
    var sprite_files = [
      {
        name: 'pumpmon',
        path: 'img/pumpmon/pump_inkscape_sprite_2688_124_plane.svg',
        frame_width: 128,
        frame_height: 124
      },
      {
        name: 'bakemon',
        path: 'img/bakemon/bake_inkscape_spritesheet_368_128_plane.svg',
        frame_width: 128,
        frame_height: 128
      },
      {
        name: 'picodebimon',
        path: 'img/picodebimon/picodebimon_inkscape_spritesheet_896_128_plane.svg',
        frame_width: 128,
        frame_height: 128
      }
    ];
    var ALPHA_MAX = 0.70;
    var ALPHA_MIN = 0.35;

    var canvas = document.getElementById(canvas_id);
    var canvas_w = canvas.width;
    var canvas_h = canvas.height;
    var stage = new createjs.Stage(canvas);

  // 1文字アニメ-ション http://www.hos.co.jp/blog/20131002/
  var text_container = new createjs.Container();
  for (var i = 0, width = 0; i < text.length; i++) {
      var t = new createjs.Text(text[i], "Bold 3rem Roboto", "hsl(0, 0%, 95%)");

      // サイズ
      t.scaleX = 0;
      t.scaleY = 0;

      // 直前の文字の横に描画
      var t_w = t.getMeasuredWidth();
      var t_h =  t.getMeasuredHeight();
      t.regX = t_w/2;
      t.regY = t_h/2;
      t.x = width /2;
      //t.y = t_h/2;
      text_container.addChild(t);
      width += t_w + text_space;
    }

    var bounds = text_container.getBounds();
    text_container.regX = bounds.width/2;
    text_container.regY = bounds.height/2;
    text_container.x = canvas_w/2;
    text_container.y = canvas_h/6;
  stage.addChild(text_container);

  // テキストの scaleX と scaleY を 0 → 1 へ
  new createjs.Tween(text_container.getChildAt(0))
    .to({scaleX:1,scaleY:1}, getRandom(200, 600), createjs.Ease.circOut)
    .call(textAnime, [text_container, 1]);

function textAnime(text, i){
  if(!text.getChildAt(i)){
    //sprite
    createSprite(SPRITE_NUM);
    return false;
  }
  new createjs.Tween(text.getChildAt(i))
    .to({scaleX:1,scaleY:1}, getRandom(100, 400), createjs.Ease.circOut)
    .call(textAnime, [text_container, ++i]);
}

createjs.Ticker.setFPS(30);
// Stage を渡すと Stage.update が呼ばれる
createjs.Ticker.addEventListener("tick", stage);

  // functions
  function getEasingRandomly(){
    var easings = [createjs.Ease.circOut];
    var easing = easings[Math.floor(Math.radom() * easings.length)];
    return easing;
  }
  function getRandom(min, max){
    return Math.floor(Math.random() * (max - min)  + min );
  }

  function createSprite(num){
    for(var i = 0; i < num; i++){
      var sprite_file = sprite_files[Math.floor(Math.random() * sprite_files.length)];
      var sprite;
      switch(sprite_file.name){
        case 'pumpmon':
          sprite = createPumpmonSprite(sprite_file.path, sprite_file.frame_width, sprite_file.frame_height);
          gotoAndPlayTime(sprite, 'shake', 200, 1500);
          setSprite(sprite);
          break;

        case 'bakemon':
          sprite = createBakemonSprite(sprite_file.path, sprite_file.frame_width, sprite_file.frame_height);
          gotoAndPlayTime(sprite, 'shake', 200, 1500);
          setSprite(sprite);
          break;

          case 'picodebimon':
            sprite = createBakemonSprite(sprite_file.path, sprite_file.frame_width, sprite_file.frame_height);
            gotoAndPlayTime(sprite, 'fly', 200, 1500);
            setSprite(sprite);
            break;
      }
    }

    function setSprite(sprite){
      sprite.alpha = 0;
      sprite.x = getRandom(sprite_file.frame_width/2, canvas_w - sprite_file.frame_width/2);
      sprite.y = getRandom(text_container.y + 50 + sprite_file.frame_height/2, canvas_h - sprite_file.frame_height/2);
      stage.addChild(sprite);

      var toAlpha = getRandom(ALPHA_MIN*100, ALPHA_MAX*100) / 100;
      // 出現アニメ
      new createjs.Tween(sprite)
        .to({alpha:  toAlpha}, getRandom(1000, 3000), createjs.Ease.circOut)
    }
    function gotoAndPlayTime(sprite, animation_name, min_ms, max_ms){
      setTimeout(function(){
        sprite.gotoAndPlay(animation_name);
      }, getRandom(min_ms, max_ms));
    }
  }

  function createPumpmonSprite(file, frame_width, frame_height) {
    /*doc: http://createjs.com/docs/easeljs/classes/SpriteSheet.html*/
    var data = {
      images: [file],
      frames: {
        width: frame_width,
        height: frame_height,
        regX: frame_width/2,
        regY: frame_height/2
      },
      animations: {
      //animation_name
        shake: {
          frames: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
            3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
            4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4,
            5, 5, 5, 5, 5, 5, 5, 5, 5,
            6, 6, 6, 6, 6, 6, 6, 6, 6,
            7, 7, 7, 7, 7, 7, 7, 7,
            8, 8, 8, 8, 8, 8, 8, 8
          ],
          next: 'shake_left',
          speed: 2.3
        },
        shake_left:{
          frames: [
            9, 9, 9, 9, 9, 9, 9,
            10, 10, 10, 10, 10, 10,
            11, 11, 11, 11, 11,
            12, 12, 12, 12,
            13, 13, 13,
            14, 14,
            15, 15,
            16, 16, 16,
            17, 17,  17,  17,
            18, 18, 18, 18, 18,
            19, 19, 19, 19, 19, 19,
            20, 20, 20, 20, 20, 20, 20
          ],
          next: 'shake_right',
          speed: 2
        },
        shake_right:{
          frames: [
            20, 20, 20, 20, 20, 20, 20,
            19, 19, 19, 19, 19, 19,
            18, 18, 18, 18, 18,
            17, 17,  17,  17,
            16, 16, 16,
            15, 15,
            14, 14,
            13, 13, 13,
            12, 12, 12, 12,
            11, 11, 11, 11, 11,
            10, 10, 10, 10, 10, 10,
            9, 9, 9, 9, 9, 9, 9,
          ],
          next: 'shake_left',
          speed: 2
        },
      },
      framerate: 30
    };

    // spriteインスタンス
    var mySpriteSheet = new createjs.SpriteSheet(data);
    // Bitmapインスタンス
    // var mySprite = new createjs.BitmapAnimation(mySpriteSheet);
    var mySprite = new createjs.Sprite(mySpriteSheet);
    //console.log(mySprite);
    return mySprite;
  }

  function createBakemonSprite(file, frame_width, frame_height) {
    var data = {
      images: [file],
      frames: {
        width: frame_width,
        height: frame_height,
        regX: frame_width/2,
        regY: frame_height/2
      },
      animations: {
      //animation_name
        shake: {
          frames: [
            0, 0, 0
          ],
          next: 'shake_left',
          speed: 0.7
        },
        shake_left:{
          frames: [
            0, 0, 1, 1, 1
          ],
          next: 'shake_right',
          speed: 0.7
        },
        shake_right:{
          frames: [
            0, 0, 2, 2, 2
          ],
          next: 'shake_left',
          speed: 0.7
        },
      },
      framerate: 30
    };

    // spriteインスタンス
    var mySpriteSheet = new createjs.SpriteSheet(data);
    // Bitmapインスタンス
    var mySprite = new createjs.Sprite(mySpriteSheet);
    return mySprite;
  }

  function createPicodebimonSprite(file, frame_width, frame_height) {
    var data = {
      images: [file],
      frames: {
        width: frame_width,
        height: frame_height,
        regX: frame_width/2,
        regY: frame_height/2
      },
      animations: {
      //animation_name
        fly: {
          frames: [
            0, 0, 0, 0, 0, 0, 0
          ],
          next: 'fly_down',
          speed: 1
        },
        fly_down:{
          frames: [
            0, 0, 0, 0, 0, 0,
            1, 1, 1, 1, 1,
            2, 2, 2, 2,
            3, 3, 3,
            4, 4, 4, 4,
            5, 5, 5, 5, 5,
            6, 6, 6, 6, 6, 6
          ],
          next: 'fly_up',
          speed: 0.001
        },
        fly_up:{
          frames: [
            6, 6, 6, 6, 6, 6,
            5, 5, 5, 5, 5,
            4, 4, 4, 4,
            3, 3, 3,
            2, 2, 2, 2,
            1, 1, 1, 1, 1,
            0, 0, 0, 0, 0, 0
          ],
          next: 'fly_down',
          speed: 0.001
        },
      },
      framerate: 30
    };

    // spriteインスタンス
    var mySpriteSheet = new createjs.SpriteSheet(data);
    // Bitmapインスタンス
    var mySprite = new createjs.Sprite(mySpriteSheet);
    return mySprite;
  }

  })();
};
