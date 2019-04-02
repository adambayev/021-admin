node ('ReactNode'){
 try {
  stage('Checkout') {
   checkout scm
  }
  stage('Dependencies install') {
   sh 'npm install'
  }
  stage('Build') {
   sh 'npm run build'
  }
  stage('Deploy') {
   sh 'sudo cp -fR ./build/ /home/ubuntu/app/'
  }
 }
  catch (err) {
    throw err
  }
}
