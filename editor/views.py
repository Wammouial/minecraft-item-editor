import datetime

from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

# Create your views here.
locks = []


@login_required
def root(request):
	context = {}
	return render(request, 'root.html', context)


@login_required
def glocks(request):
	global locks
	todel = []

	for i in range(len(locks)):
		lock = locks[i]

		if (datetime.datetime.now() - lock[2]).total_seconds() / 60 > 5:
			todel.append(i)

	locks = [locks[i] for i in range(len(locks)) if i not in todel]

	return JsonResponse([x[1] for x in locks])


@login_required
def addLock(request, iid):
	locks.append((request.user, iid, datetime.datetime.now()))
	return HttpResponse(content="Done", status=200)


@login_required
def keepLock(request, iid):
	for lock in locks:
		if request.user == lock[0] and lock[1] == iid:
			lock[2] = datetime.datetime.now()


@login_required
def deleteLock(request, iid):
	global locks

	locks = [l for l in locks if l[0] != request.user and l[1] != iid]

	return HttpResponse(content="Done", status=200)
