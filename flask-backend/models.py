from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
from db import db
from datetime import datetime


class Post(db.Model):

    __tablename__ = "posts"
    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.String(120), unique=True, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_date = db.Column(
        db.DateTime,
        default=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        nullable=False,
    )

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_all(cls):
        allPost = cls.query.all()
        array = []
        for item in allPost:
            post = item.__dict__
            date = post["created_date"]
            array.append(
                {
                    "id": post["id"],
                    "topic": post["topic"],
                    "content": post["content"],
                    "created_at": str(date),
                }
            )
        return array

    @classmethod
    def find_by_topic(cls, topic):
        return cls.query.filter_by(topic=topic).first()

    @classmethod
    def put(cls, topic, content):
        cls.query.filter_by(topic=topic).update({"content": content})
        db.session.commit()
        return {"message": "Topic {} was updated".format(topic)}

    @classmethod
    def delete(cls, topic):
        cls.query.filter_by(topic=topic).delete()
        db.session.commit()
        return {"message": "Topic {} was deleted".format(topic)}

    @classmethod
    def delete_all(cls):
        try:
            num_rows_deleted = db.session.query(cls).delete()
            db.session.commit()
            return {"message": "{} row(s) deleted".format(num_rows_deleted)}
        except:
            return {"message": "Something went wrong"}
