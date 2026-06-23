* UUID Primary Keys
* Foreign Key Relationship
* `created_at`
* `updated_at`
* Auto-update timestamps
* Cascade delete

---

## 1. Drop Existing Tables (Optional)

```sql
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users;
```

---

## 2. Create Users Table

```sql
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),

    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 3. Create Orders Table

```sql
CREATE TABLE orders (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),

    user_id CHAR(36) NOT NULL,

    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
```

---

## 4. Insert a User

```sql
INSERT INTO users (
    name,
    email
)
VALUES (
    'Utsav',
    'utsav@example.com'
);
```

---

## 5. View Users

```sql
SELECT * FROM users;
```

Example output:

```text
+--------------------------------------+-------+-------------------+
| id                                   | name  | email             |
+--------------------------------------+-------+-------------------+
| 4e7c8f2f-9d3a-4b2f-8d41-a1b2c3d4e5f6 | Utsav | utsav@example.com |
+--------------------------------------+-------+-------------------+
```

Copy the `id` value.

---

## 6. Insert an Order

```sql
INSERT INTO orders (
    user_id,
    product_name,
    quantity,
    price
)
VALUES (
    '4e7c8f2f-9d3a-4b2f-8d41-a1b2c3d4e5f6',
    'Laptop',
    1,
    59999.00
);
```

---

## 7. Insert More Orders

```sql
INSERT INTO orders (
    user_id,
    product_name,
    quantity,
    price
)
VALUES
(
    '4e7c8f2f-9d3a-4b2f-8d41-a1b2c3d4e5f6',
    'Mouse',
    2,
    799.00
),
(
    '4e7c8f2f-9d3a-4b2f-8d41-a1b2c3d4e5f6',
    'Keyboard',
    1,
    1999.00
);
```

---

## 8. View Orders

```sql
SELECT * FROM orders;
```

---

## 9. Join Users and Orders

```sql
SELECT
    u.id AS user_id,
    u.name,
    u.email,

    o.id AS order_id,
    o.product_name,
    o.quantity,
    o.price,

    o.created_at
FROM users u
INNER JOIN orders o
    ON u.id = o.user_id;
```

---

## 10. Update User

```sql
UPDATE users
SET name = 'Utsav Lankapati'
WHERE email = 'utsav@example.com';
```

`updated_at` will update automatically.

---

## 11. Delete User

```sql
DELETE FROM users
WHERE email = 'utsav@example.com';
```

Because of:

```sql
ON DELETE CASCADE
```

all related orders will be deleted automatically.

---

### Final Relationship

```text
users
-----
id (PK UUID)
name
email
created_at
updated_at

      │
      │ FK
      ▼

orders
------
id (PK UUID)
user_id (FK → users.id)
product_name
quantity
price
created_at
updated_at
```