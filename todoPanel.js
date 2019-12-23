function TodoPanel(el){
	this.element = el;
	this._api = new TodoApi();
	this.todoList = new TodoList(this._api);
	this.todoList.subscribe(() => this._onChange(), error => alert(error));
	this.init();
	
}

TodoPanel.prototype.init = function (){
	this._api.read().then((items) =>{
		this.todoList.init(items)
		this.render();
	});
}

TodoPanel.prototype._onChange = function(){
	this.element.removeChild(this.element.lastChild);
	this.element.appendChild(this._renderList());
};

TodoPanel.prototype.addItem = function (value){
	if (!value) return;
	this.todoList.addItem({
		text: value
	})
}

TodoPanel.prototype.showFinished = function (){
	this.todoList.setMode('finished');
}

TodoPanel.prototype.showUnfinished = function (){
	this.todoList.setMode('unfinished');
}

TodoPanel.prototype.showAll = function (){
	this.todoList.setMode('all');
}

TodoPanel.prototype.switchState = function(index, item) {
	this.todoList.updateItem(index, {
		completed: !item.completed
	});
}

TodoPanel.prototype.deleteItem = function(index) {
	this.todoList.removeItem(index);
}

TodoPanel.prototype.render = function (){
	var controls = this._renderControls();
	var list = this._renderList();
	this.element.appendChild(controls);
	this.element.appendChild(list);
}

TodoPanel.prototype._renderControls = function (){
	var div1 = document.createElement('div');
	var finished = document.createElement('button');
	finished.innerHTML = "finished";
	finished.addEventListener('click', () => this.showFinished());
	var unfinished = document.createElement('button');
	unfinished.innerHTML = "unfinished";
	unfinished.addEventListener('click', () => this.showUnfinished());
	var all = document.createElement('button');
	all.innerHTML = "all";
	all.addEventListener('click', () => this.showAll());
	div1.appendChild(finished);
	div1.appendChild(unfinished);
	div1.appendChild(all);
	
	var div2 = document.createElement('div');
	var textBlock = document.createElement('input');
	var addButton = document.createElement('button');
	addButton.innerHTML = "add";
	addButton.addEventListener('click', () => this.addItem(textBlock.value));
	div2.appendChild(textBlock);
	div2.appendChild(addButton);
	
	var result = document.createElement('div');
	result.appendChild(div1);
	result.appendChild(div2);
	return result;	
}

TodoPanel.prototype._each = function (lst, fn){
	for(var i = 0; i< lst.length; i++){
		fn(lst[i], i);
	}
}

TodoPanel.prototype._renderList = function (){
	var ul = document.createElement('ul');
	var items = this.todoList.getCurrentItems();
	this._each(items, (item, i) => {
		var li = document.createElement('li');
		var span = document.createElement('span');
		var nbsp1 = document.createTextNode("\u00A0");
		var complete = document.createElement('a');
		complete.addEventListener('click', () => this.switchState(i, item));
		complete.href = "#";
		var nbsp2 = document.createTextNode("\u00A0");
		var del = document.createElement('a');
		del.href = "#";
		del.innerHTML = "delete";
		del.addEventListener('click', () => this.deleteItem(i));
		
		if (item.completed){
			complete.innerHTML = "not done";
			span.innerHTML = "<s>"+item.text+"</s>";
		} else {
			complete.innerHTML = "done";
			span.innerHTML = item.text;
		}
		li.appendChild(span);
		li.appendChild(nbsp1);
		li.appendChild(complete);
		li.appendChild(nbsp2);
		li.appendChild(del);
		ul.appendChild(li);
	});
	return ul;
}