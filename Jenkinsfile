// 项目根目录 touch Jenkinsfile
pipeline {
    agent {
        docker {
          image 'cypress/base:10' // 这个镜像包含了cypress运行的环境 推荐（不然你懂得 主要还得运维配合）
          args '-u root:root' // 权限配置  不然npm install fail~~~~
        }
   }
 
    environment {
        CHROME_BIN = '/bin/google-chrome' // 全局配置环境变量
    }
    // Jenkins流水线下的配合
    stages {
        stage('下载依赖') { // 第一步pipe
            steps {
                sh 'rm -rf node_modules'
                sh 'npm install'
                sh 'npm rebuild node-sass'
            }
        }
        stage('运行测试') {// 第二步pipe
            steps {
                sh 'npm run test:e2e'
            }
        }
    }
    post {
        always {
            junit 'results/cypress-report.xml' // CI不通过的错误信息配置文件
            // 钉钉通知  完美通知待更新
            script {
                def msg = "【${author}】你把服务器搞挂了，老詹喊你回家改BUG！"
                def imageUrl = "https://www.iconsdb.com/icons/preview/red/x-mark-3-xxl.png"
                if (currentBuild.currentResult=="SUCCESS"){
                    imageUrl= "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png"
                    msg ="【${author}】发布成功，干得不错！"
                }
                dingTalk accessToken:"xxxx",message:"${msg}",imageUrl:"${imageUrl}",messageUrl:"${BUILD_URL}"
            }
        }
    }
}