REGISTRY_NAME := "fitnesstime-repo"
IMAGE_NAME := "fitnesstime-app"
IMAGE_VERSION := "v11"

all: build save
.PHONY : all

build:
	@echo BUILD IMAGE
	@(docker build -t ${REGISTRY_NAME}/${IMAGE_NAME}:${IMAGE_VERSION} .)
save:
	@echo DUMP IMAGE TO "${HOME}/TMP/fitnesstime-app_${IMAGE_VERSION}.tar"
	@(docker save ${REGISTRY_NAME}/${IMAGE_NAME}:${IMAGE_VERSION} > "${HOME}/TMP/fitnesstime-app_${IMAGE_VERSION}.tar")
	@(gzip "${HOME}/TMP/fitnesstime-app_${IMAGE_VERSION}.tar")

