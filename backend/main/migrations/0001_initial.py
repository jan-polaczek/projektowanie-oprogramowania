# Generated by Django 3.2.8 on 2021-10-28 18:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ForestryDistrict',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=48)),
            ],
        ),
        migrations.CreateModel(
            name='Forestry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('forester', models.IntegerField()),
                ('name', models.CharField(max_length=48)),
                ('area', models.DecimalField(decimal_places=2, max_digits=10)),
                ('forestry_district', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.forestrydistrict')),
            ],
        ),
    ]
