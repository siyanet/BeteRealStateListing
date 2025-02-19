from django.urls import path
from .views import RegisterUserView,RegisterTeamMemberView,RegisterOwnerView,LoginAPIView

urlpatterns = [
    path('register/user/',RegisterUserView.as_view(),name = 'register_user'),
    path('register/owner/',RegisterOwnerView.as_view(),name = 'register_owner'),
    path('register/team_member/',RegisterTeamMemberView.as_view(),name='register_team_member'),
    path('login/',LoginAPIView.as_view(),name='login'),
]
