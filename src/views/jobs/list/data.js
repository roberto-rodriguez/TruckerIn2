const pratikImg = require("../../../../assets/contacts/pratik.png");
const atulImg = require("../../../../assets/contacts/atul.png");
const meghaImg = require("../../../../assets/contacts/megha.png");
const sauravImg = require("../../../../assets/contacts/saurav.png");


const data = [
  {
    id: 1,
    userName: "Kumar Pratik",
    userId: 2,
    authorRole: 'Broker',
    location:'Atlanta, GA',
    locationId: 1,
    createdAt: 1516229372464,
    desc:
      "As a driver , you're important everywhere you go. Businesses and customers are excited to see you. You help companies get their products to the people who need them. And when you drive a Ryder Truck, you play an important part in keeping the economy moving. People around the world rely on you everyday to keep their businesses running smoothly. Ryder has openings for Part Time/Casual Drivers in your area. Our drivers earn excellent money and get paid weekly. If you are ready to take the next step in your career, we invite you to apply today.",
      profileImg: 'http://www.truckercpa.com/newimages/truckerWindow.png',
    equipmentId:2,
    equipment: 'Dump Truck',
    experienceId:4,
    experience: 'More than 2 years',
    compensation: '34.50 per load',
    apps:2
  },
  {
    id: 2,
    userName: "Atul Ranjan",
    userId: 3,
    authorRole: 'Broker',
    location:'Miami, FL',
    locationId: 2,
    createdAt: 1516228373464,
    desc:
      "Enthusiast problem solver with expertise in full stack modern, scalable and efficient web development with the use of modern technologies such as AngularJS, Angular 2.0, Node.js, BackboneJS, PHP, HTML and CSS.\nThe Most Amazing thing I've created is a unique Restaurant Management System designed to automate common restaurant functions like Kitchen Order Dockets, Table Reservations, Billing, Inventory & Sales Reports and an efficient communication system between Kitchen and Waiter...",
    equipmentId:5,
    equipment: 'Tractor',
    experienceId:6,
    experience: 'More than 5 years',
    compensation: '65 cents per load',
    apps:0
  },
  {
    id: 3,
    userName: "Megha Kumari",
    userId: 4,
    authorRole: 'Broker',
    location:'New York, NY',
    locationId: 3,
    createdAt: 1516984387990,
    profileImg:'http://www.standard.net/image/2015/01/08/970xa16-9_b0_q100_p1/Female-trucker-2.jpg',
    desc: "Expert UI / UX developer with strong knowledge of HTML5, CSS3 and Javascript with frameworks like Bootstrap 3 and AngularJS. Love to do UI / UX.\nI've created StrapUI - A market place for bootstrap themes.",
    equipmentId:4,
    equipment: 'Tanker',
    experienceId:4,
    experience: 'More than 2 years',
    compensation: '$55,000 to $65,000 in annual income',
    apps:3
  },
  {
    id: 4,
    userName: "Saurav",
    userId: 5,
    authorRole: 'Broker',
    location:'Fourt Loudardale, FL',
    locationId: 4,
    createdAt: 1516084387990,
    desc: "Top Developer with distinguished experience in Front-end web technologies like AngularJS, Angular 2.0, SailsJS, Node.js, ExpressJS, MongoDB and MySQL with proven knowledge in developing realcreatedAt and interactive dashboard application.\nI've created Server Monitoring App in ReactJS. It monitors over 150 servers and displays their performances, notifies us when any of the server is down.",
    equipmentId:3,
    equipment: 'Hauler',
    experienceId:5,
    experience: 'More than 3 years',
    compensation: '51 to 58 cents per mile',
    apps:1
  },
  {
    id: 5,
    userName: "John Smith",
    userId: 6,
    authorRole: 'Broker',
    location:'West Palm Beach, FL',
    locationId: 5,
    createdAt: 1515084387990,
    desc: "Top Developer with distinguished experience in Front-end web technologies like AngularJS, Angular 2.0, SailsJS, Node.js, ExpressJS, MongoDB and MySQL with proven knowledge in developing realcreatedAt and interactive dashboard application.\nI've created Server Monitoring App in ReactJS. It monitors over 150 servers and displays their performances, notifies us when any of the server is down.",
    equipmentId:4,
    equipment: 'Tanker',
    experienceId:3,
    experience: 'More than 1 year',
    compensation: '60 cents per mile',
    apps:0
  }
];

module.exports = data;
