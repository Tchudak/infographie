const canvasDrop = document.querySelector('#rainDrop');

let rainDrop = new Image();
rainDrop.addEventListener('load', () => {
    console.log(rainDrop)
    startRAF();
});
rainDrop.src = "./img/svg/water-drop.svg";

let animationTimer = 0;
let startTime = 0;
// Fréquence d'affichage maximum
const maxfps = 60;
const interval = 1000 / maxfps;

function startRAF(timestamp = 0) {
	animationTimer = requestAnimationFrame(startRAF);
	if (startTime === 0) startTime = timestamp;
	let delta = timestamp - startTime;
	if (delta >= interval) {

        clearCanvas(canvasDrop);
        rain.move();
        rain.draw();

		startTime = timestamp - (delta % interval);
	}
}

function stopRAF() {
	cancelAnimationFrame(animationTimer);
	animationTimer = 0;
}

function clearCanvas(canvas) {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

class Drop {
    constructor(velocity, size, canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
  
      this.velocity = velocity;
      this.delay = Math.floor(Math.random() * this.canvas.height);
      this.size = size;
      this.img = new Image();
      this.img.src = "./img/svg/water-drop.svg";

      this.scaleX = 0;
      this.scaleY = 0;
      this.x = 0;
      this.y = 0;
  
      // Charger l'image une seule fois en dehors de la méthode draw()
      this.img.onload = () => {
        console.log("loaded");
        this.scaleX = this.img.width * this.size;
        this.scaleY = this.img.height * this.size;
        this.x = Math.floor(Math.random() * (this.canvas.width - this.scaleX * 2));
        this.y = -this.scaleY;
        this.ctx.drawImage(this.img, this.x, this.y, this.scaleX, this.scaleY);
        this.loaded = true;
      };
  
    //   this.scaleX = this.img.width * this.size;
    //   this.scaleY = this.img.height * this.size;
  
    //   this.x = Math.floor(Math.random() * (this.canvas.width - this.scaleX * 2));
    //   this.y = -this.scaleY;
  
    //   // Charger l'image une seule fois en dehors de la méthode draw()
    //   this.img.onload = () => {
    //     this.ctx.drawImage(this.img, this.x, this.y, this.scaleX, this.scaleY);
    //   };
    }
  
    draw() {
        if (this.delay > 0) return;
        if (this.loaded) {
          // La méthode draw() ne charge plus l'image, elle se contente de la dessiner
          this.ctx.drawImage(this.img, this.x, this.y, this.scaleX, this.scaleY);
        }
      }
  
    move() {
          if (this.delay > 0) {
            this.delay--;
            return;
          }

          this.y += this.velocity;
          this.velocity *= 1.005;
  
          if (this.y > this.canvas.height) {
            this.y = -this.scaleY;
            this.x = Math.floor(Math.random() * (this.canvas.width - this.scaleX));
            this.velocity = Math.floor(Math.random() * 2) + 10;
          }
      }
  }
  

class Rain {
    constructor(amount, canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        
        this.amount = amount;
        this.canvas = canvas;
        this.drops = [];
        
        // Facteur de changement
        this.randomizerVelocity = 2;
        this.velocity = 10;
        this.randomizerSize = .4;

        for (let i = 0; i < amount; i++) {

            this.drops.push(
                new Drop(
                    Math.floor(Math.random() * this.randomizerVelocity) + this.velocity, 
                    Math.random() * this.randomizerSize + .8, 
                    canvas
                )
            )
        }
    }

    draw() {
        this.drops.forEach(drop => {
            drop.draw();
        })
    }

    move() {
        this.drops.forEach(drop => {
            drop.move();
        })
    }
}

const rain = new Rain(10, canvasDrop)



// Charte conso d'eau
var canvasElement = document.getElementById("cookieChart");

Chart.register(ChartDataLabels);

const img1 = new Image();
img1.src = "./img/bar_tracteur.png";

const img2 = new Image();
img2.src = "./img/bar_centrale.png"

const img3 = new Image();
img3.src = "./img/bar_robinet.png"


const datapoints = [45, 31, 21, 4];

const barAvatar = {
    id: 'barAvatar',
    afterDatasetsDraw(chart, args, options) {
        const t = {
            ctx,
            chartArea: {
                top,
                bottom,
                left,
                right,
                width,
                height
            },
            scales: {
                x,
                y
            }
        } = chart;
        ctx.save();

        // console.log(y.getPixelForValue(0));
        ctx.drawImage(img1, x.getPixelForValue(0) - (220 / 2), y.getPixelForValue(15) + 2, 180, 150),
            ctx.drawImage(img2, x.getPixelForValue(1) - (150 / 2), y.getPixelForValue(11) + 8, 150, 100),
            ctx.drawImage(img3, x.getPixelForValue(2) - (40 / 2), y.getPixelForValue(11) - 30, 130, 130)
    }
}


var config = {
    type: "bar",
    options: {
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#E8B14A",
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    display: false,
                }
            }
        },
        responsive: true,
        tooltips : false,
        // plugins: {
        //     legend: {
        //         display: false,
        //     }
        // },
    },
    data: {
        labels: ["Agriculuture", "Centrale nucléaire", "Production d'eau potable", "Usage d'eau potable"],
        datasets: [{
            label: "",
            data: datapoints,
            backgroundColor: [
                "#d19525",
                "#daaa51",
                "#e3bf7c",
                "#edd5a8",
            ],
            borderColor: [
                "#d19525",
                "#daaa51",
                "#e3bf7c",
                "#edd5a8",
            ],
            borderWidth: 1,
            datalabels: {
                formatter: (value, categories) => {
                    return value + '%';
                },
                color: '#d19525',
                anchor: 'end',
                align: 'top',
                font: {
                    size: '23',
                    weight: 'bolder'
                }
            },
        }, ]
    },
    plugins: [barAvatar, ChartDataLabels]
};

var cookieCHart = new Chart(canvasElement, config)

Chart.defaults.font.size = 14;
Chart.defaults.font.weight = 'bold';


// Chart "A quoi sert l'eau dans l'agriculture"
// Données
const data = {
    labels: ['Abreuvement', 'Elevage', 'Entretien des bâtiments'],
    datasets: [{
        label: 'Pourcentage utilisation eau',
        data: [80, 15, 10],
        backgroundColor: [
            '#be9039',
            '#cba661',
            '#dccaa7',
        ],
        borderColor: [
            '#be9039',
            '#cba661',
            '#dccaa7',
        ],
        borderWidth: 1,
        offset: 75,
    }]
};

// Configuration 
const pie = {
    type: 'pie',
    data,
    options: {
        plugins: {
            datalabels: {
                formatter: (value) => {
                    return value + '%';
                },
                color: '#ffffff',
                anchor: 'end',
                align: 'start',
                font: {
                    size: '25',
                    weight: "bolder"
                }
            },
                legend: {
                    display: false,
                },
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
        }
    }
};

// Le render
const myChart = new Chart(
    document.getElementById('pieChart'),
    pie
);


// INFO BUTTON
const infoButton = document.querySelectorAll('#infoButton');



infoButton.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('info-button--show')
        console.log(button.classList)
    });
})
