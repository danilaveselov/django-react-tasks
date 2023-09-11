from django.test import TestCase
from rest_framework.test import APIClient
from .models import Tile, Task
from .serializers import TileSerializer, TaskSerializer


class TileSerializerTest(TestCase):
    # Setting up our test data
    def setUp(self):
        self.tile_data = {
            'launch_date': '2023-09-11',
            'status': Tile.Status.LIVE
        }

    # This status exists
    def test_tile_serializer_valid_data(self):
        serializer = TileSerializer(data=self.tile_data)
        self.assertTrue(serializer.is_valid())

    # This one doesn't
    def test_tile_serializer_invalid_status(self):
        self.tile_data['status'] = 4
        serializer = TileSerializer(data=self.tile_data)
        self.assertFalse(serializer.is_valid())


class TaskSerializerTest(TestCase):
    def setUp(self):
        self.tile = Tile.objects.create(
            launch_date='2023-09-11',
            status=Tile.Status.LIVE
        )
        self.task_data = {
            'title': 'Test Task',
            'order': 1,
            'description': 'This is a test task.',
            'type': Task.Type.SURVEY,
            'tile': self.tile.id
        }

    def test_task_serializer_valid_data(self):
        serializer = TaskSerializer(data=self.task_data)
        self.assertTrue(serializer.is_valid())

    def test_task_serializer_invalid_type(self):
        self.task_data['type'] = 4
        serializer = TaskSerializer(data=self.task_data)
        self.assertFalse(serializer.is_valid())


class TileViewSetTest(TestCase):
    # Setting up our client, tile and task
    def setUp(self):
        self.client = APIClient()
        self.tile = Tile.objects.create(
            launch_date='2023-09-11',
            status=Tile.Status.LIVE
        )
        self.task = Task.objects.create(
            title='Test Task',
            order=1,
            description='This is a test task.',
            type=Task.Type.SURVEY,
            tile=self.tile
        )

    # Now we make sure that the response codes are correct
    def test_tile_view_set(self):
        response = self.client.get(f'/api/tiles/{self.tile.id}/')
        self.assertEqual(response.status_code, 200)

    def test_tile_tasks_action(self):
        response = self.client.get(f'/api/tiles/{self.tile.id}/tasks/')
        self.assertEqual(response.status_code, 200)


class TaskViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.tile = Tile.objects.create(
            launch_date='2023-09-11',
            status=Tile.Status.LIVE
        )
        self.task = Task.objects.create(
            title='Sample Task',
            order=1,
            description='This is a sample task.',
            type=Task.Type.SURVEY,
            tile=self.tile
        )

    def test_task_view_set(self):
        response = self.client.get(f'/api/tasks/{self.task.id}/')
        self.assertEqual(response.status_code, 200)
