module.exports = {
  balance: function balance(callback) {
    var call = "balance";
    this.sendRequest(call, this.vars, callback);
  },
  compile: function compile(csdl, callback){
    var call = "compile";
    var params = {
      csdl: csdl
    };
    this.sendRequest(call, params, callback);
  },
  dpu: function dpu(hash, callback){
    var call = "dpu";
    var params = {
      hash: hash
    };
    this.sendRequest(call, params, callback);
  },
  stream: function stream(hash, callback){
     console.log("hash-->"+hash);
    var call = "stream";
    var options = { hash: hash };
    this.sendRequest(call, options, callback);
  },
  usage: function usage(period, callback){
    var call = "usage";
    var params = {
      period: period
    };
    this.sendRequest(call, params, callback);
  },
  validate: function validate(csdl, callback){
    var call = "validate";
    var params = {
      csdl: csdl
    };
    this.sendRequest(call, params, callback);
  }
};