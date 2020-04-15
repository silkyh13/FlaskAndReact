#!/usr/bin/env python3
from flask import Flask, request, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api
from db import db
from models import Post
import resources

app = Flask("__main__")
api = Api()

app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "mysql+mysqlconnector://root:JackAndKat@127.0.0.1:3306/python_flask_learning"
db.init_app(app)


@app.before_first_request
def create_tables():
    db.create_all()


@app.route("/")
def my_index():
    return render_template("index.html", token="Hello Flask+React")


api.add_resource(resources.AddPost, "/post")
api.add_resource(resources.GetAll, "/find")
api.add_resource(resources.DeleteAll, "/delete")
api.add_resource(resources.Delete, "/delete/<topic>")
api.add_resource(resources.Put, "/put")

if __name__ == "__main__":
    api.init_app(app)
    app.run(debug=True)
