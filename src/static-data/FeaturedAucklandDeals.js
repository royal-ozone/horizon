import { v4 as uuidv4 } from 'uuid';

const featuredDeals = [
    {
        id: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqNlfBJOg8ltfEF-iAzvjxZVHjV1cAMFwdPw&usqp=CAU',
        title: 'Day Pass Combo incl. Rental Equipment',
        activity: 'Snowplanet',
        place: 'Silverdale',
        rate: 4,
        oldPrice: '$124',
        price: "$45",
        description: 'Day Pass Combo to Snowplanet incl. Rental Equipment'
    },
    {
        id: 2,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqNlfBJOg8ltfEF-iAzvjxZVHjV1cAMFwdPw&usqp=CAU',
        title: 'Day Tandem Skydive Package Combo incl. Rental Equipment',
        activity: 'Taupo Tandem Skydiving',
        place: 'Taupo',
        rate: 4.5,
        oldPrice: null,
        price: "$199",
        description: '9000ft Tandem Skydive Package Overlooking Lake Taupo - Options for 12000ft, 15000ft or 18500ft & to incl. Voucher Towards a Camera Package or Exit Image - Valid from 1st January 2022'
    },
    {
        id: 3,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqNlfBJOg8ltfEF-iAzvjxZVHjV1cAMFwdPw&usqp=CAU',
        title: 'Six-Course Signature Menu Dining Experience',
        activity: 'Sails Restaurant, Westhaven Marina',
        place: 'Auckland',
        rate: 4.7,
        oldPrice: null,
        price: "$89",
        description: 'Six-Course Signature Menu Dining Experience - Options for up to Ten People - Valid from 5th January 2022'
    },
    {
        id: 4,
        image: 'https://main-cdn.grabone.co.nz/goimage/325x225/7a54d766b8a20a9b6efe7c02c6a2e289b3328b60.jpg',
        title: ' Water Sports Experience',
        activity: 'Vector Wero Whitewater Park',
        place: 'Wiri',
        rate: 5,
        oldPrice: '$74',
        price: "$39",
        description: 'Rafting & Lake Adventure Combo incl. Ice Cream for One Person - Options for up to Seven People'
    },
];

export default featuredDeals;