from config import Config
from flask import Flask, session, request
from flask_sqlalchemy import SQLAlchemy
from flask import Blueprint, jsonify
from app.models import User, Note, Notebook db


bp = Blueprint('notes', __name__)

def add_note(note_data):
    note = Note(title=note_data.title,
                text=note_data.text,
                notebook_id=note_data.notebookId)
    
    session.add(note)
    session.commit()

    return jsonify(note)

def get_notes(user_data):
    notes_list = []
    notebooks = session
                .query(Notebook)
                .filter_by(user_id == user_data.userId)
                .all()
    for notebook in notebooks:
        notes = session
                .query(Note)
                .filter_by(notebook_id == notebook.id)
                .order_by(updated_at)
                .all()
        notes_list = notes_list + notes
    return jsonify(notes_list)

def edit_note(note_data):
    note = session
            .query(Note)
            .filter_by(note_id == note_data.noteId)
    if note.title is not note_data.title:
        note.title = note_data.title
    elif note.text is not note_data.text:
        note.text = note_data.text
    else:
        pass #am i sending the note back or just updating it?

def delete_note(note_data):
    note = session
            .query(Note)
            .filter_by(note_id == note_data.noteId)
    session.delete(note)
    session.commit()

    return "something" #check

@bp.route("/notes", methods=['GET'])
def get_notes(id):
    notes = session
           .query(Note)
           .filter_by(userId == id)
           .order_by(updated_at)
           .all()

    return jsonify(notes)

@bp.route("/notes" , methods=['POST'])
def note_requests():
    note_data = request.get_json()

    if 'method' not in note_data:
       print('some error message')
       return None
    else:
        if note_data["method"] == "post":
            result = add_note(note_data)
        elif len(note_data["method"]) == "get":
            result = get_note(note_data)
        elif note_data["method"] == "put":
            result = edit_note(note_data)
        elif note_data["method"] == "delete":
            result = delete_notes(note_data)
        else:
            return None