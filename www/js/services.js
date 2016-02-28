angular.module('app.services', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.service('userData', [function(){
	return {
		setId:function(id){
			this.id=id;
		},
		setOwing:function(owing){
			this.owing=owing;
		},
		setOwedFrom:function(owedfrom){
			this.owedfrom=owedfrom;
		},
		setAmount:function(amount){
			this.amount=amount;
		},
		setLocalStorage:function(localStorage){
			this.localStorage=localStorage;
		},
		saveToLocalStorage:function(data){
			if(data.localStorage) this.localStorage=data.localStorage;
			if(this.localStorage) this.localStorage.set(data.key,data.value);
		},
		loadFromLocalStorage:function(data){
			if(data.localStorage) this.localStorage=data.localStorage;
			if(this.localStorage) this.mydata = this.localStorage.get(data.key);
		}
	};
}]);

