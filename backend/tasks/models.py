from django.db import models
from datetime import date


class Tile(models.Model):
    class Status(models.IntegerChoices):
        LIVE = 1
        PENDING = 2
        ARCHIVED = 3

    launch_date = models.DateField(default=date.today)
    status = models.IntegerField(choices=Status.choices)

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
    type = models.IntegerField(choices=Type.choices)
    tile = models.ForeignKey(Tile, related_name="tasks", on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.pk} - {self.title}'
