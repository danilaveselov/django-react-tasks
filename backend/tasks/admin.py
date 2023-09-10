from django.contrib import admin
from .models import Tile, Task


class TileModelAdmin(admin.ModelAdmin):
    list_display = ['launch_date', 'status']


class TaskModelAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'description', 'type', 'tile']


admin.site.register(Tile, TileModelAdmin)
admin.site.register(Task, TaskModelAdmin)
