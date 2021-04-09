//Jenkinsfile(声明式流水线)
pipeline{ //pipeline是声明式流水线的特定语法，它定义包含执行整个流水线的所有内容和指令
	agent any //agent是声明式流水线的特定语法，它指示Jenkins在节点上为整个流水线分配一个执行器和工作区
	stages{
		stage('Build'){ //stage是一个描述stage of this pipeline的语法块
			steps{ // steps是声明式流水线的一种特定语法，它描述了该stage中要运行的步骤
				sh 'make' //sh是一个执行给定命令的流水线step
			}
		}
		stage('Test'){
			steps{
				sh 'make check'
				junit 'reports/**/*.xml' //junit是另一个聚合测试报告的流水线step
			}
		}
		stage('Deploy'){
			steps{
				sh 'make publish'
			}
		}
		tools{
			Node.js 'Node.js 13'
		}
		environment{
			CHROME_BIN='/bin/google-chrome'
		}
	}
}
