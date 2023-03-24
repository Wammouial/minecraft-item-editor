from django.shortcuts import render

# Create your views here.


def root(request):
	context = {}
	return render(request, 'root.html', context)
