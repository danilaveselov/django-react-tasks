from django.urls import path, include
from rest_framework import routers
from .views import TileViewSet, TaskViewSet

router = routers.DefaultRouter()
router.register(r'tiles', TileViewSet)
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
