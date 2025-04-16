// MongoDB Export Structure

// users collection
db.createCollection("users");
db.users.insertMany([
  {
    "_id": ObjectId("60d5ec9af682fbd12a123456"),
    "name": "John Doe",
    "email": "john@example.com",
    "password": "$2b$12$HVXOhv8NfZO.BxZvs0RQAeKRJ1EjWgn08jP4mfEEmQtm5OhBnP1.O", // "password123"
    "date_created": ISODate("2023-01-15T10:30:00Z"),
    "last_login": ISODate("2023-04-16T08:45:00Z")
  },
  {
    "_id": ObjectId("60d5ec9af682fbd12a654321"),
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "$2b$12$XyZab1CDEfg2HIj3KLMnO.pQVIxy8Z10D/2pREF56SAcBdTQr9f4.", // "pass456"
    "date_created": ISODate("2023-02-20T14:15:00Z"),
    "last_login": ISODate("2023-04-15T17:30:00Z")
  },
  {
    "_id": ObjectId("60d5ec9af682fbd12a789012"),
    "name": "Admin User",
    "email": "admin@ssbiryani.com",
    "password": "$2b$12$Ab3DefG4HIjk5LMnO6PQrs.TuVWXyZAB1CDEfg2HIj3KLMnOPQr.", // "admin123"
    "role": "admin",
    "date_created": ISODate("2023-01-01T00:00:00Z"),
    "last_login": ISODate("2023-04-16T09:10:00Z")
  }
]);

// food_items collection
db.createCollection("food_items");
db.food_items.insertMany([
  {
    "_id": ObjectId("61a5ec9af682fbd12a111111"),
    "name": "Hyderabadi Chicken Biryani",
    "price": 250,
    "description": "Authentic Hyderabadi style chicken biryani made with basmati rice, tender chicken pieces, and a blend of aromatic spices that gives it a unique flavor.",
    "image_url": "/static/images/chicken_biryani.jpg",
    "stripe_url": "price_1AbCdEfGhIjKlMnOpQrStUvW",
    "category": "non-veg",
    "popular": true
  },
  {
    "_id": ObjectId("61a5ec9af682fbd12a222222"),
    "name": "Mutton Biryani",
    "price": 320,
    "description": "Delicious mutton biryani prepared with tender meat pieces, fragrant basmati rice, and our secret blend of spices that creates a mouthwatering dish.",
    "image_url": "/static/images/mutton_biryani.jpg",
    "stripe_url": "price_1XyZaBcDeFgHiJkLmNoPqRsT",
    "category": "non-veg",
    "popular": true
  },
  {
    "_id": ObjectId("61a5ec9af682fbd12a333333"),
    "name": "Vegetable Biryani",
    "price": 200,
    "description": "A flavorful vegetarian biryani made with fresh vegetables, basmati rice, and aromatic spices, perfect for vegetarian food lovers.",
    "image_url": "/static/images/veg_biryani.jpg",
    "stripe_url": "price_1AbCdEfGhIjKlMnOpQrStUvX",
    "category": "veg",
    "popular": false
  },
  {
    "_id": ObjectId("61a5ec9af682fbd12a444444"),
    "name": "Bucket Chicken Biryani (4-5 persons)",
    "price": 850,
    "description": "Our signature bucket chicken biryani that serves 4-5 persons. Perfect for family gatherings or small parties.",
    "image_url": "/static/images/bucket_biryani.jpg",
    "stripe_url": "price_1AbCdEfGhIjKlMnOpQrStUvY",
    "category": "non-veg",
    "popular": true
  },
  {
    "_id": ObjectId("61a5ec9af682fbd12a555555"),
    "name": "Bucket Biryani Standard Pack (8-9 persons)",
    "price": 1500,
    "description": "Our largest portion of biryani that serves 8-9 persons. Ideal for parties and large gatherings.",
    "image_url": "/static/images/standard_bucket.jpg",
    "stripe_url": "price_1AbCdEfGhIjKlMnOpQrStUvZ",
    "category": "non-veg",
    "popular": false
  },
  {
    "_id": ObjectId("61a5ec9af682fbd12a666666"),
    "name": "Chicken 65",
    "price": 180,
    "description": "Spicy and crispy chicken 65, a perfect side dish to accompany your biryani.",
    "image_url": "/static/images/chicken65.jpg",
    "stripe_url": "price_1AbCdEfGhIjKlMnOpQrStUv1",
    "category": "non-veg",
    "popular": true
  },
  {
    "_id": ObjectId("61a5ec9af682fbd12a777777"),
    "name": "Raita",
    "price": 40,
    "description": "Fresh yogurt mixed with cucumber, tomatoes, and mild spices to complement your biryani.",
    "image_url": "/static/images/raita.jpg",
    "stripe_url": "price_1AbCdEfGhIjKlMnOpQrStUv2",
    "category": "veg",
    "popular": false
  },
  {
    "_id": ObjectId("61a5ec9af682fbd12a888888"),
    "name": "Brinjal Curry",
    "price": 80,
    "description": "Delicious brinjal curry cooked in a tangy tomato-based gravy, perfect accompaniment for biryani.",
    "image_url": "/static/images/brinjal_curry.jpg",
    "stripe_url": "price_1AbCdEfGhIjKlMnOpQrStUv3",
    "category": "veg",
    "popular": false
  }
]);

