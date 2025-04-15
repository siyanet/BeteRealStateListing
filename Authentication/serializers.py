from rest_framework import serializers
from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model
from .models import Owner,TeamMember,CustomUser,Role,Agent,Property,PropertyImage
from django.contrib.auth.models import Permission
from rest_framework.exceptions import ValidationError
from django.db import transaction
from validate_email_address import validate_email
# User = get_user_model()
from django.contrib.auth.models import Permission
import uuid
def get_allowed_permissions():
    """Fetch only the required permissions for team members and properties."""
    return Permission.objects.filter(
        codename__in=[
            'add_teammember', 'change_teammember', 'delete_teammember', 'view_teammember',
            'add_property', 'change_property', 'delete_property', 'view_property',
            'add_agent', 'change_agent','delete_agent', 'view_agent',
            'can_view_reports'
        ]
    )

class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    # email = serializers.EmailField()
    class Meta:
        model = CustomUser
        fields = ['email', 'role', 'first_name','last_name','password','uuid']
        extra_kwargs = {'password': {'write_only': True}}
    
    def get_role(self,obj):
        if isinstance(obj, dict):
            return obj.get("role", "Unknown")  # Adjust based on your model
        return obj.get_role()
class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ['name','id'] 
        
class OwnerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = Owner
        fields = ['user','uuid','business_name','business_license','contact_number','verified', 'created_at', 'updated_at']
        extra_kwargs = {'uuid,updated_at,created_at,verified': {'read_only': True}}
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = CustomUser.objects.create_user(**user_data,is_active=False)
        owner = Owner.objects.create(user=user, **validated_data)
        return owner
    

    
class RoleSerializer(serializers.ModelSerializer):
    owner_email = serializers.SerializerMethodField()
    owner_name = serializers.SerializerMethodField()
    permission_details = PermissionSerializer(source = 'permissions',many=True,read_only = True) 
    permissions = serializers.PrimaryKeyRelatedField(queryset = get_allowed_permissions(),many=True,write_only = True)
    
    class Meta:
        model = Role
        fields = ['uuid','owner_email','owner_name','permission_details', 'name','permissions']
        extra_kwargs = {'uuid,owner_email,owner_name,updated_at,created_at': {'read_only':True}}
    
    
    
    def create(self,validated_data):
        selected_perms = validated_data.pop('permissions')
        request = self.context.get("request")
        if not request or not request.user:
            raise serializers.ValidationError({"error": "Request user is required."})
    
        owner = request.user.owner_profile  # Assuming the user has an `owner_profile`
        name = validated_data["name"]


    # Check if a role with the same name already exists for the owner
        if Role.objects.filter(owner=owner, name=name).exists():
            raise serializers.ValidationError({"error": "Role with this name already exists for the owner."})

        role = Role.objects.create(name=name,owner=owner)
        role.permissions.set(selected_perms)
        return role
      
    def get_owner_email(self,obj):
        return obj.owner.user.email if obj.owner and obj.owner.user else None
    
    def get_owner_name(self,obj):
        return obj.owner.business_name if obj.owner else None
    # def to_internal_value(self, data):
    #     """
    #     Convert permission IDs into Permission objects for creation.
    #     """
    #     permissions = data.get("permissions", [])

    #     if not isinstance(permissions, list):
    #         raise serializers.ValidationError({"permissions": "Expected a list of permission IDs."})

    #     validated_data = super().to_internal_value(data)
    #     validated_data["permissions"] = get_allowed_permissions().filter(id__in=permissions)
    #     return validated_data
    
