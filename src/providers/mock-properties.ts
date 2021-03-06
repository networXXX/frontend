let properties: Array<any> = [
    {
        id: 1,
        address: "18 Henry st",
        city: "Cambridge",
        state: "MA",
        zip: "01742",
        price: "$975,000",
        title: "Lâm Ngọc Hằng",
        bedrooms: 4,
        bathrooms: 3,
        long: -71.11095,
        lat: 42.35663,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house01.jpg",
        //thumbnail: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house01sq.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/15894994_401920850147680_17897310796082713_n.jpg?oh=62f4a663cfa69d91ec7c8d96b0b08330&oe=59EF28A0",
        tags: "colonial",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 1,
            name: "Caroline Kingsley",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/caroline_kingsley.jpg"
        }
    },
    {
        id: 2,
        address: "24 Pearl st",
        city: "Cambridge",
        state: "MA",
        zip: "02420",
        price: "$1,200,000",
        //title: "Ultimate Sophistication",
        title: "Lemth Nguyen",
        bedrooms: 5,
        bathrooms: 4,
        long: -71.10869,
        lat: 42.359103,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house02.jpg",
        //thumbnail: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house02sq.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/c57.0.240.240/p240x240/12523973_10205927663843739_1485480924116733747_n.jpg?oh=8e107b199d7e39db98c7d4d92f57d32b&oe=5A351E19",
        tags: "colonial",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 1,
            name: "Caroline Kingsley",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/caroline_kingsley.jpg"
        }
    },
    {
        id: 3,
        address: "61 West Cedar st",
        city: "Boston",
        state: "MA",
        zip: "02420",
        price: "$825,000",
        title: "Quản Thị Nga",
        bedrooms: 5,
        bathrooms: 4,
        long: -71.070061,
        lat: 42.359986,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house03.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p240x240/19989469_1217389091723233_2133214409771178201_n.jpg?oh=d709792a479eb5dbcabce82cdc6c0b23&oe=59EDE5BB",
        tags: "contemporary",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 2,
            name: "Michael Jones",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/michael_jones.jpg"
        }
    },
    {
        id: 4,
        address: "32 Prince st",
        city: "Cambridge",
        state: "MA",
        zip: "02420",
        price: "$930,000",
        title: "Thuy Duong Nguyen",
        bedrooms: 5,
        bathrooms: 4,
        long: -71.110448,
        lat: 42.360642,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house04.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p240x240/12645228_934705903303420_8030945404463088014_n.jpg?oh=3874e2458f46ff84b33294beb72f3475&oe=5A354A61",
        tags: "victorian",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 3,
            name: "Jonathan Bradley",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/jonathan_bradley.jpg"
        }
    },
    {
        id: 5,
        address: "211 Charles Street",
        city: "Boston",
        state: "MA",
        zip: "02420",
        price: "$850,000",
        title: "Quan Lam",
        bedrooms: 3,
        bathrooms: 2,
        long: -71.084454,
        lat: 42.368168,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house05.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p240x240/12274566_10153727525339812_7750744222810759303_n.jpg?oh=d3e313eea79e7b6b87f1160b4a6c1471&oe=5A2D4C7C",
        tags: "contemporary",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 4,
            name: "Jennifer Wu",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/jennifer_wu.jpg"
        }
    },
    {
        id: 6,
        address: "448 Hanover st",
        city: "Boston",
        state: "MA",
        zip: "02420",
        price: "$725,000",
        title: "Vy Thanh",
        bedrooms: 4,
        bathrooms: 2,
        long: -71.052617,
        lat: 42.366855,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house06.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p240x240/20621957_872823652868115_5458391622460968658_n.jpg?oh=123da856e05cd63316d0d39c7590188d&oe=59EFF4AE",
        tags: "colonial",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 5,
            name: "Olivia Green",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/olivia_green.jpg"
        }
    },
    {
        id: 7,
        address: "127 Endicott st",
        city: "Boston",
        state: "MA",
        zip: "02420",
        price: "$450,000",
        title: "Lan Lan Hoang",
        bedrooms: 3,
        bathrooms: 1,
        long: -71.057352,
        lat: 42.365003,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house07.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p240x240/19059722_1568088983225607_4271968378881729116_n.jpg?oh=d4414e8a2db46cd39fe8d436f6ed9748&oe=5A1F17E0",
        tags: "colonial",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 6,
            name: "Miriam Aupont",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/miriam_aupont.jpg"
        }
    },
    {
        id: 8,
        address: "48 Brattle st",
        city: "Cambridge",
        state: "MA",
        zip: "02420",
        price: "$450,000",
        title: "Minh Thu Nguyen",
        bedrooms: 5,
        bathrooms: 4,
        long: -71.121653,
        lat: 42.374117,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house10.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p240x240/20621766_507619646240222_7223858202266566665_n.jpg?oh=47973a87b3a495eee7a2dc6d66355d1d&oe=59EAE8D9",
        tags: "victorian",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 7,
            name: "Michelle Lambert",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/michelle_lambert.jpg"
        }
    },
    {
        id: 9,
        address: "121 Harborwalk",
        city: "Boston",
        state: "MA",
        zip: "02420",
        price: "$450,000",
        title: "Tuyen Nguyen",
        bedrooms: 3,
        bathrooms: 3,
        long: -71.049327,
        lat: 42.35695,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house09.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p240x240/20621896_1619721901371873_8757437168574382787_n.jpg?oh=5ea18328e06b5edc92d5e0baca7b4892&oe=59F194A5",
        tags: "contemporary",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 2,
            name: "Michael Jones",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/michael_jones.jpg"
        }
    },
    {
        id: 10,
        address: "503 Park Drive",
        city: "Boston",
        state: "MA",
        zip: "02420",
        price: "$650,000",
        title: "City Living",
        bedrooms: 2,
        bathrooms: 2,
        long: -71.105475,
        lat: 42.347400,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house08.jpg",
        thumbnail: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house08sq.jpg",
        tags: "contemporary",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 1,
            name: "Caroline Kingsley",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/caroline_kingsley.jpg"
        }
    },
    {
        id: 11,
        address: "95 Gloucester st",
        city: "Boston",
        state: "MA",
        zip: "02420",
        price: "$690,000",
        title: "Luck Yong",
        bedrooms: 3,
        bathrooms: 3,
        lat: 42.349693,
        long: -71.084407,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house11.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p240x240/20525477_10154764283654212_7155418011956367437_n.jpg?oh=857daeeb66efa2fef114b73c7e5c7076&oe=5A2FA671",
        tags: "contemporary",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 4,
            name: "Jennifer Wu",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/jennifer_wu.jpg"
        }
    },
    {
        id: 12,
        address: "145 Commonwealth ave",
        city: "Boston",
        state: "MA",
        zip: "02420",
        price: "$845,000",
        title: "Nguyen Viet Ha",
        bedrooms: 4,
        bathrooms: 3,
        lat: 42.352466,
        long: -71.075311,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house12.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p240x240/12799079_1320496074631406_3751514757821920751_n.jpg?oh=3493a9c272b8103192b510b07fc3989b&oe=59F0BC4E",
        tags: "colonial",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 5,
            name: "Olivia Green",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/olivia_green.jpg"
        }
    }
];

export default properties;
