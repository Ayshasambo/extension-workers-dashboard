
  export const farmers = [
    {
      id: 1, 
      title: "Yusuf Habu", 
      iconName:"pets", 
      lga: "Misau",
      state: "Bauchi",
      distance: '1800',
      email:"aishamsambo@gmail.com",
      worktype:"extension worker",
      vaccination: [
        {
          diseaseType: 'Clostridial Disease',
          count: 24,
          status: 'Pending',
          nextDue: 'Oct 12, 2025',
          lastVaccinated: 'January 20, 2025',
          animalType: 'Goats'
        },
        {
          diseaseType: 'NewCastle',
          count: 25,
          status: 'Needs update',
          nextDue: 'Oct 30, 2025',
          lastVaccinated: 'January 10, 2025',
          animalType: 'Sheep'
        },
        {
          diseaseType: 'Brucellosis',
          count: 10,
          status: 'Upto date',
          nextDue: 'Oct 30, 2025',
          lastVaccinated: 'January 10, 2025',
          animalType: 'Sheep'
        },
        {
          diseaseType: 'Foot and Mouth Disease',
          count: 5,
          status: 'Pending',
          nextDue: 'Oct 30, 2025',
          lastVaccinated: 'January 10, 2025',
          animalType: 'Sheep'
        },
      ],
      livestock: [
        {
          type: 'Goats',
          count: 24,
          breed: 'Boer',
          averageWeight: '70kg',
          averageAge: '2 years',
          healthStatus: '100%'
        },
        {
          type: 'Sheep',
          count: 15,
          breed: 'Dorper',
          averageWeight: '60kg',
          averageAge: '2 months',
          healthStatus: '90%'
        },
        {
          type: 'Cows',
          count: 15,
          breed: 'Red Angus',
          averageWeight: '30kg',
          averageAge: '1 year',
          healthStatus: '80%'
        },
        {
          type: 'Pig',
          count: 15,
          breed: 'Hamshire',
          averageWeight: '75kg',
          averageAge: '3 years',
          healthStatus: '60%'
        },
      ]
      
    },
    {
      id: 2,
      iconName: "pets",
      title: "Aisha Sambo",
      lga: "Zaria",
      state: "Kaduna",
      //livestock: ['Cow', 'Chickens' ],
      distance: '200',
      email:"aishamsambo@gmail.com",
      worktype:"extension worker",
      vaccination: [
        {
          diseaseType: 'Clostridial Disease',
          count: 24,
          status: 'Pending',
          nextDue: 'Oct 12, 2025',
          lastVaccinated: 'January 20, 2025',
          animalType: 'Goats'
        },
        {
          diseaseType: 'NewCatle',
          count: 25,
          status: 'Pending',
          nextDue: 'Oct 30, 2025',
          lastVaccinated: 'January 10, 2025',
          animalType: 'Sheep'
        },
        {
          diseaseType: 'Brucellosis',
          count: 10,
          status: 'Pending',
          nextDue: 'Oct 30, 2025',
          lastVaccinated: 'January 10, 2025',
          animalType: 'Sheep'
        },
        {
          diseaseType: 'Contagious Caprine Pleuropneumonia',
          count: 5,
          status: 'Pending',
          nextDue: 'Oct 30, 2025',
          lastVaccinated: 'January 10, 2025',
          animalType: 'Sheep'
        },
      ],
      livestock: [
        {
          type: 'pigs',
          count: 24,
          breed: 'Boer',
          averageWeight: '70kg',
          averageAge: '2 years',
          healthStatus: '50%'
        },
        {
          type: 'cows',
          count: 15,
          breed: 'Dorper',
          averageWeight: '60kg',
          averageAge: '1.5 years',
          healthStatus: '99%'
        }
      ]
    },
    {
        id: 3,
        iconName: "pets",
        title: "Ahmad Muhammad",
        lga: "Zaria",
        state: "Kafanchan",
        distance: '200',
        email:"aishamsambo@gmail.com",
        worktype:"extension worker",
        vaccination: [
          {
            diseaseType: 'Clostridial Disease',
            count: 24,
            status: 'Pending',
            nextDue: 'Oct 12, 2025',
            lastVaccinated: 'January 20, 2025',
            animalType: 'Goats'
          },
          {
            diseaseType: 'NewCatle',
            count: 25,
            status: 'Pending',
            nextDue: 'Oct 30, 2025',
            lastVaccinated: 'January 10, 2025',
            animalType: 'Sheep'
          },
          {
            diseaseType: 'Brucellosis',
            count: 10,
            status: 'Pending',
            nextDue: 'Oct 30, 2025',
            lastVaccinated: 'January 10, 2025',
            animalType: 'Sheep'
          },
          {
            diseaseType: 'Contagious Caprine Pleuropneumonia',
            count: 5,
            status: 'Pending',
            nextDue: 'Oct 30, 2025',
            lastVaccinated: 'January 10, 2025',
            animalType: 'Sheep'
          },
        ],
        livestock: [
          {
            type: 'Goats',
            count: 24,
            breed: 'Boer',
            averageWeight: '70kg',
            averageAge: '2 years',
            healthStatus: '60%'
          },
          {
            type: 'Sheep',
            count: 15,
            breed: 'Dorper',
            averageWeight: '60kg',
            averageAge: '5 years',
            healthStatus: '10%'
          }
        ]
      },
      {
        id: 4,
        iconName: "pets",
        title: "Kallamu Yahya Yunusa",
        lga: "kankara",
        state: "Katsina",
        distance: '200',
        email:"aishamsambo@gmail.com",
        worktype:"extension worker",
        vaccination: [
          {
            diseaseType: 'Clostridial Disease',
            count: 24,
            status: 'Pending',
            nextDue: 'Oct 12, 2025',
            lastVaccinated: 'January 20, 2025',
            animalType: 'Goats'
          },
          {
            diseaseType: 'NewCatle',
            count: 25,
            status: 'Pending',
            nextDue: 'Oct 30, 2025',
            lastVaccinated: 'January 10, 2025',
            animalType: 'Sheep'
          },
          {
            diseaseType: 'Brucellosis',
            count: 10,
            status: 'Pending',
            nextDue: 'Oct 30, 2025',
            lastVaccinated: 'January 10, 2025',
            animalType: 'Sheep'
          },
          {
            diseaseType: 'Contagious Caprine Pleuropneumonia',
            count: 5,
            status: 'Pending',
            nextDue: 'Oct 30, 2025',
            lastVaccinated: 'January 10, 2025',
            animalType: 'Sheep'
          },
        ],
        livestock: [
          {
            type: 'Goats',
            count: 24,
            breed: 'Boer',
            averageWeight: '70kg',
            averageAge: '2 years',
            healthStatus: '20%'
          },
          {
            type: 'Sheep',
            count: 15,
            breed: 'Dorper',
            averageWeight: '60kg',
            averageAge: '1.5 years',
            healthStatus: '98%'
          }
        ]
      },
      {
        id: 5,
        iconName: "pets",
        title: "Larai Jibril",
        lga: "Gwagwalada",
        state: "Abuja",
        distance: '200',
        email:"aishamsambo@gmail.com",
        worktype:"extension worker",
        vaccination: [
          {
            diseaseType: 'Clostridial Disease',
            count: 24,
            status: 'Pending',
            nextDue: 'Oct 12, 2025',
            lastVaccinated: 'January 20, 2025',
            animalType: 'Goats'
          },
          {
            diseaseType: 'NewCatle',
            count: 25,
            status: 'Pending',
            nextDue: 'Oct 30, 2025',
            lastVaccinated: 'January 10, 2025',
            animalType: 'Sheep'
          },
          {
            diseaseType: 'Brucellosis',
            count: 10,
            status: 'Pending',
            nextDue: 'Oct 30, 2025',
            lastVaccinated: 'January 10, 2025',
            animalType: 'Sheep'
          },
          {
            diseaseType: 'Contagious Caprine Pleuropneumonia',
            count: 5,
            status: 'Pending',
            nextDue: 'Oct 30, 2025',
            lastVaccinated: 'January 10, 2025',
            animalType: 'Sheep'
          },
        ],
        livestock: [
          {
            type: 'Goats',
            count: 24,
            breed: 'Boer',
            averageWeight: '70kg',
            averageAge: '2 years',
            healthStatus: '10%'
          },
          {
            type: 'Sheep',
            count: 15,
            breed: 'Dorper',
            averageWeight: '60kg',
            averageAge: '1.5 years',
            healthStatus: '15%'
          }
        ]
      },
      {
        id: 9,
        iconName: "pets",
        title: "Aisha Sambo",
        lga: "Zaria",
        state: "Kaduna",
        distance: '200',
        email:"aishamsambo@gmail.com",
        worktype:"extension worker",
        vaccination: [
          {
            diseaseType: 'Clostridial Disease',
            count: 24,
            status: 'Pending',
            nextDue: 'Oct 12, 2025',
            lastVaccinated: 'January 20, 2025',
            animalType: 'Goats'
          },
          {
            diseaseType: 'NewCatle',
            count: 25,
            status: 'Pending',
            nextDue: 'Oct 30, 2025',
            lastVaccinated: 'January 10, 2025',
            animalType: 'Sheep'
          },
          {
            diseaseType: 'Brucellosis',
            count: 10,
            status: 'Pending',
            nextDue: 'Oct 30, 2025',
            lastVaccinated: 'January 10, 2025',
            animalType: 'Sheep'
          },
          {
            diseaseType: 'Contagious Caprine Pleuropneumonia',
            count: 5,
            status: 'Pending',
            nextDue: 'Oct 30, 2025',
            lastVaccinated: 'January 10, 2025',
            animalType: 'Sheep'
          },
        ],
        livestock: [
          {
            type: 'Goats',
            count: 24,
            breed: 'Boer',
            averageWeight: '70kg',
            averageAge: '2 years',
            healthStatus: '70%'
          },
          {
            type: 'Sheep',
            count: 15,
            breed: 'Dorper',
            averageWeight: '60kg',
            averageAge: '1.5 years',
            healthStatus: '80%'
          }
        ]
      },
      {
        id: 6,
        iconName: "pets",
        title: "Aisha Sambo",
        lga: "Zaria",
        state: "Kaduna",
        //livestock: ['Cow', 'Chickens' ],
        distance: '200',
        email:"aishamsambo@gmail.com",
        worktype:"extension worker",
        livestock: [
          {
            type: 'Goats',
            count: 24,
            breed: 'Boer',
            averageWeight: '70kg',
            averageAge: '2 years',
            healthStatus: '20%'
          },
          {
            type: 'Sheep',
            count: 15,
            breed: 'Dorper',
            averageWeight: '60kg',
            averageAge: '1.5 years',
            healthStatus: '99%'
          }
        ]
      },
      {
        id: 7,
        iconName: "pets",
        title: "Aisha Sambo",
        lga: "Zaria",
        state: "Kaduna",
        //livestock: ['Cow', 'Chickens' ],
        distance: '200km',
        email:"aishamsambo@gmail.com",
        worktype:"extension worker",
        livestock: [
          {
            type: 'Goats',
            count: 24,
            breed: 'Boer',
            averageWeight: '70kg',
            averageAge: '2 years',
            healthStatus: 'Healthy'
          },
          {
            type: 'Sheep',
            count: 15,
            breed: 'Dorper',
            averageWeight: '60kg',
            averageAge: '1.5 years',
            healthStatus: 'Healthy'
          }
        ]

      },
      {
        id: 8,
        iconName: "pets",
        title: "Aisha Sambo",
        lga: "Zaria",
        state: "Kaduna",
        //livestock: ['Cow', 'Chickens' ],
        distance: '200',
        email:"aishamsambo@gmail.com",
        worktype:"extension worker",
        livestock: [
          {
            type: 'Goats',
            count: 24,
            breed: 'Boer',
            averageWeight: '70kg',
            averageAge: '2 years',
            healthStatus: 'Healthy'
          },
          {
            type: 'Sheep',
            count: 15,
            breed: 'Dorper',
            averageWeight: '60kg',
            averageAge: '1.5 years',
            healthStatus: 'Healthy'
          }
        ]
      },
]

