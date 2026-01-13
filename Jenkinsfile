pipeline {
    agent any

    options {
        // Keep only last 10 builds
        buildDiscarder(logRotator(numToKeepStr: '10'))
        // Timeout for the pipeline
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        stage('Checkout') {
            steps {
                echo "🔄 Checking out code from GitHub..."
                git branch: 'main', url: 'https://github.com/ingaleatul/PlaywrightJavascriptAutomationFramework.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "📦 Installing npm dependencies..."
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                    nvm use 25
                    npm install
                '''
            }
        }

        stage('Run Playwright Tests') {
            parallel {
                stage('Chrome') {
                    steps {
                        echo "🌐 Running tests on Chrome..."
                        sh '''
                            export NVM_DIR="$HOME/.nvm"
                            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                            nvm use 25
                            npx playwright test --project=chromium --reporter=html
                        '''
                    }
                }
                stage('Firefox') {
                    steps {
                        echo "🦊 Running tests on Firefox..."
                        sh '''
                            export NVM_DIR="$HOME/.nvm"
                            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                            nvm use 25
                            npx playwright test --project=firefox --reporter=html
                        '''
                    }
                }
                stage('Edge') {
                    steps {
                        echo "🟦 Running tests on Edge..."
                        sh '''
                            export NVM_DIR="$HOME/.nvm"
                            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                            nvm use 25
                            npx playwright test --project=msedge --reporter=html
                        '''
                    }
                }
            }
        }

        stage('Archive Reports') {
            steps {
                echo "📄 Archiving Playwright HTML reports..."
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                publishHTML([
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ])
            }
        }
    }

    post {
        success {
            echo "✅ All tests passed!"
        }
        failure {
            echo "❌ Some tests failed! Check the Playwright HTML report."
        }
    }
}
