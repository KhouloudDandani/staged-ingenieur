pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout scm
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    nodejs('node') {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    nodejs('node') {
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    nodejs('node') {
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                // Add deployment steps here
            }
        }
    }

    post {
        always {
            // Clean up or notify
        }
    }
}
    