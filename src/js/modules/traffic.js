import * as d3 from 'd3'

var citylights = [{
	"city" : "Melbourne min",
	"wait_time" : 65
},{
	"city" : "Melbourne max",
	"wait_time" : 90
},{
	"city" : "Sydney - min",
	"wait_time" : 45
},{
	"city" : "Sydney - max",
	"wait_time" : 90
},{
	"city" : "Brisbane - max",
	"wait_time" : 150
},{
	"city" : "London",
	"wait_time" : 40
},{
	"city" : "Manchester",
	"wait_time" : 60
},{
	"city" : "New York - min",
	"wait_time" : 60
},{
	"city" : "New York - max",
	"wait_time" : 120
},{
	"city" : "Shibuya crossing, Tokyo",
	"wait_time" : 90
}];


function displayTime(time) {
	var seconds = Math.trunc(time);
	var milliseconds = time % 1
	var minutes = seconds/60;
	var displaySeconds = "00"
	var displayMinutes = "00"
	var displayMilliseconds = "00"

	if (minutes >= 1) {
		seconds = seconds - (Math.floor(minutes) * 60)
	}

	if (seconds < 10) {
		displaySeconds = "0" + seconds
	}

	else {
		displaySeconds = seconds
	}

	if (minutes >= 1 && minutes < 10) {
		displayMinutes = "0" + Math.floor(minutes);
	}

	if (milliseconds > 0.99) {
		displayMilliseconds = "00"
	}

	else if (milliseconds <= 0.09) {
		displayMilliseconds = "0" + (milliseconds*100).toFixed();
	}
	else {
		displayMilliseconds = (milliseconds*100).toFixed();
	}
	
	d3.select("#time .minutes").html(displayMinutes)
	d3.select("#time .seconds").html(displaySeconds)
	d3.select("#time .milliseconds").html(displayMilliseconds)
}


export class Traffic {

	constructor() {

		var self = this

		this.seconds = 0

		this.max = 150

		var firstRun = true;

		d3.select("#button").on("click", function() {
			if (firstRun) {
				self.timer('start') 
				firstRun = false	
			}

			else {
				console.log('reset')
				self.timer('reset') 
			}
			
		})

	}


	timer(status) {

		var self = this

		if (status == 'reset') {
			clearTimeout(self.clock);
			// t.stop()
		  	d3.select("#time .minutes").html("00")
			d3.select("#time .seconds").html("00")
			d3.select("#time .milliseconds").html("00")
			self.seconds = 0
			d3.selectAll('.standing_man_svg').style('fill', 'red');
			d3.selectAll('.walking_man_svg').style('fill', 'lightgrey');
			d3.selectAll('.city_time_box').html("");
		}

		this.clock = setInterval(function(){ 

			if (self.seconds < self.max) {

				self.seconds = self.seconds + 1				

				self.citywatch()

			} else {
				clearTimeout(self.clock);
			}

		}, 1000);

		var t = d3.timer(function(elapsed) {
			var display = (elapsed) / 1000
			displayTime(display);
			
		  if (elapsed > 150000) { 
		  	t.stop()
		  	d3.select("#time .minutes").html("02")
			d3.select("#time .seconds").html("30")
			d3.select("#time .milliseconds").html("0")
		  };
		}, 150);

	}

	citywatch() {

		var self = this

		for (var i = 0; i < citylights.length; i++) {

			if (citylights[i].wait_time === self.seconds) {

				console.log(`Update: ${citylights[i].city} - ${citylights[i].wait_time}`)

				d3.selectAll('.standing_man_svg')
				  .each(function(d, index) {if (index===i) d3.select(this).style('fill', 'lightgrey')});

				d3.selectAll('.walking_man_svg')
				  .each(function(d, index) {if (index===i) d3.select(this).style('fill', 'green')});

				document.getElementsByClassName("city_time_box")[i].innerHTML = citylights[i].wait_time + ' sec'
				
			}
			
		}

	}

}