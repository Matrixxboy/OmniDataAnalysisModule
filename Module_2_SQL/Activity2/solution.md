A good hotel booking schema should enforce:

* Primary Keys
* Foreign Keys
* `NOT NULL` constraints
* `UNIQUE` constraints
* `CHECK` constraints
* Default values
* Automatic timestamps
* Transaction-based booking insertion
* Automatic room status updates

---

# Customers Table

```sql
CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,

    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,

    phone VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
```

---

# Rooms Table

```sql
CREATE TABLE Rooms (
    room_id INT AUTO_INCREMENT PRIMARY KEY,

    room_number VARCHAR(10) NOT NULL UNIQUE,

    room_type ENUM(
        'Single',
        'Double',
        'Deluxe',
        'Suite'
    ) NOT NULL,

    price_per_night DECIMAL(10,2) NOT NULL
        CHECK(price_per_night > 0),

    status ENUM(
        'Available',
        'Occupied',
        'Maintenance'
    ) NOT NULL DEFAULT 'Available'
);
```

---

# Bookings Table

```sql
CREATE TABLE Bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,

    customer_id INT NOT NULL,
    room_id INT NOT NULL,

    check_in DATE NOT NULL,
    check_out DATE NOT NULL,

    total_amount DECIMAL(10,2) NOT NULL
        CHECK(total_amount >= 0),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_dates
        CHECK(check_out > check_in),

    CONSTRAINT fk_booking_customer
        FOREIGN KEY(customer_id)
        REFERENCES Customers(customer_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_booking_room
        FOREIGN KEY(room_id)
        REFERENCES Rooms(room_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);
```

---

# Relationship

```
Customers (1)
      │
      │ customer_id
      │
      ▼
Bookings (Many)
      ▲
      │ room_id
      │
Rooms (1)
```

---

# Insert Sample Rooms

```sql
INSERT INTO Rooms
(room_number, room_type, price_per_night)
VALUES
('101','Single',1500),
('102','Single',1500),
('201','Double',2500),
('202','Double',2500),
('301','Deluxe',4000),
('302','Suite',7000);
```

---

# Insert Customer

```sql
INSERT INTO Customers
(first_name, last_name, phone, email)
VALUES
(
    'Utsav',
    'Lankapati',
    '9876543210',
    'utsav@gmail.com'
);
```

---

# Booking Query (Automatically Updates Room Status)

It is best to execute the booking inside a transaction.

```sql
START TRANSACTION;

-- Create Booking
INSERT INTO Bookings
(
    customer_id,
    room_id,
    check_in,
    check_out,
    total_amount
)
VALUES
(
    1,
    2,
    '2026-07-05',
    '2026-07-08',
    4500
);

-- Update Room Status
UPDATE Rooms
SET status='Occupied'
WHERE room_id=2;

COMMIT;
```

---

# Checkout Query (Room Becomes Available Again)

```sql
START TRANSACTION;

DELETE FROM Bookings
WHERE booking_id=1;

UPDATE Rooms
SET status='Available'
WHERE room_id=2;

COMMIT;
```

---

# Check Room Availability Before Booking

```sql
SELECT *
FROM Rooms
WHERE room_id = 2
AND status = 'Available';
```

Only proceed with the booking if this query returns a row.

---

# Complete Booking Procedure (Recommended)

This version ensures that a room cannot be double-booked.

```sql
START TRANSACTION;

-- Lock the room row
SELECT status
FROM Rooms
WHERE room_id = 2
FOR UPDATE;

-- Proceed only if status = 'Available'

INSERT INTO Bookings
(
    customer_id,
    room_id,
    check_in,
    check_out,
    total_amount
)
SELECT
    1,
    2,
    '2026-07-05',
    '2026-07-08',
    4500
FROM Rooms
WHERE room_id = 2
AND status = 'Available';

UPDATE Rooms
SET status = 'Occupied'
WHERE room_id = 2
AND status = 'Available';

COMMIT;
```

This approach is safer because it prevents race conditions where two users try to book the same room simultaneously.

---

## Sample Data

### Customers

```sql
INSERT INTO Customers
(first_name,last_name,phone,email)
VALUES
('Utsav','Lankapati','9876543210','utsav@gmail.com'),
('Rahul','Patel','9876543211','rahul@gmail.com'),
('Amit','Shah','9876543212','amit@gmail.com');
```

### Rooms

```sql
INSERT INTO Rooms
(room_number,room_type,price_per_night,status)
VALUES
('101','Single',1500,'Available'),
('102','Single',1500,'Available'),
('201','Double',2500,'Available'),
('202','Double',2500,'Maintenance'),
('301','Deluxe',4000,'Available'),
('302','Suite',7000,'Available');
```

### Bookings

```sql
INSERT INTO Bookings
(customer_id, room_id, check_in, check_out, total_amount)
VALUES
(1,1,'2026-07-10','2026-07-12',3000),
(2,3,'2026-07-15','2026-07-18',7500);
```

After inserting these bookings, update the corresponding room statuses:

```sql
UPDATE Rooms
SET status = 'Occupied'
WHERE room_id IN (1, 3);
```

This design is normalized (3NF), enforces referential integrity, supports safe concurrent bookings when used with transactions, and keeps room availability synchronized with booking operations.
