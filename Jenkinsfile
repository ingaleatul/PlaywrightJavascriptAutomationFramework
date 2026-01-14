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
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests (Parallel)') {
            parallel {

                stage('Chrome') {
                    steps {
                        sh '''
                          npx playwright test --project=chromium \
                          --reporter=junit \
                          --output=test-results/chrome
                        '''
                    }
                }

                stage('Firefox') {
                    steps {
                        sh '''
                          npx playwright test --project=firefox \
                          --reporter=junit \
                          --output=test-results/firefox
                        '''
                    }
                }

                stage('Edge') {
                    steps {
                        sh '''
                          npx playwright test --project=msedge \
                          --reporter=junit \
                          --output=test-results/edge
                        '''
                    }
                }
            }
        }

        stage('Publish JUnit Test Results') {
            steps {
                junit allowEmptyResults: true,
                      testResults: 'test-results/**/junit*.xml'
            }
        }

        stage('Generate Playwright HTML Report') {
            steps {
                sh 'npx playwright show-report'
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
                allure(
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                )
            }
        }
    }

    post {
        success {
            echo "✅ All tests passed!"
        }

        failure {
            echo "❌ Some tests failed! Check Jenkins Test Results & Allure report."
        }

        always {
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-results/**', allowEmptyArchive: true
        }
    }
}
