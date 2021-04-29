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
                let snake = Array.from(document.querySelectorAll('.snake'));
                let orderedSnakeList = [];
                let maxElementIndex;
                while (orderedSnakeList.length < snake.length) {
                        let maxElement = snake[0];
                        for (let snakePartIndex=0; snakePartIndex < snake.length; snakePartIndex++) {
                                if (maxElement.dataset.pos < snake[snakePartIndex].dataset.pos) {
                                     maxElement = snake[snakePartIndex];
                                     maxElementIndex = snakePartIndex;
                                }
                        }
                        orderedSnakeList.push(maxElement);
                        snake.splice(maxElementIndex, 1);
                }
                return orderedSnakeList
        }

        function snakeMovement(fields) {
                function move(fields, direction, change) {
                        let snake = sortPosition();
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
                        //snakeHead.removeAttribute('data-pos');
                        // snakeEnd.removeAttribute('id');

                        function moveSnakeHead() {
                                for (let field of fields) {
                                        if (field.dataset.pos) {
                                                let increasedPos = field.dataset.pos
                                                increasedPos ++
                                                field.dataset.pos = increasedPos
                                        }

                                        if (field.dataset.col == snakeHeadPosition.col && field.dataset.row == snakeHeadPosition.row) {

                                                field.classList.add('snake');
                                                field.setAttribute('id', 'snake-head');
                                                field.setAttribute('data-pos', 0);



                                        }
                                        if (field.dataset.col == snake[0].dataset.col && field.dataset.row == snake[0].dataset.row) {

                                                field.classList.remove('snake');
                                                field.removeAttribute('id', 'snake-end');
                                                field.removeAttribute('data-pos');

                                        }
                                        if (field.dataset.col == snake[1].dataset.col && field.dataset.row == snake[1].dataset.row) {

                                                field.setAttribute('id', 'snake-end');
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







