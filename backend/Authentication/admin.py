from django.contrib import admin
from .models import CustomUser,Owner

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Owner)