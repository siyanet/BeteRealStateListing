from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Owner,TeamMember,CustomUser

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['uuid','email','first_name','last_name']
        extra_kwargs = {'password': {'write_only': True}}
        


class OwnerSerializer(serializers.ModelSerailizer):
    user = UserSerializer()
    
    class Meta:
        model = Owner
        fields = ['uuid','user','business_name','business_licence','contact_number','verified', 'created_at', 'updated_at']
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = CustomUser.objects.create(**user_data)
        owner = Owner.objects.create(user=user, **validated_data)
        return owner
class TeamMemberSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    owner = serializers.PrimaryKeyRelatedField(queryset=Owner.objects.all())
    
    class Meta:
        model = TeamMember
        fields = ['uuid', 'user', 'owner', 'role', 'permissions', 'created_at','updated_at']
        
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = CustomUser.objects.create(**user_data)
        team_member = TeamMember.objects.create(user=user, **validated_data)
        return team_member