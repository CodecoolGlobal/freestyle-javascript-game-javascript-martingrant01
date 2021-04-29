window.onload = function initGame() {
        let fields = document.querySelectorAll('.table_col');

        createSnake(fields)
        snakeMovement(fields)
        place_apple_on_map();


        function createSnake(fields) {

                for (let field of fields) {
                        if (field.dataset.row === '5' && field.dataset.col === '5') {
                                field.setAttribute('data-pos', 0)
                                field.classList.add('snake');
                                field.setAttribute('id', 'snake-head');
                        }
                        if (field.dataset.row === '5' && field.dataset.col === '4') {
                                field.setAttribute('data-pos', 1)
                                field.classList.add('snake');
                        }
                        if (field.dataset.row === '5' && field.dataset.col === '3') {
                                field.setAttribute('data-pos', 2)
                                field.classList.add('snake');
                        }
                        if (field.dataset.row === '5' && field.dataset.col === '2') {
                                field.setAttribute('data-pos', 3)
                                field.classList.add('snake');
                                field.setAttribute('id', 'snake-end');
                        }
                }
        }

        function sortPosition() {
                let snake = document.querySelectorAll('.snake');
                let orderedSnakeList = [];
                let snakeLength = snake.length;
                let maxElementIndex;
                while (orderedSnakeList.length < snakeLength) {
                        let maxElement = snake[0];
                        for (let snakePartIndex=0; snakePartIndex < snakeLength; snakePartIndex++) {
                                if (maxElement.dataset.pos < snake[snakePartIndex].dataset.pos) {
                                     maxElement = snake[snakePartIndex];
                                     maxElementIndex = snakePartIndex;
                                }
                        }
                        orderedSnakeList.push(maxElement);
                        snake = snake.splice(maxElementIndex, 1);
                        console.log(orderedSnakeList)
                }

        }

        function snakeMovement(fields) {
                function move(fields, direction, change) {
                        let snake = document.querySelectorAll('.snake');
                        sortPosition();
                        let snakeHead = document.querySelector('#snake-head');
                        let snakeHeadPosition = {
                                row: parseInt(snakeHead.dataset.row),
                                col: parseInt(snakeHead.dataset.col)
                        }

                        if (direction === 'col' ? snakeHeadPosition.col += change : snakeHeadPosition.row += change) ;


                        function checkNextField() {
                                for (let field of fields) {
                                        if (field.dataset.col == snakeHeadPosition.col && field.dataset.row == snakeHeadPosition.row) {
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

                        //snakeHead.classList.remove('snake');
                        snakeHead.removeAttribute('id');
                        // snakeEnd.removeAttribute('id');

                        function moveSnakeHead() {
                                for (let field of fields) {
                                        if (field.dataset.col == snakeHeadPosition.col && field.dataset.row == snakeHeadPosition.row) {

                                                field.classList.add('snake');
                                                field.setAttribute('id', 'snake-head');
                                                snake = document.querySelectorAll('.snake');
                                                let previous_snake_end_index;

                                                for (let index=0; index<snake.length ; index++) {
                                                        if (snake[index].id === 'snake-end') {
                                                                 previous_snake_end_index = index;
                                                        }
                                                }


                                                let head_index, end_index, next_index;

                                                for (let index=0; index<snake.length ; index++) {
                                                        if (snake[index].id === 'snake-head') {
                                                                head_index = index

                                                                // right, down
                                                                if (head_index == snake.length - 1) {
                                                                        end_index = 0
                                                                        next_index = 0
                                                                }
                                                                // up, left
                                                                else if (head_index == 0) {
                                                                        if (previous_snake_end_index == snake.length - 1) {
                                                                                end_index = previous_snake_end_index
                                                                                next_index = snake.length - 2
                                                                        } else {
                                                                                end_index = previous_snake_end_index;
                                                                                next_index = previous_snake_end_index;
                                                                        }
                                                                }



                                                        }
                                                }

                                                snake[end_index].removeAttribute('id');
                                                snake[end_index].classList.remove('snake');

                                                snake = document.querySelectorAll('.snake');
                                                snake[next_index].setAttribute('id', 'snake-end');
                                                //console.log(end_index, next_index)
                                                //console.log(snake);



                                                break;
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







