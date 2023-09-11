from django.db import models
from datetime import date


class Tile(models.Model):
    # IntegerChoices will take less space in the db
    class Status(models.IntegerChoices):
        LIVE = 1
        PENDING = 2
        ARCHIVED = 3

    launch_date = models.DateField(default=date.today)
    # Usually mapped to a 'SMALLINT' column in most dbs. Saves 2 bytes :)
    status = models.SmallIntegerField(choices=Status.choices)

    def __str__(self):
        return f'{self.pk} - {self.status}'


class Task(models.Model):
    class Type(models.IntegerChoices):
        SURVEY = 1
        DISCUSSION = 2
        DIARY = 3

    title = models.CharField(max_length=100)
    order = models.PositiveSmallIntegerField()
    description = models.TextField()
    type = models.SmallIntegerField(choices=Type.choices)
    tile = models.ForeignKey(
        Tile,
        related_name="tasks",
        on_delete=models.CASCADE  # When tile gets deleted, all tasks do too
    )

    def __str__(self):
        return f'{self.pk} - {self.title}'
