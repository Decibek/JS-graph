function UI(options){
    var callbacks = options.callbacks;
    document.getElementById('shoulHide').addEventListener('click', shoulHide);
    document.getElementById('addFunction').addEventListener('click', addFunction);
    var num = 0;

    function shoulHide(){
        document.querySelector('.overlay').classList.toggle('hide');
    }

    function addFunction(){
        var input = document.createElement('input');
        input.setAttribute('placeHolder', 'например: Math.sin(x)')
        input.dataset.num = num;
        input.addEventListener('keyup', keyupAdd);
        var inputColor = document.createElement('input');
        inputColor.setAttribute('placeHolder','цвет');
        inputColor.addEventListener('keyup', keyupColor);
        inputColor.title = 'Введите цвет функции, например:\n- red'
        inputColor.dataset.num = num;
        var button = document.createElement('button');
        button.title = "Удалить функцию с графика";
        button.innerHTML = 'Удалить';
        button.addEventListener('click', function(){
            callbacks.delFunction(input.dataset.num);
            funcInput.removeChild(input);
            funcInput.removeChild(inputColor);
            funcInput.removeChild(button);
        })
        var funcInput = document.getElementById('funcInput');
        funcInput.appendChild(input);
        funcInput.appendChild(inputColor);
        funcInput.appendChild(button);
        funcInput.title = 'Введите функцию, например:\n- Math.sin(x) для отображения синусоиды\n- x*x для отображения параболы'
        num++;
    }

    function keyupAdd(){
        try{
            var f;
            eval("f = function(x) {return " + this.value + ";}");
            callbacks.addFunction(f,this.dataset.num);
        }
        catch (c){
            console.log(c)
        }
    }
    
    function keyupColor(){
        callbacks.setColor(this.value, this.dataset.num);
    }

}