export const states = ["Zamfara", "Kebbi", "Kaduna", "Kano", "Katsina"];

export const workTypes = ["Farmer","Extension Worker","Veterinary Doctor"
];

export const extensionWorker = {
  id: 1,
  name: "Buhari Zailani",
  email: "bz@gmail.com",
  phone: "08012345678",
  lga: "Zaria",
  state: "Kaduna",
  worktype: "Extension Worker"
};

export const notifications = [
  {
    id: 1,
    title: 'Disease Outbreak Alert',
    body: 'An outbreak of Foot and Mouth Disease (FMD) has been reported in Zaria and Kaduna affecting cattles around several grazing areas and livestock markets. The disease is highly contagious, leading to significant economic losses.',
    affectedareas: ['Zaria', 'Kaduna'],
    severity: 'High',
    iconName: 'coronavirus',
    category: 'disease',
    date: '5th November, 2024',
    lga: 'Zaria',
    state: 'Kaduna',
    action: 'Immediate Isolation'
  },
  {
    id: 2,
    title: 'Extreme Weather Alert',
    body: 'An a extreme weather alert as a result of North East trade wind approaching from the Sahel Region',
    affectedareas: ['Misau', 'Katagum'],
    severity: 'Medium',
    iconName: 'thunderstorm',
    category: 'disease',
    date: '12th October, 2024'
  }
]

