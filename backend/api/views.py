from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def hello_world(request):
    """
    Simple API endpoint that returns a greeting message.
    """
    return Response({
        'message': 'Hello from Django!',
        'status': 'success'
    })
