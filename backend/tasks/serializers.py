from rest_framework import serializers
from .models import Tile, Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class TileSerializer(serializers.ModelSerializer):
    # Allows nesting tasks within the tile
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Tile
        fields = '__all__'
