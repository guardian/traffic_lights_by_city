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

export class Traffic {

	constructor() {

		var self = this

		this.seconds = 0

		this.max = 150

		d3.select("#button").on("click", function() {
			d3.select(".countdown_clock_container").style("display", "block")
			d3.select(this).style("display", "none")
			self.timer() 
		})

	}

	timer() {

		var self = this

		this.clock = setInterval(function(){ 

			if (self.seconds < self.max) {

				self.seconds = self.seconds + 1

				

				self.citywatch()

			} else {
				clearTimeout(self.clock);
			}

		}, 500);

		var t = d3.timer(function(elapsed) {
			var display = (elapsed * 2) / 1000
		  d3.select(".countdown_clock").html(display.toFixed(1))
		  if (elapsed > 150000 / 2) { 
		  	t.stop()
		  	d3.select(".countdown_clock").html(150.0)
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

				document.getElementsByClassName("city_time_box")[i].innerHTML = citylights[i].wait_time + ' seconds'
				
			}
			
		}

	}

}