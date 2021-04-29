window.onload = function initGame() {
        let fields = document.querySelectorAll('.table_col');

        createSnake(fields);
        snakeMovement(fields);
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
                                if (parseInt(maxElement.dataset.pos) < parseInt(snake[snakePartIndex].dataset.pos)) {
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
                        let isGrowing = false;
                        let snake = sortPosition();
                        let snakeHead = document.querySelector('#snake-head');
                        let snakeHeadPosition = {
                                row: parseInt(snakeHead.dataset.row),
                                col: parseInt(snakeHead.dataset.col)
                        }

                        if (direction === 'col' ? snakeHeadPosition.col += change : snakeHeadPosition.row += change) ;

                        function checkNextField() {

                                function increase_current_score(score) {

                                        let increased_score = parseInt(score.value) + 1

                                        score.value = increased_score

                                }

                                function set_high_score(high_score) {

                                        let increased_score = parseInt(high_score.value) + 1;

                                        high_score.value = increased_score;
                                }

                                for (let field of fields) {
                                        if (field.dataset.col == snakeHeadPosition.col && field.dataset.row == snakeHeadPosition.row) {
                                                if (field.classList['value'].includes('table_border') || field.classList['value'].includes('snake')) {
                                                        let high_score = document.querySelector('#high_score');
                                                        field.style.backgroundColor = 'purple';

                                                        setTimeout(() => {
                                                                if (confirm(`Play again? \n Highest score was ${high_score.value}`)) {
                                                                        window.location.replace('/')
                                                                }
                                                        }, 100);
                                                }

                                                if (field.classList['value'].includes('apple')) {
                                                        isGrowing = true;
                                                        let score = document.querySelector('#current_score');
                                                        let high_score = document.querySelector('#high_score');

                                                        increase_current_score(score);

                                                        if (parseInt(high_score.value) < parseInt(score.value)) {
                                                                set_high_score(high_score);
                                                        }

                                                        field.classList.remove('apple');
                                                        place_apple_on_map();
                                                }


                                        }
                                }
                        }

                        checkNextField();

                        snakeHead.removeAttribute('id');

                        function moveSnakeHead() {
                                const end_of_snake = 0;
                                const next_end_of_snake = 1;

                                for (let field of fields) {
                                        if (field.dataset.pos) {
                                                let increasedPos = parseInt(field.dataset.pos) + 1
                                                field.dataset.pos = increasedPos
                                        }

                                        if (field.dataset.col == snakeHeadPosition.col && field.dataset.row == snakeHeadPosition.row) {

                                                field.classList.add('snake');
                                                field.setAttribute('id', 'snake-head');
                                                field.setAttribute('data-pos', 0);



                                        }
                                        if ((field.dataset.col == snake[end_of_snake].dataset.col && field.dataset.row == snake[end_of_snake].dataset.row)
                                        && !isGrowing) {

                                                field.classList.remove('snake');
                                                field.removeAttribute('id', 'snake-end');
                                                field.removeAttribute('data-pos');

                                        }
                                        if (field.dataset.col == snake[next_end_of_snake].dataset.col && field.dataset.row == snake[next_end_of_snake].dataset.row) {

                                                field.setAttribute('id', 'snake-end');
                                        }
                                }

                        }

                        moveSnakeHead()


                }
                let timer;
                let previous_key = ''
                let start_moving = false
                window.addEventListener('keydown', function (event) {
                            event.preventDefault();

                            function check_valid_key() {
                                    let valid_keys = ['KeyS', 'ArrowDown', 'KeyW', 'ArrowUp', 'KeyA', 'ArrowLeft', 'KeyD', 'ArrowRight'];
                                    for (let valid_key of valid_keys) {
                                            if (event.code == valid_key) {
                                                    if (!start_moving) {
                                                        directionOfSnake();
                                                        start_moving = true
                                                        previous_key = event.code;
                                                    }
                                                    else if (previous_key == 'KeyD' && event.code != 'KeyA' ||
                                                        previous_key == 'ArrowRight' && event.code != 'ArrowLeft') {
                                                            previous_key = event.code;
                                                            directionOfSnake();
                                                    }
                                                    else if (previous_key == 'KeyA' && event.code != 'KeyD'||
                                                        previous_key == 'ArrowLeft' && event.code != 'ArrowRight') {
                                                            previous_key = event.code;
                                                            directionOfSnake();
                                                    }
                                                    else if (previous_key == 'KeyS' && event.code != 'KeyW'||
                                                        previous_key == 'ArrowDown' && event.code != 'ArrowUp') {
                                                            previous_key = event.code;
                                                            directionOfSnake();
                                                    }
                                                    else if (previous_key == 'KeyW' && event.code != 'KeyS'||
                                                        previous_key == 'ArrowUp' && event.code != 'ArrowDown') {
                                                            previous_key = event.code;
                                                            directionOfSnake();
                                                    }
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

                do {
                        random_cell = get_random_cell(cells.length);

                } while (cells[random_cell].classList["value"].includes('table_border') ||
                    cells[random_cell].classList["value"].includes('snake')
                    );


                let place_of_apple = cells[random_cell];
                place_of_apple.classList.add('apple');


        }

}







