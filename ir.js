  /*module.exports = function(RED){
  //var GrovePiBoard = require('node-grovepi');

  function GrovePiDigitalSensorNode(n){
    RED.nodes.createNode(this,n);
    this.pin = n.pin;
    if(RED.settings.verbose){this.log("Digital Sensor:Pin: "+this.pin);}

    var node = this;

    node.status({fill:"green",shape:"dot",text:"ok"});
    this.on('input',function(msg_input){
      if(msg_input === 0){
        msg = "true";
      }else{
        msg = "false";
      }
      this.send(msg);
    });
  }
  RED.nodes.registerType('inf-sensor',GrovePiDigitalSensorNode);
}
*/
module.exports = function(RED){
  function GrovePiDigitalSensorNode(config){
    RED.nodes.createNode(this,config);
    var node = this;


    this.status({fill:"red",shape:"ring",text:"disconnected"});

    this.on('input',function(msg_input){
      var Grovepi = require('node-grovepi').GrovePi;
      var Digital = GrovePi.sensors.base.Digital;
      var digital = new Digital(this.pin);
      var board = new Board({
        debug: true,
        onError: function(err){
          console.error('GrovePiBoard.js: Something went wrong');
          console.error(err);
        },
      });

      board.pinMode(this.pin,'input');

      if(msg_input === 0){
        msg = "true";
      }else{
        msg = "false";
      }
      this.send(msg);
    });

    if(this.pin !== undefined){
      this.running = true;
      this.status({fill:"green",shape:"dot",text:"ok"});

      this.on("input",inputlistener);
    }
    else{this.warn("Invalid port: " + this.pin); }
      this.on("close",function(done){
        this.sstatus({fill:"grey",shape:"ring",text:"closed"});
        this.sensor(function(){
          done();
        });
      });


  }
  RED.nodes.registerType("inf-sensor",GrovePiDigitalSensorNode);
}



/*module.exports = funciton(RED){
    function GrovePiDigitalSensorNode(n){
    RED.nodes.createNode(this,n);
    this.pin = n.pin;
    this.sensor = n.sensor;
    var node = this;
    var Grovepi = require('node-grovepi').GrovePi;

    var digital = new Digital(node.pin);
    board.pinMode(node.pin,'input');

  this.on('input',function(msg_input){
    if(msg_input === 0){
      msg = "true";
  } else {
    msg = "false";
  }
  this.send(msg);
});
}
RED.nodes.registerType("inf-sensor",GrovePiDigitalSensorNode);

}
*/
