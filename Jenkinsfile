pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials') // Store Docker Hub credentials in Jenkins
        DOCKER_IMAGE = 'foxe03/resume-builder'
        GIT_USER_NAME = 'Fox-R-FOX'
        GIT_REPO_NAME = 'Resumebuilder' // GitHub repo name
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Fox-R-fox/Resumebuilder.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE}:latest ./backend'
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    sh 'echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh 'docker push ${DOCKER_IMAGE}:latest'
                }
            }
        }

        stage('Update Image in Kubernetes Manifest') {
            steps {
                dir('kubernetes') {
                    withCredentials([string(credentialsId: 'github', variable: 'GITHUB_TOKEN')]) {
                        script {
                            def imageTag = sh(script: 'echo ${BUILD_NUMBER}', returnStdout: true).trim()
                            sh """
                                git config user.email "rohansherkar2207@gmail.com"
                                git config user.name "Fox-R-FOX"
                                echo "Building with image tag ${imageTag}"

                                # Update the Kubernetes deployment YAML with the new image tag
                                sed -i "s|foxe03/resume-builder:.*|${DOCKER_IMAGE}:${imageTag}|g" deployment.yaml

                                # Commit and push changes back to GitHub
                                git add deployment.yaml
                                git commit -m "Update deployment image to version ${imageTag}"
                                git push https://${GITHUB_TOKEN}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME} HEAD:main
                            """
                        }
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Apply Kubernetes manifests after updating the image tag
                    sh 'kubectl apply -f kubernetes/deployment.yaml'
                    sh 'kubectl apply -f kubernetes/service.yaml'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
