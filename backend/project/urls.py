from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # That's where we include our API urls.
    path('api/', include('tasks.urls')),
]
