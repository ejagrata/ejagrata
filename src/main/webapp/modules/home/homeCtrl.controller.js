(function () {
	"use strict";

	angular
	.module('eJag')
	.controller('homeController', homeController);

	/* ngInject */
	function homeController($scope, $state, appConfig, apiService) {
		var vm = this;
		init();

		function init($scope) {
			vm.appName = appConfig.title;
			vm.subTitle = appConfig.subTitle;

			// reaveal these elements when scoll happens
			window.sr = ScrollReveal();
			// for app title
			sr.reveal('.sr-appTitle', {
				duration: 1500,
				scale: 0.3,
				distance: '20px'
			});
			// for image collash
			sr.reveal('.sr-eventImg', {
				duration: 1500,
				scale: 0.3,
				distance: '20px'
			});
			// for educational districts
			sr.reveal('blockquote', {
				duration: 1000,
				scale: 0.3,
				distance: '0px'
			}, 200);
		}

		vm.viewSchool = function (edDistId) {
			$state.go('app.schoolList', {
				distId: 1,
				edDistId : edDistId
			});
		}

		vm.showPopUp = function (popHeading) {
			if (popHeading == 'tcs') {
				var body = "<p>TCS <b>(TATA Consultancy Services Ltd.)</b> is a global leader in IT services, digital and business"
					+"solutions that partners with its clients to simplify, strengthen and transform their businesses."
					+"TCS has been recognized by Brand Finance as one of the Big 4 Global IT Services Brands. Along"
					+"with ensuring the highest levels of certainty and satisfaction to the clients, TCS always believes in"
					+"giving back to society and has created a strong CSR (Corporate Social Responsibility) foot print.<br><br>"
					+"TCS’ commitment to CSR stems from Tata Group’s abiding concern for society and environment. At TCS,"
					+"CSR programs seek to create sustainable well-being. The guiding principle is 'Impact through Empowerment',"
					+"where outcomes and measureable impacts are delivered through a long term sustained effort.<br>"
					+"TCS team was involved in the e-Jagratha pro​ject from its initial days of conceptualization. The core team formed worked"
					+"closely with the honorable District Collector​ Mr.​ K. Mohammed Y. Safirulla ​ IAS, ​to​wards​ understand​ing​ his"
					+"vision and implement​ing​ it. <br><br>"
					+"Once the pro​ject was defined​,​ the team started working on the course content, coming up with detailed"
					+"training documentation in both English and Malayalam and presentations. The entire content was created"
					+"from scratch and this course content was reviewed with the IT mission representatives to ensure that the"
					+"course is indeed covering all the required focus areas. Handouts and other supporting documents were prepared"
					+"for ensuring that the master trainers are not missing any information which they need.<br><br>"
					+"The TCS team ​worked in parallel with the district administration for the master training for Phase 1." 
					+"The training was conducted in TCS premises in two separate sessions and the trainings were conducted by the"
					+"TCS team on 12th and 19th of November 2016 ​covering​ 101 government high schools. Mr. Francis Perera (Ex. Cyber Cell Officer)"
					+"from TCS Admin has shared his experience with the attendees, which was a highlight for the master training.<br><br>"
					+"Once the ​'​​Train the Trainer' ​event ​was concluded for Phase 1, the immense task before the TCS team was to support the in​- school"
					+"training ​for all the 101 schools by th​e​s​e​ master trainers. The team tracked the trainings in individual schools and TCS volunteers"
					+"were present to support the master trainers when they were spreading the awareness on internet to their school mates."
					+"After the conclusion of the Phase 1, the team regrouped for the preparation and execution of Phase 2 master training. The Phase 2 trainings were executed on 5th and 6th of January 2017.<br><br>"
					+"Around close to 75 associates have contributed their efforts towards e-jagratha till now and this count is keeping on increasing​."
					+"Associates involved in the ejagratha pro​ject has always expressed their happiness and satisfaction on"
					+"how they are helping the next generation to be more aware on the consequences of increased internet and mobile usage.</p>";
				apiService.showPopUp("Team TCS", body);
			} else {
				var body = "<p>e-Jagratha, the internet awareness project was launched by Ernakulam District Administration under the"
					+"meticulous guidance of honorable District Collector Mr. K. Mohammed Y. Safirulla IAS.<br><br>"
					+"With more digitalization, the world is becoming small today. Access to information and communication"
					+"across the world is becoming easier. Internet is influencing today’s society in all aspects of life, be it"
					+"education, shopping, banking or any other activity. But at the same time, the crime rate in the web"
					+"world is also growing. What can be done to create a society which use internet to bring out the"
					+"advantages it offers and at the same time keep the dangers at bay.<br><br>"
					+"With this thought, our respected District Collector Mr. K. Mohammed Y. Safirulla IAS, came up with the"
					+"idea of eJagratha. Today’s students are tomorrow’s citizen. If the students are educated of the"
					+"intricacies involved in internet usage, we believe that we can create a society that is more aware on"
					+"where to pause in internet.<br><br>"
					+"eJagratha focuses on bringing the basic awareness on internet usage among High School students. The"
					+"program along with bringing out the possibilities of e-world, creates awareness on the cyber threats and the cyber laws.<br><br>"
					+"This program was conceptualized in September 2016 and currently Phase 2 activities are going on.<br><br>"
					+"<b><u>Phase 1</u></b><br>"
					+"Phase 1 spanned from October to December 2016. Phase 1 was launched by our respected Revenue"
					+"Principal Secretary Mr. P.H. Kurian IAS, on 21 st October 2016.<br><br>"
					+"Phase 1 included the below activities:<br><br>"
					+"1) Creating the course content<br>"
					+"2) Master training of identified candidates from 101 Government schools in Ernakulam district<br>"
					+"3) Propagation of the training to rest of the school students by Master trainers in TCS volunteer presence<br><br>"
					+"The master training by TCS was conducted on 12 th and 19 th of November 2016, at TCS Center.<br><br>"
					+"<b><u>Phase 2</u></b><br>"
					+"The second phase focuses on extending the eJagratha training to 175 aided schools in Ernakulam"
					+"District. The unaided schools attended the master training conducted, at TCS Center, on 5th and 6th"
					+"January 2017. The trainings in schools by the master trainers are planned to be completed by the end of February.<br><br>"
					+"The Phase 2 activities also include:<br><br>"
					+"1) Awarding cash prize (Rs. 1000) for 3 best performing students identified from the schools involved in both phases<br>"
					+"2) Creating a bank account for these students<br>"
					+"3) Providing basic e-banking information to these students<br><br>"
					+"The vision for the upcoming phases is to spread cyber awareness to unaided school students and to their parents.";
				apiService.showPopUp("e-Jagratha : A Glance", body);
			}
		}
	}

})();