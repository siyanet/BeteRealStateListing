from django.shortcuts import render
from django.contrib.auth.models import Group
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from rest_framework.views import APIView
from rest_framework import generics,permissions
from .models import Owner, TeamMember, CustomUser,UserGroup
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import OwnerSerializer,TeamMemberSerializer,UserSerializer
# Create your views here.


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token)
    }
    
class RegisterUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def create(self,request,*args,**kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()
        customer_group, created = Group.objects.get_or_create(name="Customer")
        UserGroup.objects.create(user=user, group=customer_group)

        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)

class RegisterOwnerView(generics.CreateAPIView):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        owner = serializer.save()

        # Assign user to "Owner" group
        owner_group, created = Group.objects.get_or_create(name="Owner")
        UserGroup.objects.create(user=owner.user, group=owner_group)

        return Response({"message": "Owner registered successfully"}, status=status.HTTP_201_CREATED)

class RegisterTeamMemberView(generics.CreateAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        team_member = serializer.save()

        # Assign user to "TeamMember" group
        team_group, created = Group.objects.get_or_create(name="TeamMember")
        UserGroup.objects.create(user=team_member.user, group=team_group)

        return Response({"message": "Team Member registered successfully"}, status=status.HTTP_201_CREATED)
 
    
class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)

        if user:
            update_last_login(None, user)
            user_group = UserGroup.objects.filter(user=user).first()
            group_name = user_group.group.name if user_group else "Unknown"
            return Response({
                "message": "Login successful",
                'group': group_name,
                "user": UserSerializer(user).data,
                "token": get_tokens_for_user(user)
            },status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    
class CreateSuperUserView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser.objects.create_superuser(email=email, password=password)

        # Assign superuser to "Admin" group
        admin_group, created = Group.objects.get_or_create(name="Admin")
        UserGroup.objects.create(user=user, group=admin_group)

        return Response({"message": "Superuser created successfully"}, status=status.HTTP_201_CREATED)
