function TodoApi(){
this.token = getToken(this);
}

function getToken(that){
return fetch('https://todo-app-back.herokuapp.com/login', {
  method: 'POST',
  body:
    JSON.stringify({
      email: 'iomihailov@gmail.com',
      password: '15xxmoqpodt',
    }),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(r => {
return r.json();
}).then(j => {
return j.token;
});
}

TodoApi.prototype.read = function (){
return this.token.then(token => fetch('https://todo-app-back.herokuapp.com/todos', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token
  }
}).then(r => {
return r.json();
}));
}

TodoApi.prototype.create = function (item){
return this.token.then(token => fetch('https://todo-app-back.herokuapp.com/todos', {
  method: 'POST',
  body: JSON.stringify(item),
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token
  }
}).then(r => {
return r.json();
}));
}

TodoApi.prototype.update = function (id, item){
return this.token.then(token => fetch('https://todo-app-back.herokuapp.com/todos/'+id, {
  method: 'PUT',
  body: JSON.stringify(item),
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token
  }
}).then(r => {
return r.json();
}));
}

TodoApi.prototype.delete = function (id){
return this.token.then(token => fetch('https://todo-app-back.herokuapp.com/todos/'+id, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token
  }
}).then(r => {
return r.json();
}));
}