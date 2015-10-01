"use strict";angular.module("studentDashboard",["ui.router","gridster"]),angular.module("studentDashboard").config(["$locationProvider","$urlRouterProvider",function(a,b){a.html5Mode(!0),b.otherwise("students")}]),angular.module("studentDashboard").config(["$stateProvider",function(a){a.state("students",{url:"/students",templateUrl:"templates/students.html",controller:"StudentsCtrl"}).state("school",{url:"/school",templateUrl:"templates/school.html",controller:"StudentsCtrl"})}]),angular.module("studentDashboard").controller("StudentsCtrl",["$scope","$q","Students",function(a,b,c){a.studentsTableHeaders=["Student ID","Name","Grade","Gender","% Days Late","Attendance %"],a.studentTableColumns=["Cohort","Class","Ethnicity","Free or Reduced Lunch","8th Grade Attendance","SY 12-13 Attendance","SY 13-14 Attendance","SY 14-15 Attendance","YTD Attendance","GPA","Transit Distance","Travel Time"],a.range=105,a.setAsSelected=function(b){a.selected=b},a.sortData=function(b){a.predicate=c.mapKey(b),a.reverse=!a.reverse},c.getOverview().then(function(b){a.students=b,d(0)}),a.showStudentDetails=function(a){d(a)};var d=function(d){b.when(c.getStudentDetails(d)).then(function(b){a.studentDetails=b})};a.gridsterOpts={columns:6,pushing:!0,floating:!0,swapping:!1,width:"auto",colWidth:"auto",rowHeight:"match",margins:[20,20],outerMargin:!0,isMobile:!1,mobileBreakPoint:600,mobileModeEnabled:!0,minColumns:1,minRows:2,maxRows:100,defaultSizeX:2,defaultSizeY:1,minSizeX:1,maxSizeX:null,minSizeY:1,maxSizeY:null,resizable:{enabled:!0,handles:["n","e","s","w","ne","se","sw","nw"],start:function(a,b,c){},resize:function(a,b,c){},stop:function(a,b,c){}},draggable:{enabled:!0,handle:".my-class",start:function(a,b,c){},drag:function(a,b,c){},stop:function(a,b,c){}}}}]),angular.module("studentDashboard").directive("navbar",function(){return{restrict:"A",templateUrl:"templates/navbar.html",link:function(a,b,c){$(".button-collapse").sideNav(),a.tab="Students"}}}),angular.module("studentDashboard").directive("preloader",function(){return{restrict:"A",template:'<div class="progress preloader"><div class="indeterminate"></div></div>',link:function(a,b,c){}}}),angular.module("studentDashboard").directive("search",function(){return{restrict:"A",templateUrl:"/templates/search.html"}}),angular.module("studentDashboard").directive("slider",function(){return{restrict:"A",templateUrl:"/templates/slider.html"}}),angular.module("studentDashboard").directive("widgetTable",function(){return{restrict:"A",link:function(a,b,c){b.addClass("bordered centered highlight responsive-table")}}}),angular.module("studentDashboard").directive("widget",function(){return{restrict:"A",link:function(a,b,c){b.addClass("custom-widget z-depth-1"),b.children(1).wrap('<div class="widget-body"></div>');var d=c.header,e='<div class="widget-header z-index-1"><h1 class="widget-header-title">'+d+"</h1></div>";b.prepend(e),c.$observe("header",function(a){d='<div class="widget-header z-index-1"><h1 class="widget-header-title">'+a+"</h1></div>",$(b).find(".widget-header").replaceWith(d)})}}}),angular.module("studentDashboard").filter("attendance",["percentageFilter",function(a){return function(b,c){var d=[];return b&&b.forEach(function(b){b.attendanceYtd&&a(b.attendanceYtd)<=c&&d.push(b)}),d}}]),angular.module("studentDashboard").filter("percentage",function(){return function(a){return parseInt(100*a)}}),angular.module("studentDashboard").factory("Students",["$http","$q",function(a,b){var c="",d=function(){return c?c:a.get("/api/student-data").then(function(a){return a.data.error?void console.log("ERROR: ",a.data.error):(c=a.data,a.data)})},e=0,f=function(a){this.studentId=a.studentId,this.studentName=a.studentName,this.grade=a.grade,this.gender=a.gender,this.percentDaysLateSy1415=a.percentDaysLateSy1415,this.attendanceYtd=a.attendanceYtd,this.index=e},g=function(a){this.studentName=a.studentName,this.cohort=a.cohort,this.grade=a.grade,this.officialClass=a.officialClass,this.schoolName=a.schoolName,this.admitDate=a.admitDate,this.gender=a.gender,this.ethnicity=a.ethnicity,this.freeOrReducedLunch=a.freeOrReducedLunch,this.attendance8thGrade=a.attendance8thGrade,this.transitDistanceMiles=a.transitDistanceMiles,this.transitTimeMinutes=a.transitTimeMinutes,this.attendanceSy1213=a.attendanceSy1213,this.attendanceSy1314=a.attendanceSy1314,this.attendanceSy1415=a.attendanceSy1415,this.percentDaysLateSy1415=a.percentDaysLateSy1415,this.attendanceYtd=a.attendanceYtd,this.transcriptGradeAverage=a.transcriptGradeAverage,this.plannedGraduationDate=a.plannedGraduationDate},h=function(){var a=[];return b.when(d()).then(function(b){return b.forEach(function(b){a.push(new f(b)),e++}),a})},i=function(a){return new g(c[a])},j=function(a){var b=new f(c[0]);return Object.keys(b)[a]};return{getData:d,getOverview:h,getStudentDetails:i,mapKey:j}}]);