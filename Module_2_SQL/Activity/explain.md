## 1. UUID Primary Keys

A **Universally Unique Identifier (UUID)** is a 128-bit number used to uniquely identify information in computer systems.

```sql
id CHAR(36) PRIMARY KEY DEFAULT (UUID())

```

* **How it works:** `UUID()` generates a 36-character string (32 alphanumeric characters and 4 hyphens, e.g., `4e7c8f2f-9d3a-4b2f-8d41-a1b2c3d4e5f6`).
* **Why use it over Auto-Increment IDs?**
* **Security:** Sequential IDs (1, 2, 3...) expose data volume and allow malicious users to guess other resource URLs easily (e.g., `myapp.com/api/orders/4`). UUIDs make this impossible.
* **Distributed Systems:** Multiple database shards or client applications can generate unique IDs offline or independently without checking back with a central database to find the next sequential integer.



---

## 2. Foreign Key Relationship

A **Foreign Key (FK)** links a record in one table to a record in another, establishing a relationship and enforcing **referential integrity**.

```sql
CONSTRAINT fk_orders_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)

```

* **The Structure:** The `orders` table has a column called `user_id`. This column points directly back to the `id` column in the `users` table.
* **Referential Integrity:** The database engine guarantees data consistency. You cannot insert an order with a `user_id` that does not exist in the `users` table. If you try, the database rejects the query with an error.

---

## 3. Timestamps & Auto-Updates (`created_at` & `updated_at`)

Tracking metadata about when rows are modified is crucial for auditing, debugging, and caching.

```sql
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

```

* **`created_at`:** Uses `DEFAULT CURRENT_TIMESTAMP`. When you run an `INSERT` statement without explicitly mentioning this column, the database automatically injects the current date and time.
* **`updated_at`:** Uses `ON UPDATE CURRENT_TIMESTAMP`. Whenever an `UPDATE` statement modifies *any* value inside that specific row (like changing a user's name), the database engine automatically refreshes this field to the exact moment the change occurred. You do not need to update it manually in your query.

---

## 4. Joins (Combining Data)

Relational databases keep data separated into clean, normalized tables. Relational Joins are used to pull that separated data back together into a single view.

```sql
FROM users u
INNER JOIN orders o ON u.id = o.user_id

```

* **`INNER JOIN`:** This looks at both tables and returns rows **only when there is a match** between `users.id` and `orders.user_id`.
* **The Filter (`ON`):** It acts as a matching condition. The database takes a user record, searches the orders table for any row where `user_id` equals that user's `id`, and stitches them into a wide composite row. If a user has no orders, they will not show up in the results of an `INNER JOIN`.

---

## 5. Cascade Delete (`ON DELETE CASCADE`)

This setting defines what happens to child records (`orders`) when their parent record (`users`) is deleted.

```sql
ON DELETE CASCADE

```

* **The Problem it Solves:** If a user is deleted, their orders become "orphaned data"—records pointing to a `user_id` that no longer exists, which breaks referential integrity rules.
* **How it Works:** When you execute:
```sql
DELETE FROM users WHERE email = 'utsav@example.com';

```


The database engine intercepts the command, checks the foreign key constraints, finds all records in the `orders` table linked to that user's UUID, and deletes those rows **automatically** in the same transaction.

> **Warning:** While highly convenient for cleanup, `ON DELETE CASCADE` must be used with caution in production environments, as deleting a single parent row can inadvertently wipe out thousands of historical child records with no undo option.