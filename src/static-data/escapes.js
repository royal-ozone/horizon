import { v4 as uuidv4 } from 'uuid';


const escapes = [
    {
        id: uuidv4(),
        image: 'https://main-cdn.grabone.co.nz/goimage/325x225/326577d6bf9ecafb75a55c981e195f9d27bc5deb.jpg',
        title: '4.5 Star Central Christchurch Stay for Two',
        activity: 'Wyndham Garden Christchurch City',
        place: 'Christchurch City',
        rate: 4,
        oldPrice: '$310',
        price: "$149",
        description: 'One-Night 4.5 Star Central Christchurch Stay for Two People in a King Room incl. Bottle of Bubbles, Daily Breakfast, Late Checkout, Parking & 20% Off All Food & Beverages Purchased During your Stay...'
    },
    {
        id: uuidv4(),
        image: 'https://main-cdn.grabone.co.nz/goimage/325x225/326577d6bf9ecafb75a55c981e195f9d27bc5deb.jpg',
        title: 'Central Queenstown Stay for Two People',
        activity: 'Rydges Lakeland Resort Queenstown',
        place: 'Queenstown',
        rate: 4.5,
        oldPrice: '$402',
        price: "$179",
        description: 'One-Night Central Queenstown Stay at Rydges Lakeland Resort for Two People in a Lake-View King or Twin-Room incl. Cooked Breakfast, 20% off F&B, Parking, WiFi & More - Options for Suite Room & for ...'
    },

    {
        id: uuidv4(),
        image: 'https://main-cdn.grabone.co.nz/goimage/325x225/326577d6bf9ecafb75a55c981e195f9d27bc5deb.jpg',
        title: '4.5-Star Luxury Queenstown Lakeside Getaway',
        activity: 'OAKS Queenstown Shores Resort',
        place: 'Frankton',
        rate: 3.9,
        oldPrice: '$304',
        price: "$149",
        description: 'One-Night Central Queenstown Stay at Rydges Lakeland Resort for Two People in a Lake-View King or Twin-Room incl. Cooked Breakfast, 20% off F&B, Parking, WiFi & More - Options for Suite Room & for ...'
    },
    {
        id: uuidv4(),
        image: 'https://main-cdn.grabone.co.nz/goimage/325x225/326577d6bf9ecafb75a55c981e195f9d27bc5deb.jpg',
        title: 'Luxury 4.5-Star Stay at Heritage Queenstown',
        activity: 'The Heritage Queenstown',
        place: 'Queenstown - Wanaka',
        rate: 4.3,
        oldPrice: '$377',
        price: "$209",
        description: 'Luxury 4.5-Star Stay at Heritage Queenstown for Two in a Deluxe Room incl. Welcome Drinks, Cooked Breakfast, Early Check-In & Late Checkout - Options for Family Deluxe Room or Studio Suite Lake-Vie...'
    }
    
];

export default escapes;