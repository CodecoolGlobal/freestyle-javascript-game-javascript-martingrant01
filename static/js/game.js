function initGame() {
        place_apple_on_map();
    // Your game can start here, but define separate functions, don't write everything in here :)

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



initGame();
