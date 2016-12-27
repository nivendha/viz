var Dengine = class Dengine {
  constructor(id) {
    this.eventStore = {};
    this.id=id;
    var url = "ws://localhost:8080";
    var wsCtor = window['WebSocket'];
    this.socket = new wsCtor(url);
    this.socket.onmessage = this.register.bind(this);
    this.socket.onclose = this.delete.bind(this);
    this.socket.send(JSON.stringify({ msg: 'connect',data:this }));
  }
  register(id,_fn){
    this.eventStore[id]=_fn;
    this.socket.send(JSON.stringify({ msg: 'register',data:this }));
  }
  unregister(id){
    delete this.eventStore[id];
    this.socket.send(JSON.stringify({ msg: 'unregister',data:this }));
  }
  empty(){
    this.eventStore = {};
    this.socket.send(JSON.stringify({ msg: 'empty',data:this }));
  }
  delete(){
    this.empty();
    //clear client side memory
  }
}
