<html>
  <head>
    <script src="js/aframe.min.js"></script>
    <!-- <script src="https://aframe.io/releases/0.7.0/aframe.min.js"></script>-->
    <script src="js/audioAnalysis.js?a=<?php echo rand()?>"></script>
    <script src="js/videoRendering.js?a=<?php echo rand()?>"></script>
    <script src="js/controller.js?a=<?php echo rand()?>"></script>
    <script src="js/functions.js?a=<?php echo rand()?>"></script>
    <title>VR music</title>
  </head>
  <body>
    <a-scene id="scene">
     
      <a-assets>
        <img id="sky" src="City.jpg">
        </a-assets>
        <a-assets>
        <img id="backgroundDisco" src="Galaxy2.jpg">
        </a-assets>
        
        <a-assets>
        <img id="backgroundDisco2" src="bruno.jpg">
        </a-assets>
        <a-sky src="#sky"></a-sky>
      <!--<a-entity light="type:directional, color:#fff" position="0 1.6 0"></a-light>-->
      <!--<a-cylinder id="cylinder" color="#ff0000" position="0 0 -4"><a-cylinder>-->
       <a-entity id="parent" position="+0.5 5 2">
        <a-text class="SongTitle" value="Hello, World!"></a-text>
          </a-entity>
          <a-entity id="parent" position="-1 5 2">
        <a-image class="AlbumImage" src="https://vignette.wikia.nocookie.net/justdance/images/2/2b/Bruno_Mars_-_24K_Magic_%28Official_Album_Cover%29.png/revision/latest?cb=20170608175726" height="2" width="2"></a-image>
        </a-entity>
    </a-scene>
    <audio id="audio"></audio>
     
    <div style="position:fixed; bottom: 0px; height:50px; width:100%; background-color:#eee; display:block" id="playPause"><a-href onclick="C.playPause">Play</a></div>
  </body>
</html>