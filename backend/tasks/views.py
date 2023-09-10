from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Tile, Task
from .serializers import TileSerializer, TaskSerializer


class TileViewSet(viewsets.ModelViewSet):
    queryset = Tile.objects.all()
    serializer_class = TileSerializer

    @action(detail=True, methods=['GET'])
    def tasks(self, request, pk=None):
        tile = self.get_object()
        tasks = Task.objects.filter(tile=tile)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
