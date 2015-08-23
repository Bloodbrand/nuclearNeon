require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        THREE: '../bower_components/threejs/build/three',
        models: 'models',
        settings: 'settings',
        gameManager: 'gameManager',
        shaders: 'shaders'
    },
    shim: {
        THREE:{
            exports: 'THREE'
        }
    }
});

require(['main'], function(main){
    console.log(main.Init())
})