from django.shortcuts import render

def index(request):
    print('index was called')
    return render(request, "build/index.html")