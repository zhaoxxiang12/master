@Library('weiyi-pipeline-library@0.0.2') _

pipeline {

  agent {
    // Setup:
    //  before starting Jenkins, I have created several volumes to cache
    //  NPM modules and Cypress binary
    // docker volume create npm-cache
    // docker volume create cypress-cache
    // this image provides everything needed to run Cypress
    // https://github.com/cypress-io/cypress-docker-images/tree/master/browsers
    docker {
      image 'cypress/browsers:node14.7.0-chrome84'
      args '-v npm-cache:/root/.npm \
            -v cypress-cache:/root/.cache'
    }
  }

  environment {
    // dingTalk API
    DingTalkHook = "https://oapi.dingtalk.com/robot/send?access_token=0c5298bf74b9ab6aefed2c870f3e34a89d443587ba8fa28e61a4fbaf6eb385f8"
  }

  stages {
    // first stage installs node dependencies and Cypress binary
    stage('Prepare') {
      steps {
        script {
            devops.sendDingTalk("测试环境准备中")
        }
        echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
        sh 'node -v'
        sh 'npm -v'
        sh 'npm config set registry https://registry.npm.taobao.org'
        sh 'npm i'
        sh 'npm run cy:verify'
      }
    }

    // this stage runs end-to-end tests, and each agent uses the workspace
    // from the previous stage
    stage('Run cypress tests') {
      steps {
        script {
            devops.sendDingTalk("测试开始 🎬")
        }
        echo "Running build ${env.BUILD_ID}"
        sh "npm run test"
      }
    }
  }

  post {
      always {
        echo 'This will always run'
        // Archive the artifacts
        archiveArtifacts 'cypress/results/**/*.* , cypress/screenshots/**/*.* , cypress/videos/**/*.*'
      }
      success {
        echo 'Test Passed.'
        script{
          devops.sendDingTalk("测试通过 ✅")
        }
      }
      failure {
        echo 'Test Failed.'
        script{
          devops.sendDingTalk("测试失败 ❌")
        }
      }
  }
}
