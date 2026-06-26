Here's the updated beginner-level schema with **`created_at`** and **`updated_at`** added to the **Customers** and **Bookings** tables.

---

## Table 1: Customers

```sql
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
```

### Sample Data

| customer_id | first_name | last_name | phone      | email                                     | created_at          | updated_at          |
| ----------- | ---------- | --------- | ---------- | ----------------------------------------- | ------------------- | ------------------- |
| 1           | Rahul      | Sharma    | 9876543210 | [rahul@gmail.com](mailto:rahul@gmail.com) | 2026-06-26 10:00:00 | 2026-06-26 10:00:00 |
| 2           | Priya      | Patel     | 9123456780 | [priya@gmail.com](mailto:priya@gmail.com) | 2026-06-26 10:05:00 | 2026-06-26 10:05:00 |
| 3           | Amit       | Verma     | 9988776655 | [amit@gmail.com](mailto:amit@gmail.com)   | 2026-06-26 10:10:00 | 2026-06-26 10:10:00 |

---

## Table 2: Rooms

```sql
CREATE TABLE Rooms (
    room_id INT PRIMARY KEY AUTO_INCREMENT,
    room_number VARCHAR(10) UNIQUE NOT NULL,
    room_type VARCHAR(30),
    price_per_night DECIMAL(8,2),
    status VARCHAR(20)
);
```

### Sample Data

| room_id | room_number | room_type | price_per_night | status    |
| ------- | ----------- | --------- | --------------- | --------- |
| 1       | 101         | Single    | 1500.00         | Available |
| 2       | 102         | Double    | 2500.00         | Occupied  |
| 3       | 201         | Deluxe    | 4000.00         | Available |

---

## Table 3: Bookings

```sql
CREATE TABLE Bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    room_id INT NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    total_amount DECIMAL(10,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id)
        REFERENCES Customers(customer_id),

    FOREIGN KEY (room_id)
        REFERENCES Rooms(room_id)
);
```

### Sample Data

| booking_id | customer_id | room_id | check_in   | check_out  | total_amount | created_at          | updated_at          |
| ---------- | ----------- | ------- | ---------- | ---------- | ------------ | ------------------- | ------------------- |
| 1          | 1           | 2       | 2026-06-25 | 2026-06-28 | 7500.00      | 2026-06-26 11:00:00 | 2026-06-26 11:00:00 |
| 2          | 2           | 1       | 2026-06-26 | 2026-06-27 | 1500.00      | 2026-06-26 11:10:00 | 2026-06-26 11:10:00 |
| 3          | 3           | 3       | 2026-06-27 | 2026-06-30 | 12000.00     | 2026-06-26 11:20:00 | 2026-06-26 11:20:00 |

---

## Relationship Diagram

```
Customers
+--------------------------------------+
| PK customer_id                       |
| first_name                           |
| last_name                            |
| phone                                |
| email                                |
| created_at                           |
| updated_at                           |
+--------------------------------------+
               |
               | FK customer_id
               |
               ▼
Bookings
+--------------------------------------+
| PK booking_id                        |
| FK customer_id                       |
| FK room_id                           |
| check_in                             |
| check_out                            |
| total_amount                         |
| created_at                           |
| updated_at                           |
+--------------------------------------+
               ▲
               |
               | FK room_id
               |
Rooms
+------------------------------+
| PK room_id                   |
| room_number                  |
| room_type                    |
| price_per_night              |
| status                       |
+------------------------------+
```

This schema is ideal for beginners because it demonstrates:

* Primary Keys (`customer_id`, `room_id`, `booking_id`)
* Foreign Keys (`customer_id`, `room_id`)
* Automatic timestamps using `created_at` and `updated_at`
* One-to-Many relationships between **Customers → Bookings** and **Rooms → Bookings**.