class TeamMemberSerializer(serializers.ModelSerializer):
    owner_name = serializers.CharField(source = 'owner.business_name',read_only = True)
    owner_email = serializers.CharField(source = 'owner.user.email',read_only = True)
    user = UserSerializer()
    role_details = RoleSerializer(source = 'roles' ,many=True,read_only = True)
    roles = serializers.PrimaryKeyRelatedField(many=True, queryset=Role.objects.all(),write_only =True)  # Handles multiple roles
    class Meta:
        model = TeamMember
        fields = ['uuid','owner_name','owner_email','role_details', 'user','roles']
        
        
  
    
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')  # Extract user data
        req_roles = validated_data.pop('roles',[])
        print("Received roles:", req_roles)  # Check if this prints UUIDs

        request = self.context.get('request')  # Safely get request from context
        if request and hasattr(request, 'user'):
            owner = request.user.owner_profile  # Get owner's profile
        else:
            raise serializers.ValidationError("Owner information is required.")
        
        for role in req_roles:
            if not Role.objects.filter(uuid=role.uuid, owner=owner).exists():
                raise serializers.ValidationError(f"Role {role.name} does not belong to the owner.")

       
        with transaction.atomic():
            user = CustomUser.objects.create_user(**user_data)
            team_member = TeamMember.objects.create(user=user, owner = owner, **validated_data) 
            team_member.roles.set(req_roles)
            group, created = Group.objects.get_or_create(name="team_member")
            user.group = group
            user.save()
        return team_member
    
    def update(self, instance, validated_data):
        """Custom update method to handle nested 'user' updates"""
        user_data = validated_data.pop('user', None)
        req_roles = validated_data.pop('roles', [])

        # Update user fields if provided
        if user_data:
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            instance.user.save()

        # Update roles
        instance.roles.set(req_roles)

        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance
    
    
class AgentSerializer(serializers.ModelSerializer):
    owner_name = serializers.CharField(source = 'owner.business_name',read_only = True)
    owner_email = serializers.CharField(source = 'owner.user.email',read_only = True)
    user = UserSerializer()
    
    class Meta:
        model = Agent
        fields = ['id','owner_name','owner_email','user','phone_number','profile_image','bio','is_available','created_at','updated_at']
    
    def create(self,validated_data):
        user_data = validated_data.pop('user')
        request = self.context.get('request')  # Safely get request from context
        if request and hasattr(request, 'user'):
            owner = request.user.owner_profile  # Get owner's profile
        else:
            raise serializers.ValidationError("Owner information is required.")
        with transaction.atomic():
            user = CustomUser.objects.create_user(**user_data)
            agent = Agent.objects.create(user=user,owner=owner,**validated_data)
            group, created = Group.objects.get_or_create(name="agent")
            user.group = group
            user.save()
            return agent
        
        
        
        
class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['image','property']
        
        
        
class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True,read_only=True)
    agents = serializers.PrimaryKeyRelatedField(many=True,queryset=Agent.objects.all(),required=True)
    agents_detail = AgentSerializer(source = 'agents', many = True, read_only = True)
    owner_detail = OwnerSerializer(source = 'owner',read_only=True)
    class Meta:
        model = Property
        fields = ['id','owner','owner_detail', 'agents_detail','agents','title','images','description','price','location','bedrooms','bathrooms','kitchen','living_rooms','square_meters','is_available','created_at','updated_at']
        extra_kwargs = {"id": {'read_only': True},"owner": {"read_only": True}, "created_at": {"read_only": True}, "updated_at": {"read_only": True}}

    def create(self, validated_data):
        request = self.context.get('request')  # Safely get request from context
        req_agent = validated_data.pop('agents',[])
        print(req_agent)
        if not request or not request.user.is_authenticated:
            raise serializers.ValidationError("User must be authenticated to create a property.")

        if not hasattr(request.user, 'owner_profile'):
            raise serializers.ValidationError("Only owners can create properties.")
        
        owner = request.user.owner_profile
        validated_data['owner'] = owner
        
        agent_ids = []
        for agent_id in req_agent:
            if isinstance(agent_id, Agent):
                agent_ids.append(agent_id.id)
            else:
                try:
                    agent_ids.append(str(agent_id))
                except ValueError:
                     raise ValidationError("Invalid ID(s) in Agent list.")
                 
        agents = Agent.objects.filter(id__in = agent_ids,owner=owner)
        if agents.count() != len(req_agent):
            raise ValidationError("one or more agents do not belong to you")
        
        with transaction.atomic():
            property_instance = Property.objects.create(**validated_data)
            property_instance.agents.set(agents)

            # Handle multiple images
            images = request.FILES.getlist('images')  # Get uploaded images
            for image in images:
                PropertyImage.objects.create(property=property_instance, image=image)

        return property_instance
    
