// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('calorie', ['ionic'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.factory('Projects', function() {
  return {
    all: function() {
      var projectString = window.localStorage['Projects'];
      if(projectString) {
        return angular.fromJson(projectString);
      }
      return ['kkk'];
    },
    //save: function(projects) {
      //window.localStorage['projects'] = angular.toJson(projects);
    //},
    newProject: function(projectTitle) {
      // Add a new project
      return {
        title: projectTitle,
        tasks: []
      };
    },
    getLastActiveIndex: function() {
      return 'Its a me';
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveProject'] = index;
    }
  }
})

.controller('CalCtrl', function($scope, $timeout, $ionicModal, Projects, $ionicSideMenuDelegate) {

  // A utility function for creating a new project
  // with the given projectTitle
  var createProject = function(projectTitle) {
    var newProject = Projects.newProject(projectTitle);
    $scope.projects.push(newProject);
    Projects.save($scope.projects);
    $scope.selectProject(newProject, $scope.projects.length-1);
  }


  // Load or initialize projects
  $scope.projects = [
    { title: 'Collect coins' },
    { title: 'Eat mushrooms' },
    { title: 'Get high enough to grab the flag' },
    { title: 'Find the Princess' }
  ];;

  // Grab the last active, or the first project
  $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

  // Called to create a new project
  $scope.newProject = function() {
    var projectTitle = prompt('Project name');
    if(projectTitle) {
      createProject(projectTitle);
    }
  };

  // Called to select the given project
  $scope.selectProject = function(project, index) {
    $scope.activeProject = project;
    Projects.setLastActiveIndex(index);
    $ionicSideMenuDelegate.toggleLeft(false);
  };

  // Create our modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope
  });

  $scope.createTask = function(task) {
    if(!$scope.activeProject || !task) {
      return;
    }
    $scope.activeProject.tasks.push({
      title: task.title
    });
    $scope.taskModal.hide();

    // Inefficient, but save all the projects
    Projects.save($scope.projects);

    task.title = "";
  };

  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  }

  $scope.toggleProjects = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };


  

})

function entCal(){
	var x = document.getElementById('calenter').value;
	var y = parseInt(x);
    var currentCals = parseInt(document.getElementById("cals").innerHTML)+ y;
	if(currentCals <=0){
        document.getElementById("cals").innerHTML = 0;
		document.getElementById("calenter").innerHTML = 0;
    }else{
        document.getElementById("cals").innerHTML = currentCals;
		document.getElementById("calenter").innerHTML = 0;
    }
}
	
	
	
function addCal(setCals){
    var setCal = parseInt(setCals);
    var currentCals = parseInt(document.getElementById("cals").innerHTML)+ setCal;
    if(currentCals <=0){
        document.getElementById("cals").innerHTML = 0;
    }else{
        document.getElementById("cals").innerHTML = currentCals;
    }
}

function resetButton() {
	document.getElementById("cals").innerHTML = 0;
}

function BMImetric() {
  var a = document.getElementById('varA').value;
  var b = document.getElementById('varB').value;
  var c = Number(a) / ( Number(b) * Number(b));
  document.getElementById("BMI").innerHTML = c;
}

function BMIimperal() {
  var a = document.getElementById('varA').value;
  var b = document.getElementById('varB').value;
  var c = (Number(a) * 703) / ( Number(b) * Number(b));
  document.getElementById("BMI").innerHTML = c;
}
