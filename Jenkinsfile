pipeline {
  agent any
  triggers {
        GenericTrigger(
            genericVariables: [
                [key: 'myHash', value: '$.after'],
            ],
            token: 'back'
        )
  }
  stages {
    stage('Build Image') {
      steps {
        script {
          docker.build("parandzem/back")
          }
        }
      }
    stage('Give Tag and Push Image') {
      steps {
        script {
	  def tmp = env.myHash
	  def mytag = tmp.substring(0, 7)
          docker.withRegistry('https://index.docker.io/v1/', 'docker-pat') {
            docker.image("parandzem/back").push(mytag)
          }
        }
      }
    }
    stage('Cloning and Changing') {
      steps {
	git(
	  url: "https://github.com/DavoA/TaskDevops.git",
	  branch: "main",
	  changelog: true,
	  poll: true
	)
	sh 'bash changing_back.sh'
	sh 'cat docker-compose.yml'
      }
    }
    stage('Commiting and Pushing') {
      steps {
	sh "git add ."
        sh "git commit -m 'changing 1'"
	withCredentials([gitUsernamePassword(credentialsId: 'github-pat', rnameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
           sh "git push -u origin main"
        }
      }
    }  
  }
}
