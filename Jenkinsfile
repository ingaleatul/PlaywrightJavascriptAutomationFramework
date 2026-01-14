pipeline {
    agent any

    environment {
        PATH = "/opt/homebrew/bin:$PATH"
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/ingaleatul/PlaywrightJavascriptAutomationFramework.git'
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
                    steps {
                        sh 'npx playwright test --project=chromium'
                    }
                }

                stage('Firefox') {
                    steps {
                        sh 'npx playwright test --project=firefox'
                    }
                }

                stage('Edge') {
                    steps {
                        sh 'npx playwright test --project=msedge'
                    }
                }
            }
        }
    }

    post {

        always {

            // 🔥 THIS CREATES DASHBOARD GRAPHS
            junit 'test-results/results.xml'

            // 📊 Allure Dashboard
            allure(
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            )

            // 📄 Playwright HTML
            publishHTML([
                allowMissing: true,
                keepAll: true,
                alwaysLinkToLastBuild: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])

            archiveArtifacts artifacts: '**/playwright-report/**, **/allure-results/**'
        }

        success {
            echo '✅ Tests passed'
        }

        failure {
            echo '❌ Tests failed'
        }
    }
}
