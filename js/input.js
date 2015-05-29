var inputSetting = {
	pressedLeft: false,
	pressedRight: false,
	pressedJump: false
}

function takeInput () {	
   if(keyboard.pressed("A")) {
   	if(!inputSetting.pressedLeft) movePlayer.horizontal(-1);
   	inputSetting.pressedLeft = true; 
   }
   else inputSetting.pressedLeft = false;

   if(keyboard.pressed("D")) {
   	if(!inputSetting.pressedRight) movePlayer.horizontal(1);
   	inputSetting.pressedRight = true; 
   }
   else inputSetting.pressedRight = false;

   if(keyboard.pressed("space")) {
   	if(!inputSetting.pressedJump) movePlayer.jump();
   	inputSetting.pressedJump = true; 
   }
   else inputSetting.pressedJump = false;
}