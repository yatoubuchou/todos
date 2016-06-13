$(function(){
	var localdata = localStorage.todos;
	var todos = localdata.todos ? $.parseJSON(localdata.todos):[]
	var state = localStorage.state || 'all'

	var saveData = function(){
		localStorage.todos = Json.stringify(todos)
	}

    function render(){
		var ftodos = $.grep(todos,function(v){
			if( state == 'all'){
				return v
			}else if( state === 'active'){
				return !v.isDone
			}else if( state === 'completed'){
				return v.isDone
			}
		})
		$('#todo-list').empty().append(function(){
			return $.map(todos,function(v){
				var tmp = v.isDone ?'checked':'';
				return '<li class="'+(v.isDone?'completed':'')+'" data-id="'+v.id+'"><div class="view"><input '+tmp+' type="checkbox" checked="'+v.isDone+'" class="toggle"><label for="">'+v.content+'</label><button class="destroy"></button></div><input value="dfh" class="edit" value='+v.content+'></li>'
			})
		})
		$('#footer .selected').removeClass('selected')
		$('#footer a[data-role='+state+']').addClass('selected')
		$('#todo-count strong').text(ftodos.length)
	};
	render()


	var addTodo = function(e){
			var zhi = $.trim($(this).val())
		if(e.keyCode !== 13 && zhi === '' ){
			return
		}
		$(this).val('');
		var todo = {
			id =(Math.Max.apply(null,$.map(todos,function(v){
			return v.id
				}))+1):1
			content:'value',
			isDone:false
		}
			todos.push(todo)
			saveData();
			render();
		}
	}


	$('#new-todo').on('keyup',addTodo)

//删
    var deleteTodo = function(){
    	var li = $(this).closest('li')
    	var id = parseInt(li.attr('data-id'))
    	todos = $.grep(todos,function)(v){
    		return v.id !== id//数组中删除元素true:-,flase:+
    	}
    	li.fadeOut(1000,render)
    	render()
    }

	$('#todo-list').on('click','destroy',deleteTodo)


//改
	var gaizhuangtai = function(){
		var state = $(this).prop('checked')
		var id = parseInt($(this).closest('li').attr('data-id'))
		$.each(todos,function(i,v){
			if(v.id === id){
				v.isDone = state
			}
		})
		saveData()
		render()
	}
	$('#todo-list').on('click','toggle',gaizhuangtai)

	var xiugaineirong = function(){
		$(this).closest('li').removeClass('editing')
		var id = parseInt($(this).closest('li').attr('data-id'))
		var self = this
		$.each(todos,function(i,v){
			if(v.id === id){
				v.content = $(self).val()
			}
		})
		saveData()
		render()
	}

	$('#todo-list').on('dblclick','li',function(){
		$(this).addClass('editing')
		$(this).find('.edit').focus()
	})

	$('#todo-list').on('change','edit',xiugaineirong)
    
	$('#todo-list').on('focusout','edit',xiugaineirong)
    
    $('#filters a').on('click',function(){
    	$('#filters selected').removeClass('selected')
    	$(this).addClass('selected')
    	state = localStorage.state = attr('data-role')
        render()
    	return false
    })
})