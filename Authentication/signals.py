from allauth.account.signals import user_signed_up
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model

@receiver(post_migrate)
def create_default_groups(sender, **kwargs):
    if sender.name == "auth":  # Ensure we are working in the correct app
        Group.objects.get_or_create(name="Admin")


User = get_user_model()

# @receiver(user_signed_up)
# def populate_user_profile(request, user, **kwargs):
#     """Populate additional fields when a user registers with Google."""
#     sociallogin = kwargs.get("sociallogin", None)
    
#     if sociallogin:
#         user.is_active = True  # Ensure user is active
#         user.save()


@receiver(user_signed_up)
def populate_user_profile(request, user, sociallogin=None, **kwargs):
    """Populate additional fields when a user registers via Google."""
    if sociallogin:
        extra_data = sociallogin.account.extra_data  # Get Google profile data
        user.email = extra_data.get("email", user.email)
        user.first_name = extra_data.get("given_name", "")  # First name
        user.last_name = extra_data.get("family_name", "")  # Last name
        user.is_active = True  # Activate user by default
        user.save()
