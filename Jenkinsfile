pipeline {
    agent any
    
    environment {
        NODE_ENV = 'test'
        PATH = "$PATH:/usr/local/bin"
        CI = 'true'
        // Playwright configuration for CI
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}/pw-browsers"
        PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = 'true'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Node.js') {
            steps {
                script {
                    // Check if Node.js is available
                    def nodeVersion = sh(script: 'node --version || echo "not found"', returnStdout: true).trim()
                    if (nodeVersion == "not found") {
                        // Install Node.js using NodeSource repository (for Ubuntu/Debian)
                        sh '''
                            curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
                            sudo apt-get install -y nodejs
                        '''
                    }
                    echo "Node.js version: ${sh(script: 'node --version', returnStdout: true).trim()}"
                    echo "npm version: ${sh(script: 'npm --version', returnStdout: true).trim()}"
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                script {
                    sh 'npx playwright install chromium firefox'
                }
            }
        }
        
        stage('Code Quality - Linting & Formatting') {
            parallel {
                stage('ESLint Check') {
                    steps {
                        sh 'npm run lint:strict'
                    }
                }
                
                stage('Prettier Check') {
                    steps {
                        sh 'npm run format:check'
                    }
                }
            }
        }
        
        stage('UI Tests with Playwright') {
            steps {
                script {
                    sh 'npm run test:playwright'
                }
            }
            post {
                always {
                    script {
                        // Archive test results and reports
                        if (fileExists('test-results')) {
                            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                        }
                        
                        if (fileExists('playwright-report')) {
                            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
                            echo '� Playwright HTML report archived in build artifacts'
                        } else {
                            echo '⚠️ No test report found'
                        }
                    }
                }
            }
        }
    }
    
    post {
        always {
            script {
                def duration = currentBuild.durationString
                echo "🕐 Pipeline completed in ${duration}"
            }
            cleanWs()
        }
    }
}