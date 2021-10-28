@echo OFF

echo Validating files...

IF NOT EXIST mount (
	echo Missing directory "mount", creating...
	mkdir mount
	echo Created directory mount
)
docker-compose up