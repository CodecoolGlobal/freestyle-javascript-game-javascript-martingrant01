window.onload = function initGame() {
        let fields = document.querySelectorAll('.table_col');

        createSnake(fields)
        snakeMovement(fields)

    // Your game can start here, but define separate functions, don't write everything in here :)
        function createSnake (fields) {

                for (let field of fields) {
                        if (field.dataset.row === '5' && field.dataset.col === '5') {
                                field.classList.add('snake');
                                field.setAttribute('id', 'snake-head');
                        }
                }
        }

        function snakeMovement (fields) {
                function move (fields, direction, change) {
                        let snakeHead = document.querySelector('#snake-head');
                        let snakeHeadPosition = {
                                row: parseInt(snakeHead.dataset.row),
                                col: parseInt(snakeHead.dataset.col)
                        }

                        if (direction === 'col' ? snakeHeadPosition.col += change : snakeHeadPosition.row += change);

                        snakeHead.classList.remove('snake');
                        snakeHead.removeAttribute('id');

                        //console.log(snakeHeadPosition)

                        for (let field of fields) {
                                if (field.dataset.col == snakeHeadPosition.col && field.dataset.row == snakeHeadPosition.row) {
                                        //console.log(snakeHeadPosition)
                                        field.classList.add('snake');
                                        field.setAttribute('id', 'snake-head');
                                }
                        }
                }
                let timer;
                window.addEventListener('keydown', function (event){
                        event.preventDefault();

                        console.log(event.code)
                        function new_key(event) {
                                let keykeys = ['KeyS', 'ArrowDown', 'KeyW', 'ArrowUp', 'KeyA', 'ArrowLeft', 'KeyD', 'ArrowRight']
                                for (let keykey of keykeys) {
                                        if (event.code == keykey) clearInterval(timer);
                                }

                        }
                        new_key(event);
                        timer = setInterval( function() {
                                switch (event.code) {
                                        case 'KeyS':
                                        case 'ArrowDown':
                                                //console.log('back');
                                                move(fields,'row', 1);
                                                break;
                                        case 'KeyW':
                                        case 'ArrowUp':
                                                //console.log('up');
                                                move(fields,'row', -1);
                                                break;
                                        case 'KeyA':
                                        case 'ArrowLeft':
                                                //console.log('left');
                                                move(fields,'col', -1);
                                                break;
                                        case 'KeyD':
                                        case 'ArrowRight':
                                                //console.log('right');
                                                move(fields,'col', 1);
                                                break;
                                }
                        }, 200)



                },

        )};
}





