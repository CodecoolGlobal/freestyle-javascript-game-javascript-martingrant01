window.onload = function initGame() {
        let fields = document.querySelectorAll('.table_col');

        createSnake(fields)
        snakeMovement(fields)
        place_apple_on_map();


        function createSnake(fields) {

                for (let field of fields) {
                        if (field.dataset.row === '5' && field.dataset.col === '5') {
                                field.setAttribute('data-pos', 1)
                                field.classList.add('snake');

                        }
                        if (field.dataset.row === '5' && field.dataset.col === '4') {
                                field.setAttribute('data-pos', 2)
                                field.classList.add('snake');
                        }
                        if (field.dataset.row === '5' && field.dataset.col === '3') {
                                field.setAttribute('data-pos', 3)
                                field.classList.add('snake');
                        }
                        if (field.dataset.row === '5' && field.dataset.col === '2') {
                                field.setAttribute('data-pos', 4)
                                field.classList.add('snake');
                        }
                }
        }

        function snakeMovement(fields) {
                function move(fields, direction, change) {
                        let snake = document.querySelectorAll('[data-pos]');

                        let snakeHead = document.querySelectorAll('[data-pos]')[snake.length-1];

                        function checkNextField() {
                                for (let field of fields) {

                                        if (field.dataset.col == snakeHead.dataset.col && field.dataset.row == snakeHead.dataset.row) {
                                                if (field.classList['value'].includes('table_border')) {
                                                        if (confirm('Play again?')) {
                                                                window.location.replace('/')
                                                        } else {clearInterval(timer)}
                                                }
                                                if (field.classList['value'].includes('apple')){
                                                        field.classList.remove('apple')
                                                        place_apple_on_map()
                                                }

                                        }
                                }
                        }

                        checkNextField();


                        function moveSnakeHead() {

                                console.log(snake)
                                debugger;
                                for (let snake_part of snake) {
                                        snake_part.classList.remove('snake');

                                        let snake_col = parseInt(snake_part.dataset.col);
                                        let snake_row = parseInt(snake_part.dataset.row);

                                        if (direction === 'col' ? snake_col += change : snake_row += change);

                                        for (let field of fields) {
                                                if (field.dataset.col == snake_col && field.dataset.row == snake_row) {
                                                        field.classList.add('snake');
                                                }
                                        }
                                }
                        }

                        moveSnakeHead()


                }
                let timer;
                window.addEventListener('keydown', function (event) {
                            event.preventDefault();

                            function check_valid_key() {
                                    let valid_keys = ['KeyS', 'ArrowDown', 'KeyW', 'ArrowUp', 'KeyA', 'ArrowLeft', 'KeyD', 'ArrowRight'];
                                    for (let valid_key of valid_keys) {
                                            if (event.code == valid_key) {
                                                    directionOfSnake();
                                            }
                                    }

                                    function directionOfSnake() {
                                            clearInterval(timer);

                                            timer = setInterval(function () {
                                                    switch (event.code) {
                                                            case 'KeyS':
                                                            case 'ArrowDown':
                                                                    move(fields, 'row', 1);
                                                                    break;
                                                            case 'KeyW':
                                                            case 'ArrowUp':
                                                                    move(fields, 'row', -1);
                                                                    break;
                                                            case 'KeyA':
                                                            case 'ArrowLeft':
                                                                    move(fields, 'col', -1);
                                                                    break;
                                                            case 'KeyD':
                                                            case 'ArrowRight':
                                                                    move(fields, 'col', 1);
                                                                    break;
                                                            default:
                                                                    return;
                                                    }
                                            }, 300)
                                    }

                            }

                            check_valid_key();

                    },
                )
        }

        function place_apple_on_map() {
                const cells = document.querySelectorAll('.table_col');
                let get_random_cell = (amount_of_cells) => Math.floor(Math.random() * amount_of_cells);
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
                place_of_apple.classList.add('apple');


        }

}







