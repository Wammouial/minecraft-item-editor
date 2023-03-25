from django.core.management.base import BaseCommand
from editor.mockdata import setMockData


class Command(BaseCommand):
    help = 'My custom command'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Generating mockdata...'))
        setMockData()
        self.stdout.write(self.style.SUCCESS('Mockdata generated'))

