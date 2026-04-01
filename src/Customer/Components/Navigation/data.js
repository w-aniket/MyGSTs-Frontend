const categories = [
  {
    _id: "1",
    name: "Engineering",
    slug: "engineering",
    icon: "FaTools",
    children: [
      {
        _id: "1-1",
        name: "Computer Engineering",
        slug: "engineering/computer",
        icon: "FaLaptopCode",
        children: [
          {
            _id: "1-1-1",
            name: "Artificial Intelligence",
            slug: "engineering/computer/ai",
            icon: "FaRobot",
            children: []
          },
          {
            _id: "1-1-2",
            name: "Web Development",
            slug: "engineering/computer/web-dev",
            icon: "FaGlobe",
            children: []
          }
        ]
      },
      {
        _id: "1-2",
        name: "Mechanical Engineering",
        slug: "engineering/mechanical",
        icon: "FaCogs",
        children: []
      },
      {
        _id: "1-3",
        name: "Civil Engineering",
        slug: "engineering/civil",
        icon: "FaBuilding",
        children: []
      }
    ]
  },
  {
    _id: "2",
    name: "Commerce",
    slug: "commerce",
    icon: "FaChartLine",
    children: [
      {
        _id: "2-1",
        name: "B.Com",
        slug: "commerce/bcom",
        icon: "FaUniversity",
        children: [
          {
            _id: "2-1-1",
            name: "Finance",
            slug: "commerce/bcom/finance",
            icon: "FaMoneyBillWave",
            children: []
          },
          {
            _id: "2-1-2",
            name: "Accounting",
            slug: "commerce/bcom/accounting",
            icon: "FaCalculator",
            children: []
          }
        ]
      }
    ]
  },
  {
    _id: "3",
    name: "Management",
    slug: "management",
    icon: "FaUserTie",
    children: [
      {
        _id: "3-1",
        name: "MBA",
        slug: "management/mba",
        icon: "FaBriefcase",
        children: [
          {
            _id: "3-1-1",
            name: "Marketing",
            slug: "management/mba/marketing",
            icon: "FaBullhorn",
            children: []
          },
          {
            _id: "3-1-2",
            name: "HR",
            slug: "management/mba/hr",
            icon: "FaUsers",
            children: []
          }
        ]
      }
    ]
  }
];

export default categories;