// orders collection
db.createCollection("orders");
db.orders.insertMany([
  {
    "_id": ObjectId("62a5ec9af682fbd12a123123"),
    "user_id": ObjectId("60d5ec9af682fbd12a123456"),
    "items": [
      {
        "food_id": ObjectId("61a5ec9af682fbd12a111111"),
        "name": "Hyderabadi Chicken Biryani",
        "price": 250,
        "quantity": 2
      },
      {
        "food_id": ObjectId("61a5ec9af682fbd12a666666"),
        "name": "Chicken 65",
        "price": 180,
        "quantity": 1
      }
    ],
    "total_amount": 680,
    "status": "delivered",
    "payment_id": "pi_1AbCdEfGhIjKlMnOpQrStUvW",
    "shipping_address": {
      "street": "123 Main St",
      "city": "Chennai",
      "state": "Tamil Nadu",
      "zip": "600001",
      "country": "India"
    },
    "order_date": ISODate("2023-03-15T14:30:00Z"),
    "delivery_date": ISODate("2023-03-15T15:30:00Z")
  },
  {
    "_id": ObjectId("62a5ec9af682fbd12a456456"),
    "user_id": ObjectId("60d5ec9af682fbd12a654321"),
    "items": [
      {
        "food_id": ObjectId("61a5ec9af682fbd12a444444"),
        "name": "Bucket Chicken Biryani (4-5 persons)",
        "price": 850,
        "quantity": 1
      },
      {
        "food_id": ObjectId("61a5ec9af682fbd12a777777"),
        "name": "Raita",
        "price": 40,
        "quantity": 2
      }
    ],
    "total_amount": 930,
    "status": "delivered",
    "payment_id": "pi_1XyZaBcDeFgHiJkLmNoPqRsT",
    "shipping_address": {
      "street": "456 Park Avenue",
      "city": "Chennai",
      "state": "Tamil Nadu",
      "zip": "600002",
      "country": "India"
    },
    "order_date": ISODate("2023-04-10T12:15:00Z"),
    "delivery_date": ISODate("2023-04-10T13:30:00Z")
  },
  {
    "_id": ObjectId("62a5ec9af682fbd12a789789"),
    "user_id": ObjectId("60d5ec9af682fbd12a123456"),
    "items": [
      {
        "food_id": ObjectId("61a5ec9af682fbd12a222222"),
        "name": "Mutton Biryani",
        "price": 320,
        "quantity": 1
      },
      {
        "food_id": ObjectId("61a5ec9af682fbd12a888888"),
        "name": "Brinjal Curry",
        "price": 80,
        "quantity": 1
      }
    ],
    "total_amount": 400,
    "status": "processing",
    "payment_id": "pi_1LmNoPqRsTuVwXyZaBcDeF",
    "shipping_address": {
      "street": "123 Main St",
      "city": "Chennai",
      "state": "Tamil Nadu",
      "zip": "600001",
      "country": "India"
    },
    "order_date": ISODate("2023-04-16T10:00:00Z")
  }
]);

// carts collection (for active shopping carts)
db.createCollection("carts");
db.carts.insertMany([
  {
    "_id": ObjectId("63a5ec9af682fbd12a112233"),
    "user_id": ObjectId("60d5ec9af682fbd12a123456"),
    "items": [
      {
        "food_id": ObjectId("61a5ec9af682fbd12a111111"),
        "name": "Hyderabadi Chicken Biryani",
        "price": 250,
        "quantity": 1,
        "image_url": "/static/images/chicken_biryani.jpg",
        "stripe_url": "price_1AbCdEfGhIjKlMnOpQrStUvW"
      }
    ],
    "created_at": ISODate("2023-04-16T08:30:00Z"),
    "updated_at": ISODate("2023-04-16T08:30:00Z")
  },
  {
    "_id": ObjectId("63a5ec9af682fbd12a445566"),
    "user_id": ObjectId("60d5ec9af682fbd12a654321"),
    "items": [
      {
        "food_id": ObjectId("61a5ec9af682fbd12a222222"),
        "name": "Mutton Biryani",
        "price": 320,
        "quantity": 2,
        "image_url": "/static/images/mutton_biryani.jpg",
        "stripe_url": "price_1XyZaBcDeFgHiJkLmNoPqRsT"
      },
      {
        "food_id": ObjectId("61a5ec9af682fbd12a777777"),
        "name": "Raita",
        "price": 40,
        "quantity": 1,
        "image_url": "/static/images/raita.jpg",
        "stripe_url": "price_1AbCdEfGhIjKlMnOpQrStUv2"
      }
    ],
    "created_at": ISODate("2023-04-15T18:45:00Z"),
    "updated_at": ISODate("2023-04-15T19:20:00Z")
  }
]);

