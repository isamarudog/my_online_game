var MYAPP = {};
MYAPP.classes = {};

MYAPP.map = {
	id: 0,
	name: 'test_map',
	bdm_path: '/sounds/test_map.mp3',
	size: {
		width: 10,
		height: 10
	},
	plain_model_path: '/models/plain/plain.dae'
};

MYAPP.user = {
	location: {
		map: 0,
		position: {
			width: 0,
			height: 0
		}
	}
};


/**
 * webglクラスのインスタンスを作成する
 * @class webglでの3DCGの表示を管理するクラス
 * @return {MYAPP.classes.webgl} webglクラスのインスタンス
 */
MYAPP.classes.webgl = function () {
    // instance
    var that = {};

    // singleton
    var instance = that;
    MYAPP.classes.webgl = function () {
        return instance;
    };

    // private
    var doc = new GLGE.Document(),
        scene,
        renderer,
        render_timer_id,
        distances,
        pitch = 0, // カメラの制御を行うための変数
        pitch_inc = 0.01, // カメラの制御を行うための変数
        i,
        length;

    /**
     * webglの描画を行うメソッド
     * @private
     */
    var render = function () {
        renderer.render();
    };

    // public
    /**
     * webglの描画を開始するメソッド
     */
    var render_start = function () {
        render_timer_id = setInterval(render, 1);
    };

    /**
     * webglの描画を停止するメソッド
     */
    var render_stop = function () {
        clearInterval(render_timer_id);
    };

    /**
     * {GLGE.Scene}gameScene.children配列のオブジェクトを再構成する
     * @param {Object} MYAPP.classes.soundSpace.objects 音空間にあるオブジェクトの配列
     */
    var set_scene_children = function (scene_objects_array) {
        var i;

        scene.children = [];
        for (i = 0; i < scene_objects_array.length; i += 1) {
            scene.children.push(scene_objects_array[i]);
        }
    };

    // webglの描画開始停止制御のメソッド
    that.render_start = render_start;
    that.render_stop = render_stop;

    // オブジェクトの管理
    that.set_scene_children = set_scene_children;

    renderer = new GLGE.Renderer($('#screen')[0]);
    camera = new GLGE.Camera('camera');
    scene = new GLGE.Scene(camera);
    // y軸を上にする
    scene.setUpAxis([0, 1, 0]);
    scene.setAmbientColor('#00FFFFFF');
    scene.setBackgroundColor('#7F99FFFF');
    scene.getCamera().setLoc(0, 0, 8);
    renderer.setScene(scene);
    render_start();


    // constructor
    that.constructor = MYAPP.classes.webgl;

    return that;
};

$(document).ready(function () {
	MYAPP.webgl = MYAPP.classes.webgl();

	// 新しいオブジェクトを作成
	var object = new GLGE.Collada();
	// オブジェクトのCGモデルを設定
	object.setDocument(MYAPP.map.plain_model);
	object.setLoc(0, 0, 0);
	MYAPP.webgl.set_scene_children([object]);
});


