from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask import (Blueprint, jsonify, url_for, request, redirect, render_template)
from app.models import Board, db, User, List

boards = Blueprint('boards', __name__)

@boards.route("/<user_id>")
def user_boards(user_id):
    boards = db.session.query(Board).filter(Board.user_id == user_id)
    print(boards)

    format_boards = {"boards":{},"lists":{},"cards":{}}
    for board in boards:
        format_boards["boards"][board.id] = board.to_dict()
        for ls in board.lists:
            format_boards["lists"][ls.id] = ls.to_dict()
            for card in ls.cards:
                format_boards["cards"][card.id] = card.to_dict()
    return format_boards

@boards.route("/create",methods=["POST"])
def create_board():
    data = request.json
    data['description']= " "
    new_board = Board(
        title=data['title'],
        color=data['color'],
        description=data['description'],
        user_id=data['userId']
    )
    db.session.add(new_board)
    db.session.commit()
    format_board = new_board.to_dict()
    return {"board":format_board}
