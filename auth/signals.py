from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth.models import Group

@receiver(post_migrate)
def create_default_groups(sender, **kwargs):
    if sender.name == "auth":  # Ensure we are working in the correct app
        Group.objects.get_or_create(name="Admin")
