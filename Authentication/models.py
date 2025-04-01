from django.db import models
from django.contrib.auth.models import Permission
import uuid
from django.contrib.auth.models import AbstractUser, Group, BaseUserManager
from django.contrib.auth.models import User

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        if not password:
            raise ValueError('The Password field must be set')  # Ensure password is required
        
        print(password)
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using = self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active',True)
        extra_fields.setdefault('is_superuser', True)
        superuser = self.create_user(email, password, **extra_fields)

        # Add to "Admin" group
        admin_group, created = Group.objects.get_or_create(name="Admin")
        superuser.group = admin_group
        superuser.save()
        
        return superuser
    
    
class CustomUser(AbstractUser):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4)
    username = None  # Remove username field
    email = models.EmailField(unique=True)  # Make email unique
    group = models.ForeignKey(Group,on_delete=models.SET_NULL,null=True,blank=True)
    USERNAME_FIELD = 'email'  # Set email as the unique identifier
    REQUIRED_FIELDS = []  # No need for extra fields

    objects = CustomUserManager()
    
    def get_role(self):
        return self.group.name if self.group else None

    def __str__(self):
        return self.email



class Owner(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.OneToOneField(CustomUser,on_delete=models.CASCADE, related_name='owner_profile')
    business_name = models.CharField(max_length=255)
    business_license = models.ImageField(upload_to="licences/")
    contact_number = models.CharField(max_length=20)
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.business_name} ({self.user.email}) "
    
    



class Role(models.Model):
    uuid = models.UUIDField(primary_key=True,default=uuid.uuid4)
    name = models.CharField(max_length=255)
    owner = models.ForeignKey(Owner,on_delete=models.CASCADE,related_name='roles')
    permissions = models.ManyToManyField(Permission,related_name='roles')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"{self.name} ({self.owner.user.email})" 
    

class TeamMember(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='team_member_profile')
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE, related_name='team_members')  # Belongs to an Owner
    roles = models.ManyToManyField(Role,related_name='team_members')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.email} - (Owner: {self.owner.user.email})"   
    
    def get_permissions(self):
        """ Returns all permissions assigned to this team member's role """
        permissions = set()
        for role in self.roles.all():
            permissions.update(role.permissions.all())  # Add all permissions from each role
        return permissions
    

class Agent(models.Model):
    # uuid = models.UUIDField(primary_key=True,default=uuid.uuid4)
    owner = models.ForeignKey(Owner,on_delete=models.CASCADE,related_name='agents')
    user = models.OneToOneField(CustomUser,on_delete=models.CASCADE,related_name='agent_profile')
    phone_number = models.CharField(max_length=15,unique=True)
    profile_image = models.ImageField(upload_to='agents/profile_images',null=True,blank = True)
    bio = models.CharField(max_length=800)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - Agent of {self.owner.business_name}"
    
    
    
    
class Property(models.Model):
    # uuid = models.UUIDField(primary_key=True,default=uuid.uuid4)
    owner = models.ForeignKey(Owner,on_delete=models.CASCADE,related_name='properties')
    agents = models.ManyToManyField(Agent,related_name='properties')
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits =15,decimal_places=2)
    location = models.CharField(max_length=255)
    bedrooms = models.PositiveIntegerField()
    bathrooms = models.PositiveIntegerField()
    kitchen= models.PositiveIntegerField()
    living_rooms = models.PositiveIntegerField()
    square_meters = models.DecimalField(max_digits=20,decimal_places=2)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.title} - {self.location} - {self.price} ETB"
    
    
class PropertyImage(models.Model):
    property = models.ForeignKey(Property,on_delete = models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='properties/images/')
    caption = models.CharField(max_length=255,blank=True,null=True)
    
    def __str__(self):
        return f"Image for {self.property.title}"