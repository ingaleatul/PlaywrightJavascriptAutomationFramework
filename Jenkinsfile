pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ingaleatul/PlaywrightJavascriptAutomationFramework.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test --reporter=html'
            }
        }

        stage('Archive Report') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                publishHTML([allowMissing: true,
                             alwaysLinkToLastBuild: true,
                             keepAll: true,
                             reportDir: 'playwright-report',
                             reportFiles: 'index.html',
                             reportName: 'Playwright Report'])
            }
        }
    }

    post {
        success { echo "✅ Tests Passed!" }
        failure { echo "❌ Tests Failed!" }
    }
}
