from flask import Flask, render_template, request, url_for, redirect
app = Flask(__name__)


@app.route('/')
def main():
    return render_template('start_screen.html')


@app.route('/game', methods=['GET', 'POST'])
def game():
    return render_template('game_screen.html', rows=17, cols=32)


@app.route('/highscore')
def highscore():
    return render_template('highscore_screen.html')


if __name__ == '__main__':
    app.run(debug=True)
