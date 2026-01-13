pipeline {
    agent any

    environment {
        PATH = "/opt/homebrew/bin:$PATH"  // global Node
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
    }

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
            parallel {
                stage('Chrome') {
                    steps { sh 'npx playwright test --project=chromium' }
                }
                stage('Firefox') {
                    steps { sh 'npx playwright test --project=firefox' }
                }
                stage('Edge') {
                    steps { sh 'npx playwright test --project=msedge' }
                }
            }
        }

        stage('Publish Playwright HTML Report') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                publishHTML([
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report'
                ])
            }
        }

        stage('Publish Allure Report') {
            steps {
                // Publish Allure from allure-results
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }

    post {
        success { echo "✅ All tests passed!" }
        failure { echo "❌ Some tests failed! Check Playwright & Allure reports." }
    }
}
