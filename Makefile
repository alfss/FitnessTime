REGISTRY_NAME := "fitnesstime-repo"
IMAGE_NAME := "fitnesstime-app"
IMAGE_VERSION := "v1"

all: build save
.PHONY : all

build:
	@echo BUILD IMAGE
	@(docker build -t ${REGISTRY_NAME}/${IMAGE_NAME}:${IMAGE_VERSION} .)
save:
	@echo DUMP IMAGE TO "/Users/skravchuk/TMP/fitnesstime-app_${IMAGE_VERSION}.tar"
	@(docker save ${REGISTRY_NAME}/${IMAGE_NAME}:${IMAGE_VERSION} > "/Users/skravchuk/TMP/fitnesstime-app_${IMAGE_VERSION}.tar")
	@(gzip "/Users/skravchuk/TMP/fitnesstime-app_${IMAGE_VERSION}.tar")

