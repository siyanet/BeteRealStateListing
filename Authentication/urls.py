from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import RegisterUserView, TeamMemberViewSet, LogoutView, get_authenticated_user, ListAllowedPermissions,RoleViewSet, PropertyViewSet, ApproveOwnersAPIView, ListInActiveOwners,RegisterTeamMemberView,RegisterOwnerView,LoginAPIView,AgentViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
router = DefaultRouter()
router.register(r'roles',RoleViewSet,basename='role')
router.register(r'team_members',TeamMemberViewSet,basename='team_member')
router.register(r'agent',AgentViewSet,basename='agent')
router.register(r'property',PropertyViewSet,basename='property')
urlpatterns = [
    path('register/user/',RegisterUserView.as_view(),name = 'register_user'),
    path('register/owner/',RegisterOwnerView.as_view(),name = 'register_owner'),
    path('register/team_member/',RegisterTeamMemberView.as_view(),name='register_team_member'),
    path('login/',LoginAPIView.as_view(),name='login'),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"), 
    path("auth/registration/", include("dj_rest_auth.registration.urls")),  # Signup endpoint
    path("auth/social/", include("allauth.socialaccount.urls")),
    path("accounts/", include("allauth.urls")),
    path('listinactiveowners/',ListInActiveOwners.as_view(),name='list_owners'),
    path('approveowners/',ApproveOwnersAPIView.as_view(),name="approve_owners"),
    path('listpermissions/',ListAllowedPermissions.as_view(),name='allowed_permissions'),
    path('auth/user/',get_authenticated_user,name='authenticated-user'),
    path("logout/", LogoutView.as_view(), name="logout"),
    path('',include(router.urls),)
]
