from django.db import models
from django.contrib.auth.models import AbstractUser, Group, BaseUserManager
from django.contrib.auth.models import User

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        superuser = self.create_user(email, password, **extra_fields)

        # Add to "Admin" group
        admin_group, created = Group.objects.get_or_create(name="Admin")
        superuser.groups.add(admin_group)
        
        return superuser
    
    
class CustomUser(AbstractUser):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuuid4)
    username = None  # Remove username field
    email = models.EmailField(unique=True)  # Make email unique

    USERNAME_FIELD = 'email'  # Set email as the unique identifier
    REQUIRED_FIELDS = []  # No need for extra fields

    objects = CustomUserManager()

    def __str__(self):
        return self.email

class UserGroup(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    group = models.OneToOneField(Group, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.email} - {self.group.name}"

class Owner(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuuid4)
    user = models.OneToOneField(CustomUser,on_delete=models.CASCADE, related_name='owner_porfile')
    business_name = models.CharField(max_length=255)
    business_license = models.ImageField(upload_to="licences/")
    contact_number = models.CharField(max_length=20)
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.business_name} ({self.user.email}) "
    
    


class TeamMember(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuuid4)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='team_member_profile')
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE, related_name='team_members')  # Belongs to an Owner
    role = models.CharField(max_length=50, choices=[
        ('manager', 'Manager'),
        ('support', 'Support'),
    ])
    permissions = models.JSONField(default=dict)  # Store role-based permissions
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.role} (Owner: {self.owner.user.email})"   
    
    