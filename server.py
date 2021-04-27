from flask import Flask, render_template, request, url_for, redirect
app = Flask(__name__)


@app.route('/')
def game():
    return render_template('start_screen.html', rows=17, cols=32)


if __name__ == '__main__':
    app.run(debug=True)
