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
  }
}
