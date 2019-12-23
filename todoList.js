function TodoList(service){
	this.items = [];
	this._service = service;
	this._onChange = null;
	this._mode = 'all';
}

TodoList.prototype.getCurrentItems = function (){
	if (this._mode === 'all'){
		return this.items;
	} else if (this._mode === 'finished'){
		return this.items.filter(i => i.completed);
	} else if (this._mode === 'unfinished'){
		return this.items.filter(i => !i.completed);
	}
	return [];
}

TodoList.prototype.setMode = function(mode) {
	this._mode = mode;
	this._onChange();
}

TodoList.prototype.addItem = function (item){
	return this._service.create(item).then(r => {
		if (r.hasOwnProperty('error')){
			this._onError(r.error);
			return;
		}
		this.items.push(r);
		this._onChange();
	});
}

TodoList.prototype.removeItem = function (index){
	var item = this.items[index];
	this._service.delete(item["_id"]).then(r => {
		this.items.splice(index, 1);
		this._onChange();
	})
}

TodoList.prototype.updateItem = function (index, data){
	var item = this.items[index];
	this._service.update(item["_id"], data).then(r => {
		item.completed = data.completed;
		this._onChange();
	})
}

TodoList.prototype.init = function (items){
	this.items = items;
}

TodoList.prototype.subscribe = function (onChange, onError){
	this._onChange = onChange;
	this._onError = onError;
}
