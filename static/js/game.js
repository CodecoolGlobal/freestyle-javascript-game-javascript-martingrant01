window.onload = function initGame() {
        let fields = document.querySelectorAll('.table_col');

        createSnake(fields)
        snakeMovement(fields)
        place_apple_on_map();
        
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

                        function check_valid_key () {
                                let valid_keys = ['KeyS', 'ArrowDown', 'KeyW', 'ArrowUp', 'KeyA', 'ArrowLeft', 'KeyD', 'ArrowRight'];
                                for (let valid_key of valid_keys) {
                                        if (event.code == valid_key) {
                                                move_the_snake();
                                        }
                                }
                                function move_the_snake () {
                                        clearInterval(timer);

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
                                                        default:
                                                                return;
                                                }
                                                }, 200)
                                }

                        }

                        check_valid_key();

                },

        )}
}
        function place_apple_on_map() {
                const cells = document.querySelectorAll('.table_col');
                let get_random_cell = (amount_of_cells) =>  Math.floor(Math.random() * amount_of_cells);
                let random_cell;
                let border_coords = {
                        min_col: 0,
                        max_col: document.querySelector('.play_field').dataset.all_cols - 1,
                        min_row: 0,
                        max_row: document.querySelector('.play_field').dataset.all_rows - 1
                }

                do {
                        random_cell = get_random_cell(cells.length);

                } while (cells[random_cell].dataset.col == border_coords.max_col ||
                        cells[random_cell].dataset.col == border_coords.min_col ||
                        cells[random_cell].dataset.row == border_coords.min_row ||
                        cells[random_cell].dataset.row == border_coords.max_row);


                let place_of_apple = cells[random_cell];
                console.log(place_of_apple);
                place_of_apple.classList.remove('light', 'dark');
                place_of_apple.classList.add('apple');



        }
}







