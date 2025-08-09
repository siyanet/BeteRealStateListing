from django.contrib.auth.models import Group
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework import viewsets, filters, generics,permissions,status
from .models import Owner, Review, TeamMember, CustomUser,Role,Agent,Property
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from rest_framework.permissions import AllowAny, BasePermission
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RoleSerializer, OwnerHomePageSerializer, ReviewSerializer,PropertySerializer,PropertyImageSerializer, get_allowed_permissions, OwnerSerializer,TeamMemberSerializer,UserSerializer,AgentSerializer
from django.db import transaction
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action,api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
import django_filters
from django_filters import rest_framework as filters
from rest_framework.filters import SearchFilter
# Create your views here.
User = get_user_model()

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token)
    }
    
class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.group and request.user.group.name =='Admin'

class IsOwner(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.group and request.user.group.name == 'Owner'
    
    
class IsCustomer(BasePermission):
    def has_permission(self,request,view):
        return request.user.is_authenticated and request.user.group and request.user.group.name == "Customer"
      
class IsTeamMemberHasPermissionOnAgent(BasePermission):
    
    def has_permission(self,request,view):
        return request.user.is_authenticated
    
    def has_object_permission(self,request,view,obj):
        
        if hasattr(request.user,'team_member_profile'):
            team_member = request.user.team_member_profile
            permissions = team_member.get_permissions()
            
            if view.action in ['list','retrieve'] and 'view_agent' in permissions:
                return True
            if view.action in ['create'] and 'add_agent' in permissions:
                return True
            if view.action in ['update','partial_updated'] and 'change_agent' in permissions:
                return True
            if view.action in ['destory'] and 'delete_agent' in permissions:
                return True
            
            return False
            

class RegisterUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    @transaction.atomic
    def create(self,request,*args,**kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        validated_data = serializer.validated_data
        user = CustomUser.objects.create_user(**validated_data,is_active=True)
        customer_group, created = Group.objects.get_or_create(name="Customer")
        user.group = customer_group
        user.save()

        return Response({"message": "User registered successfully",
                         "user": serializer.data},
                         status=status.HTTP_201_CREATED)

class RegisterOwnerView(generics.CreateAPIView):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer
    permission_classes = [permissions.AllowAny]
    
    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        owner = serializer.save()
        # Assign user to "Owner" group
        owner_group, created = Group.objects.get_or_create(name="Owner")
        owner.user.group = owner_group
        owner.user.save()
        owner.save()
        # UserGroup.objects.create(user=owner.user, group=owner_group)
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

        try:
            # Check if the user exists with the provided email
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "User with this email does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        if not user.is_active:
            return Response({"error": "You are not verified. wait until your account verified."}, status=status.HTTP_403_FORBIDDEN)

        # Check if the provided password matches the stored hashed password
        if check_password(password, user.password):
            # Password is correct
            return Response({
                "message": "Login successful",
                "user": UserSerializer(user).data,
                "token": get_tokens_for_user(user)
            }, status=status.HTTP_200_OK)

        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class ApproveOwnersAPIView(APIView):
    permission_classes = [IsAdminUser]
    def post(self,request):
        owner_id = request.data.get('owner')
        if not owner_id:
            return Response({'error': "owner not provided"},status=status.HTTP_400_BAD_REQUEST)
        try:
            owner = Owner.objects.get(uuid= owner_id)
        except Owner.DoesNotExist:
            return Response({"error": "Owner Does not exist"},status=status.HTTP_404_NOT_FOUND)
        if owner.user.is_active == True:
            return Response({"error": "Owner is already active"},status = status.HTTP_400_BAD_REQUEST)
        owner.user.is_active = True
        owner.user.save()
        owner.save()
        return Response({"message": "Owner Verified succesfully"},status=status.HTTP_200_OK)


class ListInActiveOwners(generics.ListAPIView):
    queryset = Owner.objects.filter(user__is_active = False)
    serializer_class = OwnerSerializer
    permission_classes = [IsAdminUser]
    
    
class RoleViewSet(viewsets.ModelViewSet):
    serializer_class = RoleSerializer
    queryset = Role.objects.all()
    permission_classes = [IsOwner]
    
    def get_queryset(self):
        return Role.objects.filter(owner = self.request.user.owner_profile)
    
    
class ListAllowedPermissions(APIView):
    def get(self, request):
        permissions = get_allowed_permissions().values('id', 'codename', 'name')
        return Response(permissions)
    
class TeamMemberViewSet(viewsets.ModelViewSet):
    serializer_class = TeamMemberSerializer
    permission_classes = [IsOwner]
    
    def get_queryset(self):
        return TeamMember.objects.filter(owner=self.request.user.owner_profile)
    
    
class AgentViewSet(viewsets.ModelViewSet):
    serializer_class = AgentSerializer
    permission_classes = [IsOwner,IsTeamMemberHasPermissionOnAgent]
    
    def get_queryset(self):
        user = self.request.user
        
        if hasattr(user,'owner_profile'):
            return Agent.objects.filter(owner=user.owner_profile)
        
        if hasattr(user,'team_member_profile'):
            return Agent.objects.filter(owner = user.team_member_profile.owner)
        
        return Agent.objects.none()
    
    
    
class PropertyPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100
    

class PropertyFilter(django_filters.FilterSet):
    location = filters.CharFilter(field_name='location', lookup_expr='icontains')  # Allows partial search (case-insensitive)
    price = filters.NumberFilter(field_name='price', lookup_expr='gte')  # For minimum price filter (greater than or equal to)
    bedrooms = filters.NumberFilter(field_name='bedrooms')
    bathrooms = filters.NumberFilter(field_name='bathrooms')
    is_available = filters.BooleanFilter(field_name='is_available')

    class Meta:
        model = Property
        fields = ['location', 'price', 'bedrooms', 'bathrooms', 'is_available']

    
    
class PropertyViewSet(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    pagination_class = PropertyPagination

    filter_backends = [SearchFilter,DjangoFilterBackend]
    search_fields = ['title','description','location']
    filterset_class = PropertyFilter
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            if hasattr(user,'owner_profile'):
                return Property.objects.filter(owner=user.owner_profile)
            if hasattr(user,'team_member_profile'):
                return Property.objects.filter(owner = user.team_member_profile.owner)
    
        return Property.objects.filter(is_available=True)
    
    @action(detail=False,methods=['get'])
    def latest(self,request):
        latest_properties = Property.objects.filter(is_available = True).order_by('-created_at')[:9]
        serializer = self.get_serializer(latest_properties,many=True)
        return Response(serializer.data)
    
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_authenticated_user(request):
    user = request.user
    serialized_user = UserSerializer(user)
    return Response(serialized_user.data)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully"}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=400)
        
        
        
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    
    
    def get_permissions(self):
        if self.action == "create":
            return [IsCustomer()]
        return [AllowAny()]
   
    
    def perform_create(self,serializer):
      
        serializer.save(customer = self.request.user)
        
    @action(detail=False, methods=['get'], url_path='property/(?P<property_id>[^/.]+)')
    def property_reviews(self, request, property_id=None):
        try:
            property_obj = Property.objects.get(id=property_id)
        except Property.DoesNotExist:
            return Response({'detail': 'Property not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        reviews = Review.objects.filter(property=property_obj)
        serializer = self.get_serializer(reviews, many=True)
        return Response(serializer.data)
    
    
    
    
    


class UpdateOwnerProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        # Try to get the authenticated user's owner profile
        try:
            owner = request.user.owner_profile
        except Owner.DoesNotExist:
            return Response({"detail": "Owner profile does not exist."}, status=status.HTTP_404_NOT_FOUND)

        # Return the owner data (with nested user data)
        return Response({
            "owner": OwnerSerializer(owner).data
        }, status=status.HTTP_200_OK)


    def put(self, request):
        # Make sure the logged-in user has an owner profile
        try:
            owner = request.user.owner_profile
        except Owner.DoesNotExist:
            return Response({"detail": "Owner profile does not exist."}, status=status.HTTP_404_NOT_FOUND)

        owner_data = request.data.copy()
        user_data = owner_data.pop('user', {})

        # Update user fields
        user_serializer = UserSerializer(instance=request.user, data=user_data, partial=True)
        # Update owner fields
        owner_serializer = OwnerSerializer(instance=owner, data=owner_data, partial=True)

        if user_serializer.is_valid(raise_exception=True) and owner_serializer.is_valid(raise_exception=True):
            user_serializer.save()
            owner_serializer.save()
            return Response({
                "message": "Profile updated successfully",
                "owner": OwnerSerializer(owner).data
            }, status=status.HTTP_200_OK)

        return Response({
            "user_errors": user_serializer.errors,
            "owner_errors": owner_serializer.errors,
        }, status=status.HTTP_400_BAD_REQUEST)
        
        
        

class OwnerHomePageAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            owner = request.user.owner_profile  # Related name from your model
        except Owner.DoesNotExist:
            return Response({"error": "Owner profile not found."}, status=404)

        serializer = OwnerHomePageSerializer(owner, context={'request': request})
        return Response(serializer.data)