export const livestockList = [
  {
    id: 1,
    farmerName: 'Yusuf Habu',
    type: 'Goats',
    count: 24,
    breed: 'Boer',
    averageWeight: '70kg',
    averageAge: '2 years',
    healthStatus: '20%',
    state: 'Bauchi',
    lga: 'Misau',
  },
  {
    id: 2,
    farmerName: 'Musa Bello',
    type: 'Cattle',
    count: 12,
    breed: 'Sokoto Gudali',
    averageWeight: '300kg',
    averageAge: '4 years',
    healthStatus: '90%',
    state: 'Kaduna',
    lga: 'Zaria',
  },
  {
    id: 3,
    farmerName: 'Musa Bello',
    type: 'Cows',
    count: 12,
    breed: 'Sokoto Gudali',
    averageWeight: '300kg',
    averageAge: '4 years',
    healthStatus: '90%',
    state: 'Kaduna',
    lga: 'Zaria',
  },
  {
    id: 4,
    farmerName: 'Musa Bello',
    type: 'Chicken',
    count: 12,
    breed: 'Sokoto Gudali',
    averageWeight: '300kg',
    averageAge: '4 years',
    healthStatus: '90%',
    state: 'Kaduna',
    lga: 'Zaria',
  },
  {
    id: 5,
    farmerName: 'Musa Bello',
    type: 'Pigs',
    count: 12,
    breed: 'Sokoto Gudali',
    averageWeight: '300kg',
    averageAge: '4 years',
    healthStatus: '90%',
    state: 'Kaduna',
    lga: 'Zaria',
  },
];
export const breeds = [
  { id: 1, name: 'Boer Goat' },
  { id: 2, name: 'Nigerian Dwarf' },
  { id: 3, name: 'Alpine Goat' },
  { id: 4, name: 'Saanen Goat' },
];

export const healthStatus = [
  { id: 1, status: 'Healthy' },
  { id: 2, status: 'Sick' },
  { id: 3, status: 'In Treatment' },
  { id: 4, status: 'Vaccinated' },
];



  

  
  
  
  
  
  
  
  