// reviews collection
db.createCollection("reviews");
db.reviews.insertMany([
  {
    "_id": ObjectId("64a5ec9af682fbd12a111222"),
    "user_id": ObjectId("60d5ec9af682fbd12a123456"),
    "food_id": ObjectId("61a5ec9af682fbd12a111111"),
    "rating": 5,
    "comment": "Absolutely delicious biryani! The flavor is authentic and the portion size is generous.",
    "date": ISODate("2023-03-16T10:30:00Z")
  },
  {
    "_id": ObjectId("64a5ec9af682fbd12a333444"),
    "user_id": ObjectId("60d5ec9af682fbd12a654321"),
    "food_id": ObjectId("61a5ec9af682fbd12a444444"),
    "rating": 5,
    "comment": "The bucket biryani was perfect for our family gathering. Everyone loved it!",
    "date": ISODate("2023-04-11T14:15:00Z")
  },
  {
    "_id": ObjectId("64a5ec9af682fbd12a555666"),
    "user_id": ObjectId("60d5ec9af682fbd12a123456"),
    "food_id": ObjectId("61a5ec9af682fbd12a666666"),
    "rating": 4,
    "comment": "The Chicken 65 was spicy and crispy, just as I like it. Great side dish!",
    "date": ISODate("2023-03-16T10:35:00Z")
  }
]);

// blog_posts collection for the blog page
db.createCollection("blog_posts");
db.blog_posts.insertMany([
  {
    "_id": ObjectId("65a5ec9af682fbd12a112233"),
    "title": "SS Hyderabadi Biryani, The 1st Movers of Bucket BIRYANI in Chennai!",
    "content": "This place is unique and famous for so many reasons: The huge Anda(Pot) with which biryani is served, The quantity which can easily satisfy two people(Per plate), the reasonable cost and the best of all – THE BUCKET BIRIYANI. SS biryani is a blessing for all those biryani lovers who crave for a humongous quantity of this royal dish...",
    "author": "Admin",
    "image_url": "/static/images/bukets.jpg",
    "publish_date": ISODate("2023-01-10T09:00:00Z"),
    "tags": ["bucket biryani", "chennai", "food"]
  },
  {
    "_id": ObjectId("65a5ec9af682fbd12a445566"),
    "title": "The Secret Ingredients That Make Our Biryani Special",
    "content": "At SS Biryani, we take pride in our authentic recipes that have been passed down through generations. The secret to our delicious biryani lies in the quality of ingredients and the traditional cooking methods we employ...",
    "author": "Chef Rajesh",
    "image_url": "/static/images/ingredients.jpg",
    "publish_date": ISODate("2023-02-15T10:30:00Z"),
    "tags": ["recipe", "ingredients", "traditional"]
  },
  {
    "_id": ObjectId("65a5ec9af682fbd12a778899"),
    "title": "How to Order the Perfect Biryani for Your Party",
    "content": "Planning a party and wondering how much biryani to order? We've got you covered! Our bucket biryani options are perfect for gatherings of all sizes...",
    "author": "Marketing Team",
    "image_url": "/static/images/party_biryani.jpg",
    "publish_date": ISODate("2023-03-05T14:00:00Z"),
    "tags": ["party", "order", "bucket biryani"]
  }
]);

// contacts collection for storing contact form submissions
db.createCollection("contacts");
db.contacts.insertMany([
  {
    "_id": ObjectId("66a5ec9af682fbd12a112233"),
    "name": "Ravi Kumar",
    "email": "ravi@example.com",
    "phone": "9876543210",
    "message": "I would like to place a bulk order for an office party of 30 people. Can you please send me a quote?",
    "date_submitted": ISODate("2023-04-01T11:45:00Z"),
    "status": "responded"
  },
  {
    "_id": ObjectId("66a5ec9af682fbd12a445566"),
    "name": "Priya Singh",
    "email": "priya@example.com",
    "phone": "8765432109",
    "message": "Do you provide catering services for wedding functions?",
    "date_submitted": ISODate("2023-04-10T16:30:00Z"),
    "status": "pending"
  }
]);