# Generated by Django 4.2.7 on 2023-11-30 10:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("youtube", "0002_alter_category_category_name"),
    ]

    operations = [
        migrations.AlterField(
            model_name="video",
            name="category",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="youtube.category",
            ),
        ),
        migrations.AlterField(
            model_name="video",
            name="channel",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="youtube.youtuber",
            ),
        ),
        migrations.AlterField(
            model_name="video",
            name="region",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="youtube.region",
            ),
        ),
    ]
